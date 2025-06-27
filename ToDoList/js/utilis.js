//definindo referencias para os elementos da pagina HTML
var authForm = document.getElementById('authForm');
var authFormTitle = document.getElementById('authFormTitle');

var register = document.getElementById('register');
var access = document.getElementById('access');

var loading = document.getElementById('loading');

var auth = document.getElementById('auth');
var userContent = document.getElementById('userContent');

var userEmail = document.getElementById('userEmail');

var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv');
var emailVerified = document.getElementById('emailVerified');

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

//mostrar conteúdo pra usuários não autenticados
function showAuth() {
    authForm.email.value = '';
    authForm.password.value = '';
    hideItem(userContent);
    showItem(auth);
}

//mostrar conteúdo para usuários autenticados
function showUserContent(user) {
    console.log(user);
    if (user.emailVerified) {
        emailVerified.innerHTML = 'Seu e-mail foi verificado!';
        hideItem(sendEmailVerificationDiv);
    } else {
        emailVerified.innerHTML = 'Seu e-mail não foi verificado!';
        showItem(sendEmailVerificationDiv);
    }
    userEmail.innerHTML = user.email;
    hideItem(auth);
    showItem(userContent);
}

//parte que não podemos alterar atualmente
/*
var actionCodeSettings = {
    url: 'http://127.0.0.1:5500/'
}
*/