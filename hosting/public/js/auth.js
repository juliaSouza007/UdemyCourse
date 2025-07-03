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
            showError('Falha no Acesso', error);
        });
    }else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).then(function(user){
            console.log("Usuário cadastrado com sucesso! ");
            console.log(user);
        }).catch (function(error) {
            showError("Erro ao cadastrar usuário:", error);
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
    user.sendEmailVerification(actionCodeSettings).then(function() {
        alert("E-mail de verificação enviado com sucesso para " + user.email + "!");
    }).catch(function(error) {
        showError("Erro ao enviar e-mail de verificação: ", error);
    }).finally(function() {
        hideItem(loading);
    });
}

//função que permite o envio de um e-mail para redefinição de senha
function sendPasswordResetEmail() {
    var email = prompt("Digite seu e-mail para redefinir a senha:", authForm.email.value);
    if (email) {
        showItem(loading);
        firebase.auth().sendPasswordResetEmail(email,actionCodeSettings).then(function() {
            alert("E-mail de redefinição de senha enviado para " + email + "!");
        }).catch(function(error) {
            showError("Erro ao enviar e-mail de redefinição de senha: ", error);
        }).finally(function() {
            hideItem(loading);
        });
    } else {
        alert("E-mail não fornecido. A redefinição de senha foi cancelada.");
    }
}

//função que permite o login com a conta do Google
function signInWithGoogle() {
    showItem(loading);
    //é possivel fazer com o firebase.auth().signInWithRedirect abrindo uma nova aba
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function(error) {
        showError("Erro ao logar com o Google: ", error);
        hideItem(loading);
    }).finally(function() {
        hideItem(loading);
    });
}

//função que permite o login com a conta do GitHub
function signInWithGithub() {
    showItem(loading);
    //é possivel fazer com o firebase.auth().signInWithRedirect abrindo uma nova aba
    firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch(function(error) {
        showError("Erro ao logar com o GitHub: ", error);
        hideItem(loading);
    }).finally(function() {
        hideItem(loading);
    });
}
//função que atualiza o nome de usuário
function updateUsername() {
    var newName = prompt("Digite o novo nome de usuário:", userName.innerHTML);
    if (newName) {
        userName.innerHTML = newName;
        showItem(loading);
        firebase.auth().currentUser.updateProfile({
            displayName: newName
        }).catch(function(error) {
            showError("Erro ao atualizar nome de usuário: ", error);
        }).finally(function() {
            hideItem(loading);
        });
    } else {
        alert("Nome de usuário não fornecido. A atualização foi cancelada.");
        hideItem(loading);
    }
} 

//função que exclui a conta do Usuário
function deleteAccount() {
    var confirmation = confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.");
    if (confirmation) {
        showItem(loading);
        firebase.auth().currentUser.delete().then(function() {
            alert("Conta excluída com sucesso!");
        }).catch(function(error) {
            showError("Erro ao excluir conta: ", error);
        }).finally(function() {
            hideItem(loading);
        });
    }
}