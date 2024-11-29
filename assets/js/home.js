import { filtro_anos, resultados_indicadores, indicadores_ans } from './data.js'

let filter_year = document.getElementById("year")
let filter_month = document.getElementById("month")
let plots = document.getElementById("section-plots-ans")
let dialog = document.getElementById("dialog-info")
let dialog_wrapper = document.getElementById("dialog-wrapper")
let main_content = document.getElementById("main-content")
let wrapper = document.querySelector(".dialog-wrapper")
let footer_menu = document.getElementById("footer-menu")
let options_content = document.getElementById("options-content");
let settings_content = document.getElementById("settings-content");
let user_content = document.getElementById("user-content");
let notification_content = document.getElementById("notification-content");
let plot_id = ""
const variacao_c = `<i class="fa-solid fa-angles-up fa-2xl"></i>`
const variacao_d = `<i class="fa-solid fa-angles-up fa-rotate-180 fa-2xl"></i>`
const variacao_n = `<i class="fa-solid fa-grip-lines fa-2xl"></i>`
var operators = {
    '>=': function (a, b){ return a>=b},
    '<=': function (a, b){ return a<=b},
    '>' : function (a, b){ return a>b},
    '<' : function (a, b){ return a<b}
}

// POPULAR FILTRO ANO
let content_year = `<option value="">Selecione</option>`
for (let i of filtro_anos) {
    content_year += `<option value="${i.ano}">${i.ano}</option>`
}
filter_year.innerHTML = content_year;

// POPULAR FILTRO MÊS A PARTIR DO ANO
filter_year.addEventListener('change', (e) => {
    let content_month = `<option value="">Selecione</option>`
    for (let j of filtro_anos) {
        if (j.ano == filter_year.value) {
            for (let k of j.meses) {            
                content_month += `<option value="${k.num}">${k.desc}</option>`
            }
        }
    }    
    filter_month.innerHTML = content_month;
})

// EXIBIR INDICADORES A PARTIR DOS FILTROS
filter_month.addEventListener('change', (e) => {
    let content_indicadores = `` 
    let r = resultados_indicadores.filter(obj => {return obj.ano == filter_year.value & obj.mes == filter_month.value})    
    for (let p of r[0].resultados) {                
        let indicador = indicadores_ans.find(obj => {return obj.id === p.id})        
        let oper = operators[indicador.direcao](p.valor, indicador.meta_valor)
        let cor = oper ? "#28a745" : "#dc3545"        
        // VERIFICA SE O VALOR SERA EXIBIDO EM 1 OU 2 LINHAS
        if (indicador.unidade == "%") {
            // VERIFICA DIREÇÃO DA TENDENCIA
            if (p.variacao == "c") {                
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${p.valor}${indicador.unidade}</h1>
                        ${variacao_c}
                    </div>
                </div>
                `
            } else if (p.variacao == "d") {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${p.valor}${indicador.unidade}</h1>
                        ${variacao_d}
                    </div>
                </div>
                `
            } else {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>                            
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <h1>${p.valor}${indicador.unidade}</h1>
                        ${variacao_n}
                    </div>
                </div>
                `
            }
        } else { 
            if (p.variacao == "c") {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${p.valor}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_c}
                    </div> 
                </div>
                `
            } else if (p.variacao == "d") {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${p.valor}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_d}
                    </div> 
                </div>
                `
            } else {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>
                    </div>         
                    <div style="color:${cor};" class="plot-value">
                        <div class="value">
                            <h1>${p.valor}</h1>
                            <p>${indicador.unidade}</p>
                        </div>
                        ${variacao_n}
                    </div> 
                </div>
                `
            }
        }                
    }
    plots.innerHTML = content_indicadores;
})

// EXIBE MODAL
function showDialog(show,kpi_id) {    
    let info = indicadores_ans.filter(obj => {return obj.id == kpi_id})    
    plot_id = document.getElementById(`plot${kpi_id}`)
    let content_modal = ``
    if (show) {
        content_modal = `        
            <div class="dialog-info-header">
                <h4>${info[0].titulo}</h4>
            </div>
            <div class="dialog-info-items">
                <p><b>Domínio:</b> ${info[0].dominio}</p>                        
                <p style="text-align: justify;">${info[0].descricao}</p>
                <p><b>Meta:</b> ${info[0].meta}</p>
            </div>        
        `        
        plot_id.classList.add("plot-focus")
        dialog.showModal()
        dialog.classList.remove("dialog-hide")
        dialog.classList.add("dialog-show")        
    } 
    dialog_wrapper.innerHTML = content_modal    
}
window.showDialog = showDialog

// FECHA MODAL
dialog.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
        dialog.close()
        dialog.classList.add("dialog-hide")
        dialog.classList.remove("dialog-show")
        plot_id.classList.remove("plot-focus")
    }
})

function showOptionsMenu() { options_content.style.display === "block" ? options_content.style.setProperty("display","none") : options_content.style.setProperty("display","block") }
window.showOptionsMenu = showOptionsMenu
// FECHA MENU
options_content.addEventListener('click', (e) => {
    options_content.style.setProperty("display","none")
})

function showSettingsMenu() { settings_content.style.display === "block" ? settings_content.style.setProperty("display","none") : settings_content.style.setProperty("display","block") }
window.showSettingsMenu = showSettingsMenu
// FECHA MENU
settings_content.addEventListener('click', (e) => {
    settings_content.style.setProperty("display","none")
})

function showUserMenu() { user_content.style.display === "block" ? user_content.style.setProperty("display","none") : user_content.style.setProperty("display","block") }
window.showUserMenu = showUserMenu
// FECHA MENU
user_content.addEventListener('click', (e) => {
    user_content.style.setProperty("display","none")
})

function showNotificationMenu() { notification_content.style.display === "block" ? notification_content.style.setProperty("display","none") : notification_content.style.setProperty("display","block") }
window.showNotificationMenu = showNotificationMenu
// FECHA MENU
notification_content.addEventListener('click', (e) => {
    notification_content.style.setProperty("display","none")
})