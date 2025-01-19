import { filtro_anos, operators, variacao, LOGOUT_URL, KPI_INFO_URL, KPI_RESULTS_URL } from './data.js';

let filter_year = document.getElementById("filter-year");
let filter_month = document.getElementById("filter-month");
let filters_wrapper = document.getElementById("filters-wrapper");
let content_wrapper = document.getElementById("content-wrapper");
let toast_wrapper = document.getElementById("toast-wrapper");
const btn_logout = document.getElementById("btn-logout");
var kpi_info = "";
var kpi_data = "";
var organization_cnes = sessionStorage.getItem('organizationCnes');  
var message = sessionStorage.getItem('message');  

// TOAST DE BOAS VINDAS
let content_toast = `
    <div id="toast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <strong class="me-auto">Saturn Analytics</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
    </div>
`
window.addEventListener("load", () => {
    if (!sessionStorage.getItem('toast')) {
        toast_wrapper.innerHTML = content_toast;
        let toast = document.getElementById("toast");
        setTimeout(() => {
            toast.classList.replace("show", "hide");
        }, 5000);
        sessionStorage.setItem('toast', True); 
    };
});

// AJUSTES NO LAYOUT DE ACORDO COM O TAMANHO DA TELA
if (window.innerWidth >= 768) {
    filters_wrapper.classList.add("d-flex");
} else {
    filters_wrapper.classList.remove("d-flex");
}
if (window.innerWidth >= 992) {
    filters_wrapper.classList.remove("col");
} else {
    filters_wrapper.classList.add("col");
}
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        filters_wrapper.classList.add("d-flex");
    } else {
        filters_wrapper.classList.remove("d-flex");
    }
    if (window.innerWidth >= 992) {
        filters_wrapper.classList.remove("col");
    } else {
        filters_wrapper.classList.add("col");
    }
});

// LOGOFF
btn_logout.addEventListener('click', async () => {
    await fetch(LOGOUT_URL,
                { method: 'POST', credentials: 'include' });
    alert('Logout realizado com sucesso!');
    window.location.href = 'index.html';
});

// POPULAR FILTRO ANO
let content_year = "<option selected>Selecione o ano</option>"
for (let i of filtro_anos) {
    content_year += `<option value="${i.ano}">${i.ano}</option>`;
};
filter_year.innerHTML = content_year;

// POPULAR FILTRO MÊS A PARTIR DO ANO
filter_year.addEventListener('change', (e) => {
    let content_month = "<option selected>Selecione o mês</option>";
    for (let j of filtro_anos) {
        if (j.ano == filter_year.value) {
            for (let k of j.meses) {            
                content_month += `<option value="${k.num}">${k.desc}</option>`;
            };
        };
    };  
    filter_month.innerHTML = content_month;
});
  
// EXIBIR INDICADORES A PARTIR DOS FILTROS
filter_month.addEventListener('change', async (e) => {
    let content_indicadores = ``;    
    const year = filter_year.value;
    const month = filter_month.value;

    // busca informações dos indicadores
    try {
        const response = await fetch(`${KPI_INFO_URL}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' 
        });
        if (!response.ok) {
          throw new Error(`Unable o fetch data. ${response.message}`);
        };
        const raw_kpis = await response.json();
        kpi_info = raw_kpis.message;
    } catch (error) {
        alert('Erro: '+error.message);
    };   

    // CONSULTA API POR DADOS DOS INDICADORES
    try {
        const response = await fetch(`${KPI_RESULTS_URL}/${organization_cnes}/${year}/${month}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });   
        let res = ""; 
        if (response.status === 400) {
            // VERIFICA SE A COMPETÊNCIA JÁ FOI CONSOLIDADA
            res = `
                <div class="container-fluid text-center h-100 align-content-center fetch-fail">
                <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
                <h3>Nenhum dado disponível</h3>
                <p>Verifique se a competência em questão já foi consolidada.</p>
                </div>
            `;
        } else if (!response.ok) {
          throw new Error(`Unable o fetch data. ${response.status}`);
        } else {
            // MONTA O HTML COM OS DADOS DOS INDICADORES
            const raw_kpi_results = await response.json();
            kpi_data = raw_kpi_results.message;
            for (let i in kpi_info) {
                const indicador = kpi_info[i];
                const dados = kpi_data.data[`rkpi_${indicador.sequencia}`];
                const oper = operators[indicador.direcao](dados.value.toFixed(1), indicador.meta_valor);
                const cor = oper ? "text-bg-success" : "text-bg-danger";
                let content_estratification = "";

                // VERIFICA SE O INDICADOR POSSUI ESTRATIFICAÇÃO
                if (dados.estratification.length == 0) {
                    content_estratification = `<li class="list-group-item">Não se aplica</li>`;
                } else {
                    for (let j of dados.estratification) {
                        content_estratification += `
                            <li class="list-group-item"><strong>${j.type}: </strong>${j.value.toFixed(1)} ${indicador.unidade}</li>
                        `;
                    };
                };

                // VERIFICA A UNIDADE DE MEDIDA DO INDICADOR
                let content_value = "";
                if (indicador.unidade == "%") {
                    content_value = `
                        <div class="col-lg-1 col-2 text-center">
                            <h3>${dados.value.toFixed(1)}${indicador.unidade}</h3>
                        </div>`;
                } else if (indicador.unidade == "Número absoluto") {
                    content_value = `
                        <div class="col-lg-1 col-2 text-center">
                            <h3>${dados.value.toFixed(1)}</h3>
                        </div>`;
                } else if (indicador.unidade == "/1000 pacientes-dia") {
                    content_value = `
                    <div class="col-lg-1 col-2 text-center multiline">
                        <h3>${dados.value.toFixed(1)}</h3>
                        <small>/1000 pac.-dia</small>
                    </div>
                    `;
                } else {
                    content_value = `
                    <div class="col-lg-1 col-2 text-center multiline">
                        <h3>${dados.value.toFixed(1)}</h3>
                        <small>${indicador.unidade}</small>
                    </div>
                    `;
                };

                // ANÁLISE CRÍTICA DO INDICADOR - em desenvolvimento
                let content_analysis = "";
                if(indicador.sequencia % 2 == 1){
                    content_analysis = `
                    <div>
                        <div><p><strong>Análise do Indicador de Proporção de Partos Vaginais</strong></p></div>
                        <div>
                            <div>
                                <ul>
                                    <li><strong>Competência atual:</strong> O indicador do mês 6 está abaixo da meta estabelecida de ≥ 55%, com um valor de 57.5%.</li>
                                    <li><strong>Tendência:</strong> Observa-se uma variação nos resultados do indicador ao longo dos últimos 6 meses. O valor inicial de 43.06% no mês 1 apresentou uma alta expressiva no mês 2 chegando a 68,45%, seguido de uma queda no mês 3 (65.34%) e mês 4 (41,4%), uma recuperação no mês 5 (58.02%), e novamente uma queda no mês 6 (57.5%). Essa oscilação indica uma instabilidade na taxa de partos vaginais, com momentos de melhor desempenho e outros de pior. A documentação aponta que taxas mais altas de partos vaginais são desejáveis, pois estão associadas a menores taxas de complicações.</li>
                                </ul>
                            </div>
                            <div>
                                <p>O resultado do mês 6, embora esteja acima de 55%, mostra uma pequena redução em relação ao mês anterior. Sendo assim, o resultado indica que a instituição está realizando mais partos cesáreos do que o desejado. Uma vez que a documentação indica que um percentual maior de partos vaginais é desejável para reduzir o número de complicações, é importante investigar os fatores que estão influenciando essa variação e monitorar de perto a evolução do indicador nos próximos meses. </p>
                            </div>
                        </div>
                        <div style="color: #999;">
                            <span class="material-icons" style="font-size: small;">auto_awesome</span><small> Gerado com IA do Google Gemini</small>
                        </div>
                    </div>
                    `;
                } else {
                    content_analysis = `
                    <div class="flex-row d-flex load-ai align-items-center">
                        <div><span class="material-icons">auto_awesome</span></div>
                        <div>
                            <div class="flex-row d-flex loading">
                                <h1 class="dots">&#8226</h1>
                                <h1 class="dots">&#8226</h1>
                                <h1 class="dots">&#8226</h1>
                            </div>
                        </div>
                    </div>
                    `;
                };

                // MONTA O HTML DOS INDICADORES COM BOOTSTRAP ACCORDION
                content_indicadores += `                
                <div class="accordion-item">
                    <div class="accordion-header">
                    <button class="accordion-button ${cor}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${indicador.sequencia}" aria-expanded="false" aria-controls="collapse${indicador.sequencia}">
                        ${content_value}
                        <div class="col-lg-1 col-2 text-center">
                            ${variacao[dados.variation]}
                        </div>
                        <div class="col-lg-8 col-6">
                            <small class="lead title">${indicador.titulo}</small>
                        </div>
                    </button>
                    </div>
                    <div id="collapse${indicador.sequencia}" class="accordion-collapse collapse" data-bs-parent="#accordion-results">
                    <div class="accordion-body">
                        <p><strong>${indicador.titulo}</strong></p>
                        <div class="vstack gap-2">
                        <div class="row">
                            <div class="col-md-8">
                            <p><strong>Descrição:</strong> ${indicador.descricao}</p>
                            <div class="row">
                                <div class="col-6"><p><strong>Domínio:</strong> ${indicador.dominio}</p></div>
                                <div class="col-6"><p><strong>Meta:</strong> ${indicador.meta}</p></div>
                            </div>
                            </div>
                            <div class="col-md-4">
                                <strong>Estratificações</strong>
                                <ul class="list-group">
                                    ${content_estratification}
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="accordion" id="accordionAI${indicador.sequencia}">
                            <div class="accordion-item">
                                <div class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${indicador.sequencia}AI" aria-expanded="true" aria-controls="collapse${indicador.sequencia}AI">
                                    <h6>Gerar análise crítica</h6>
                                </button>
                                </div>
                                <div id="collapse${indicador.sequencia}AI" class="accordion-collapse collapse" data-bs-parent="#accordionAI${indicador.sequencia}">
                                    <div class="accordion-body">${content_analysis}</div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>                
                `;        
            };
            res = `<div class="accordion" id="accordion-results">${content_indicadores}</div>`
        };  
        content_wrapper.innerHTML = res      
    } catch (error) {
        alert('Erro: '+error.message);
    }  
});