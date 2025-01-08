import { filtro_anos, API_BASE_URL } from './data.js';

const KPI_URL = `${API_BASE_URL}/results`;
const KPI     = `${API_BASE_URL}/kpi`;

const variacao_c = `<i class="fa-solid fa-angles-up fa-2xl"></i>`;
const variacao_d = `<i class="fa-solid fa-angles-up fa-rotate-180 fa-2xl"></i>`;
const variacao_n = `<i class="fa-solid fa-grip-lines fa-2xl"></i>`;

let filter_year = document.getElementById("year");
let filter_month = document.getElementById("month");
let plots = document.getElementById("section-plots-ans");
let dialog = document.getElementById("dialog-info");
let dialog_wrapper = document.getElementById("dialog-wrapper");
let wrapper = document.querySelector(".dialog-wrapper");

// let main_content = document.getElementById("main-content")
// let footer_menu = document.getElementById("footer-menu")
// let options_content = document.getElementById("options-content");
// let settings_content = document.getElementById("settings-content");
// let user_content = document.getElementById("user-content");
// let notification_content = document.getElementById("notification-content");

let plot_id = "";
var kpi_info = "";
var kpi_data = "";
var operators = {
    '>=': function (a, b){ return a>=b},
    '<=': function (a, b){ return a<=b},
    '>' : function (a, b){ return a>b},
    '<' : function (a, b){ return a<b}
};
var organization_cnes = sessionStorage.getItem('organizationCnes');  

// POPULAR FILTRO ANO
let content_year = `<option value="">Selecione</option>`;
for (let i of filtro_anos) {
    content_year += `<option value="${i.ano}">${i.ano}</option>`;
};
filter_year.innerHTML = content_year;

// POPULAR FILTRO MÊS A PARTIR DO ANO
filter_year.addEventListener('change', (e) => {
    let content_month = `<option value="">Selecione</option>`;
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
        const response = await fetch(`${KPI}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Inclui cookies na requisição
        });
        if (!response.ok) {
          throw new Error(`Unable o fetch data. ${response.message}`);
        };
        const raw_kpis = await response.json();
        kpi_info = raw_kpis.message;
    } catch (error) {
        alert('Erro: '+error.message);
    };   

    // busca dados dos indicadores
    try {
        const response = await fetch(`${KPI_URL}/${organization_cnes}/${year}/${month}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' // Inclui cookies na requisição
        });    
        if (response.status === 400) {
            plots.style.setProperty("grid-template-columns","None");
            plots.innerHTML = `
                <div class="fetch-fail">
                    <i class="fa-solid fa-triangle-exclamation fa-2xl"></i>
                    <h3>Nenhum dado disponível</h3>
                    <p>Verifique se a competência em questão já foi consolidada.</p>
                </div>
            `;
        } else if (!response.ok) {
          throw new Error(`Unable o fetch data. ${response.status}`);
        } else {
            if (plots.style.getPropertyValue("grid-template-columns") === "none") {
                if (window.innerWidth >= 1024) {
                    plots.style.setProperty("grid-template-columns","repeat(3, 1fr)");
                } else if (window.innerWidth >= 720) {
                    plots.style.setProperty("grid-template-columns","repeat(2, 1fr)");
                };
            };
        };
        const raw_kpi_results = await response.json();
        kpi_data = raw_kpi_results.message;
    } catch (error) {
        alert('Erro: '+error.message);
    }  

    for (let i in kpi_info) {
        const indicador = kpi_info[i];
        const dados = kpi_data.data[`rkpi_${indicador.sequencia}`];
        const oper = operators[indicador.direcao](dados.value.toFixed(1), indicador.meta_valor);
        const cor = oper ? "#28a745" : "#dc3545";

        // VERIFICA SE O VALOR SERA EXIBIDO EM 1 OU 2 LINHAS
        if (indicador.unidade == "%") {
            // VERIFICA DIREÇÃO DA TENDENCIA
            if (dados.variacao == "c") {                
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${dados.value.toFixed(1)}${indicador.unidade}</h1>
                        ${variacao_c}
                    </div>
                </div>
                `;
            } else if (dados.variacao == "d") {
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${dados.value.toFixed(1)}${indicador.unidade}</h1>
                        ${variacao_d}
                    </div>
                </div>
                `;
            } else {
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${dados.value.toFixed(1)}${indicador.unidade}</h1>
                        ${variacao_n}
                    </div>
                </div>
                `;
            };
        } else { 
            if (dados.variacao == "c") {
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true, ${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${dados.value.toFixed(1)}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_c}
                    </div> 
                </div>
                `;
            } else if (dados.variacao == "d") {
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true, ${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${dados.value.toFixed(1)}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_d}
                    </div> 
                </div>
                `;
            } else {
                content_indicadores += `
                <div class="plot" id="plot${indicador.sequencia}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true, ${indicador.sequencia})><i class="fa-solid fa-circle-info fa-xl" id="indicador${indicador.sequencia}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${dados.value.toFixed(1)}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_n}
                    </div> 
                </div>
                `;
            };
        };
    };
    plots.innerHTML = content_indicadores;
})

// EXIBE MODAL COM INFORMAÇÕES DO INDICADOR
function showDialog(show, kpi_id) {   
    plot_id = document.getElementById(`plot${kpi_id}`);
    let info = kpi_info[kpi_id-1];
    let content_modal = ``;
    if (show) {
        content_modal = `        
            <div class="dialog-info-header">
                <h4>${info.titulo}</h4>
            </div>
            <div class="dialog-info-items">
                <p><b>Domínio:</b> ${info.dominio}</p>                        
                <p style="text-align: justify;">${info.descricao}</p>
                <p><b>Meta:</b> ${info.meta_valor}</p>
            </div>        
        `;       
        plot_id.classList.add("plot-focus");
        dialog.showModal();
        dialog.classList.remove("dialog-hide");
        dialog.classList.add("dialog-show");
    };
    dialog_wrapper.innerHTML = content_modal;
};
window.showDialog = showDialog;

// FECHA MODAL
dialog.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        dialog.close();
        dialog.classList.add("dialog-hide");
        dialog.classList.remove("dialog-show");
        plot_id.classList.remove("plot-focus");
    };
});

// function showOptionsMenu() { options_content.style.display === "block" ? options_content.style.setProperty("display","none") : options_content.style.setProperty("display","block") }
// window.showOptionsMenu = showOptionsMenu
// // FECHA MENU
// options_content.addEventListener('click', (e) => {
//     options_content.style.setProperty("display","none")
// })

// function showSettingsMenu() { settings_content.style.display === "block" ? settings_content.style.setProperty("display","none") : settings_content.style.setProperty("display","block") }
// window.showSettingsMenu = showSettingsMenu
// // FECHA MENU
// settings_content.addEventListener('click', (e) => {
//     settings_content.style.setProperty("display","none")
// })

// function showUserMenu() { user_content.style.display === "block" ? user_content.style.setProperty("display","none") : user_content.style.setProperty("display","block") }
// window.showUserMenu = showUserMenu
// // FECHA MENU
// user_content.addEventListener('click', (e) => {
//     user_content.style.setProperty("display","none")
// })

// function showNotificationMenu() { notification_content.style.display === "block" ? notification_content.style.setProperty("display","none") : notification_content.style.setProperty("display","block") }
// window.showNotificationMenu = showNotificationMenu
// // FECHA MENU
// notification_content.addEventListener('click', (e) => {
//     notification_content.style.setProperty("display","none")
// })