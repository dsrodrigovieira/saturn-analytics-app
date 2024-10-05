let dialog = document.getElementById("notification_dialog")    
let wrapper = document.querySelector(".wrapper")
let icon = document.getElementById("bell-icon")
let showDialog = (show) => show ? dialog.showModal() : dialog.close()

dialog.addEventListener('click', (e) => !wrapper.contains(e.target) && [dialog.close(),icon.classList.remove('header-icon-active')])
icon.addEventListener('click', (e) => { icon.classList.add('header-icon-active') })