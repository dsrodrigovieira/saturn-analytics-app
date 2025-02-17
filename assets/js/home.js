import { filtro_anos, operadores, variacao, LOGOUT_URL, KPI_INFO_URL, KPI_RESULTS_URL } from './data.js';

let filter_year = document.getElementById("filter-year");
let filter_month = document.getElementById("filter-month");
let filters_wrapper = document.getElementById("filters-wrapper");
let content_wrapper = document.getElementById("content-wrapper");
let toast_wrapper = document.getElementById("toast-wrapper");
const btn_logout = document.getElementById("btn-logout");
var kpi_info = "";
var kpi_data = "";
var cnes = sessionStorage.getItem('cnesEmpresa');  
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
        sessionStorage.setItem('toast', true); 
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
    await fetch(LOGOUT_URL, { method: 'POST', credentials: 'include' });
    sessionStorage.clear();
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

    // EXIBE SPINNER DE CARREGAMENTO
    content_wrapper.innerHTML = `
    <div class="flex-line text-center position-fixed top-50 start-50 translate-middle">
        <span class="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
        <h6>Carregando...</h6>
    </div>
    `;
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
        const response = await fetch(`${KPI_RESULTS_URL}/${cnes}/${year}/${month}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });   
        let res = ""; 
        if (response.status === 400) {
            // VERIFICA SE A COMPETÊNCIA JÁ FOI CONSOLIDADA
            res = `
                <div class="container-fluid text-center h-100 align-content-center fetch-fail">
                <i class="fa-solid fa-triangle-exclamation fa-2xl fa-custom"></i>
                <h3>Nenhum dado disponível</h3>
                <p>Verifique se a competência em questão já foi consolidada.</p>
                <a href="https://saturn-analytics-client.streamlit.app/?cnes=${cnes}&ano=${year}" target="_blank">Consulte o calendário de consolidação <i class="fa-solid fa-arrow-up-right-from-square fa-2xs"></i></a>
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
                const dados = kpi_data.dados[`rkpi_${indicador.sequencia}`];
                const oper = operadores[indicador.direcao](dados.valor.toFixed(1), indicador.meta_valor);
                const cor = oper ? "text-bg-success" : "text-bg-danger";
                let content_estratification = "";

                // VERIFICA SE O INDICADOR POSSUI ESTRATIFICAÇÃO
                if (dados.estratificacao.length == 0) {
                    content_estratification = `<li class="list-group-item">Não se aplica</li>`;
                } else {
                    for (let j of dados.estratificacao) {
                        content_estratification += `
                            <li class="list-group-item"><strong>${indicador.estratificacoes[0][j.tipo]}: </strong>${j.valor.toFixed(1)} ${indicador.unidade}</li>
                        `;
                    };
                };

                // VERIFICA A UNIDADE DE MEDIDA DO INDICADOR
                let content_value = "";
                if (indicador.unidade == "%") {
                    content_value = `
                        <div class="col-lg-1 col-2 text-center">
                            <h3>${dados.valor.toFixed(1)}${indicador.unidade}</h3>
                        </div>`;
                } else if (indicador.unidade == "Número absoluto") {
                    content_value = `
                        <div class="col-lg-1 col-2 text-center">
                            <h3>${dados.valor.toFixed(1)}</h3>
                        </div>`;
                } else if (indicador.unidade == "/1000 pacientes-dia") {
                    content_value = `
                    <div class="col-lg-1 col-2 text-center multiline">
                        <h3>${dados.valor.toFixed(1)}</h3>
                        <small>/1000 pac.-dia</small>
                    </div>
                    `;
                } else {
                    content_value = `
                    <div class="col-lg-1 col-2 text-center multiline">
                        <h3>${dados.valor.toFixed(1)}</h3>
                        <small>${indicador.unidade}</small>
                    </div>
                    `;
                };

                // ANÁLISE CRÍTICA DO INDICADOR - em desenvolvimento
                let content_analysis = `
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

                // MONTA O HTML DOS INDICADORES COM BOOTSTRAP ACCORDION
                content_indicadores += `                
                <div class="accordion-item">
                    <div class="accordion-header">
                    <button class="accordion-button ${cor}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${indicador.sequencia}" aria-expanded="false" aria-controls="collapse${indicador.sequencia}">
                        ${content_value}
                        <div class="col-lg-1 col-2 text-center">
                            ${variacao[dados.variacao]}
                        </div>
                        <div class="col-lg-8 col-6">
                            <small class="lead title">${indicador.titulo}</small>
                        </div>
                    </button>
                    </div>
                    <div id="collapse${indicador.sequencia}" class="accordion-collapse collapse" data-bs-parent="#accordion-results">
                    <div class="accordion-body">
                        <p><strong>Indicador #${indicador.sequencia} - ${indicador.titulo}</strong></p>
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