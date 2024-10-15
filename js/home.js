import { filtro_anos, resultados_indicadores, indicadores_ans } from './data.js'

let filter_year = document.getElementById("year")
let filter_month = document.getElementById("month")
let plots = document.getElementById("section-plots-ans")
let indicador1 = document.getElementById("indicador1")
const variacao_c = `<i class="fa-solid fa-angles-up fa-2xl"></i>`
const variacao_d = `<i class="fa-solid fa-angles-up fa-rotate-180 fa-2xl"></i>`
const variacao_n = `<i class="fa-solid fa-grip-lines fa-2xl"></i>`

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
        if (indicador.unidade == "%") {
            if (p.variacao == "c") {
                content_indicadores += `
                <div class="plot" id="plot${p.id}">
                    <div class="plot-header">
                        <a>${indicador.titulo}</a>
                        <a onClick=showDialog(true,${p.id})><i class="fa-solid fa-circle-info fa-xl" id="indicador${p.id}"></i></a>                            
                    </div>         
                    <div class="plot-value">
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
                    <div class="plot-value">
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
                    <div class="plot-value">
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
                    <div class="plot-value">
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
                    <div class="plot-value">
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
                    <div class="plot-value">
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

indicador1.addEventListener('click', (e) => {
    let content_dialog = ``

    `
    <div class="dialog-info-header">
        <h3>Proporção de Partos Vaginais</h3>
    </div>
    <div class="dialog-info-items">
        <p><b>Domínio:</b> Efetividade</p>                        
        <p style="text-align: justify;">O resultado do indicador reflete o percentual de partos normais realizados na
            instituição no período de interesse. Percentuais maiores de parto normal são
            desejáveis, pois há menores taxas de complicações relacionadas.</p>
        <p><b>Meta:</b> ≥ 55% de partos vaginais.</p>
    </div>
    `
})

