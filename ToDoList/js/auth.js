//traduz o conteúdo do site para português
firebase.auth().languageCode = 'pt-BR';

//função que trata a submissão do forms de autenticação
authForm.onsubmit = function (event) {
    showItem(loading);
    event.preventDefault();

    if (authForm.submitAuthForm.innerHTML == "Entrar") {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function(user){
            console.log("Usuário logado com sucesso!");
            console.log(user);
        }).catch (function(error) {
            console.error("Erro ao logar usuário:", error);
            hideItem(loading);
        });
    }else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function(user){
            console.log("Usuário cadastrado com sucesso!");
            console.log(user);
        }).catch (function(error) {
            console.error("Erro ao cadastrar usuário:", error);
            hideItem(loading);
        });
    }
}

//função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function(user) {
    hideItem(loading);
    if (user) {
        showUserContent(user);
    } else {
        showAuth();
    }
});

//função que permite o user sair de sua conta
function signOut() {
    firebase.auth().signOut().catch(function(error) {
        console.error("Erro ao sair:", error);
    });
}

//função que permite o envio de um e-mail de verificação
function sendEmailVerification() {
    var user =firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        alert("E-mail de verificação enviado com sucesso para " + user.email + "!");
    }).catch(function(error) {
        alert("Erro ao enviar e-mail de verificação:");
        console.error(error);
    }).finally(function() {
        hideItem(loading);
    });
}