//trata o envio do forms de autenticação
todoForm.onsubmit = function (event) {
  event.preventDefault() // evita o redirecionamento da página
  if (todoForm.name.value != '') {
    var data = {
      name: todoForm.name.value
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
      console.log('Tarefa "' + data.name + '" adicionada com sucesso');
      todoForm.name.value = ''; // limpa o campo após adicionar
    }).catch(function (error) {
        showError("Falha ao adcionar a a tarefa: ", error);
    });
  } else {
    alert('O nome da tarefa não pode ser em branco para criar a tarefa!');
  }
}

//exibe a lista de tarefas de um usuário
function fillTodoList (dataSnapshot) {
    ulTodoList.innerHTML = ''; // Limpa a lista antes de preencher
    var num = dataSnapshot.numChildren();
    todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':'; //exibe o número de tarefas

    dataSnapshot.forEach(function (item) { //percorre os elementos
        var value = item.val();
        var li = document.createElement('li'); //cria um elemento li
        var spanLi = document.createElement('span'); //cria um elemento span

        spanLi.appendChild(document.createTextNode(value.name)); //adiciona o nome da tarefa ao span
        spanLi.id = item.key; //define o id do span como a chave da tarefa
        
        li.appendChild(spanLi); //adiciona o span ao li

        var liRemoveBtn = document.createElement('button'); //cria um botão para remover a tarefa
        liRemoveBtn.appendChild(document.createTextNode('Remover')); //adiciona o texto ao botão
        liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key + '\")'); //define a função de remoção com o id da tarefa
        liRemoveBtn.setAttribute('class', 'danger todoBtn'); //adiciona uma classe para estilização
        li.appendChild(liRemoveBtn); //adiciona o botão de remoção ao li

        var liUpdateBtn = document.createElement('button'); //cria um botão para editar a tarefa
        liUpdateBtn.appendChild(document.createTextNode('Editar')); //adiciona o texto ao botão
        liUpdateBtn.setAttribute('onclick', 'updadeTodo(\"' + item.key + '\")'); //define a função de editar com o id da tarefa
        liUpdateBtn.setAttribute('class', 'alternative todoBtn'); //adiciona uma classe para estilização
        li.appendChild(liUpdateBtn); //adiciona o botão de editar ao li

        ulTodoList.appendChild(li); //adiciona o li à lista de tarefas
    });
}

// função para remover uma tarefa
function removeTodo (key) {
    var selectedItem = document.getElementById(key);
    var confirmation = confirm('Você tem certeza que deseja remover a tarefa: "' + selectedItem.innerHTML + '"?');
    if (confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function (error) {
          showError("Falha ao remover a tarefa: ", error);
        });
    }
}

// função para atualizar uma tarefa
function updadeTodo (key) {
    var selectedItem = document.getElementById(key);
    var newTodoName = prompt('Atualize o nome da tarefa: \"' + selectedItem.innerHTML + '\".', selectedItem.innerHTML);
    if (newTodoName != '') {
        var data = {
          name: newTodoName
        };

        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).catch(function (error) {
          showError("Falha ao atualizar a tarefa: ", error);
        });
    } else {
        alert('O nome da tarefa não pode ser em branco para atualizar!');
    }
}