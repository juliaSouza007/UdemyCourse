//definindo referencias para os elementos da pagina HTML
var authForm = document.getElementById('authForm');
var authFormTitle = document.getElementById('authFormTitle');

var register = document.getElementById('register');
var access = document.getElementById('access');

var loading = document.getElementById('loading');

//alterar o forms de autenticação para cadastro
function toogleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastre-se';
    authFormTitle.innerHTML = 'Insira seus dados para cadastro';

    hideItem(register);
    showItem(access);
}

//alterar o forms de autenticação para acesso
function toogleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Entrar';
    authFormTitle.innerHTML = 'Acesse sua conta para continuar';

    hideItem(access);
    showItem(register);
}

//remove elementos da aba
function hideItem(item) {
    item.style.display = 'none';
}

//oculta elementos da aba
function showItem(item) {
    item.style.display = 'block';
}