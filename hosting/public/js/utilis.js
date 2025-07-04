//definindo referências para os elementos da pagina HTML
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
var passwordReset = document.getElementById('passwordReset');
var userImg = document.getElementById('userImg');
var userName = document.getElementById('userName');

//definindo referências para realtime database
var todoForm = document.getElementById('todoForm');
var ulTodoList = document.getElementById('ulTodoList');
var todoCount = document.getElementById('todoCount');

//alterar o forms de autenticação para cadastro
function toogleToRegister() {
    authForm.submitAuthForm.innerHTML = 'Cadastre-se';
    authFormTitle.innerHTML = 'Insira seus dados para cadastro';

    hideItem(register);
    showItem(access);
    hideItem(passwordReset);
}

//alterar o forms de autenticação para acesso
function toogleToAccess() {
    authForm.submitAuthForm.innerHTML = 'Entrar';
    authFormTitle.innerHTML = 'Acesse sua conta para continuar';

    hideItem(access);
    showItem(register);
    showItem(passwordReset);
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
    //se for diferente de login por email e senha, não é necessário verificar o e-mail
    if (user.providerData[0].providerId != 'password') {
        emailVerified.innerHTML = 'Autenticação por provedor confiável!<br>Não é necessário verificar o e-mail!';
        hideItem(sendEmailVerificationDiv);
    } else {
        if (user.emailVerified) {
            emailVerified.innerHTML = 'Seu e-mail foi verificado!';
            hideItem(sendEmailVerificationDiv);
        } else {
            emailVerified.innerHTML = 'Seu e-mail não foi verificado!';
            showItem(sendEmailVerificationDiv);
        }
    }   
    userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png';
    userName.innerHTML = user.displayName ? user.displayName : '';

    userEmail.innerHTML = user.email;
    hideItem(auth);

    dbRefUsers.child(firebase.auth().currentUser.uid).on('value', function(dataSnapshot) {
        fillTodoList(dataSnapshot);
    });

    showItem(userContent);
}

//centralizar e traduzir erros
function showError(prefix, error) {
    hideItem(loading);
    console.error(error.code);

    if (error.code) {
        switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/wrong-password':
                alert(prefix + ' ' + 'E-mail ou senha inválidos!');
                break;
            case 'auth/user-disabled':
                alert(prefix + ' ' + 'Usuário desativado!');
                break;
            case 'auth/weak-password':
                alert(prefix + ' ' + 'Senha muito fraca! A senha deve ter pelo menos 6 caracteres.');
                break;
            case 'auth/user-not-found':
                alert(prefix + 'Usuário não encontrado!');
                break;
            case 'auth/email-already-in-use':
                alert(prefix + ' ' + 'E-mail já cadastrado!');
                break;
            case 'auth/popup-closed-by-user':
                alert(prefix + ' ' + 'Pop-up fechado pelo usuário antes da operação ser concluída!');
                break;
            default:
                alert(prefix + ' ' + error.message);
        }
    } else {
        alert('Erro desconhecido: ' + error);
    }
}

var actionCodeSettings = {
    url: 'https://todolist-38151.firebaseapp.com'
}

var database = firebase.database();
var dbRefUsers = database.ref('users');

