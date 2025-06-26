authForm.onsubmit = function (event) {
    showItem(loading);
    event.preventDefault();

    if (authForm.submitAuthForm.innerHTML == "Entrar") {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function(user){
            console.log("Usuário logado com sucesso!");
            console.log(user);
        }).catch (function(error) {
            console.error("Erro ao logar usuário:", error);
            console.log(user);
        });
    }else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function(user){
            console.log("Usuário cadastrado com sucesso!");
            console.log(user);
        }).catch (function(error) {
            console.error("Erro ao cadastrar usuário:", error);
        });
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    hideItem(loading);
    if (user) {
        console.log("Usuário logado:", user);
    } else {
        console.log("Nenhum usuário logado.");
    }
});