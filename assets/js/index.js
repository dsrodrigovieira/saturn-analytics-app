const container = document.getElementById("container");
const btn_login = document.getElementById("btn-login");
const btn_register = document.getElementById("btn-register");
const btn_cancel = document.getElementById("btn-cancel");
const btn_cancel2 = document.getElementById("btn-cancel2");
const login_header = document.getElementById("login-header");
const login_form = document.getElementById("item-login");
const register_form = document.getElementById("item-register");

btn_login.addEventListener('click',(e) => {
    login_header.classList.add("login-header-fade");
    btn_register.classList.add("btn-register-fade");
    btn_login.classList.add("btn-login-active");
    login_form.classList.remove("container-hide");
    login_form.classList.add("container-show");
});

btn_register.addEventListener('click',(e) => {
    container.classList.add("container-size");
    login_header.classList.add("login-header-fade");
    btn_login.classList.add("btn-login-fade");
    btn_register.classList.add("btn-register-active");
    register_form.classList.remove("container-hide");
    register_form.classList.add("container-show");
});       

btn_cancel.addEventListener('click',(e) => {
    login_form.classList.remove("container-show");
    login_form.classList.add("container-hide");
    btn_login.classList.remove("btn-login-active");
    login_header.classList.remove("login-header-fade");
    btn_register.classList.remove("btn-register-fade");
});

btn_cancel2.addEventListener('click',(e) => {
    container.classList.remove("container-size");
    register_form.classList.remove("container-show");
    register_form.classList.add("container-hide");
    btn_register.classList.remove("btn-register-active");
    login_header.classList.remove("login-header-fade");
    btn_register.classList.remove("btn-register-fade");
    btn_login.classList.remove("btn-login-fade");
});