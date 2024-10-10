let dialog = document.getElementById("dialog-info")    
let indicador = document.getElementById("indicador1")    
let plot = document.getElementById("plot1")    
let exit = document.getElementById("exit")    
let wrapper = document.querySelector(".dialog-wrapper")

indicador.addEventListener('click',(e) => {
    dialog.classList.remove("dialog-hide")
    dialog.showModal()
    dialog.classList.add("dialog-show")
    plot.classList.add("plot-focus")    
})

dialog.addEventListener('click', (e) => {
    if(!wrapper.contains(e.target)) {
        dialog.classList.remove("dialog-show")
        plot.classList.remove("plot-focus")
        dialog.close(),console.log(e)
    }
})