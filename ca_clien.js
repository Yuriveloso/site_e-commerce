import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Meu app Web
const firebaseConfig = {
    apiKey: "AIzaSyAIIFuZlv7i3Mt5Ba1QJtF7mRlH8l6iook",
    authDomain: "loja-web1.firebaseapp.com",
    databaseURL: "https://loja-web1-default-rtdb.firebaseio.com",
    projectId: "loja-web1",
    storageBucket: "loja-web1.firebasestorage.app",
    messagingSenderId: "551680108820",
    appId: "1:551680108820:web:4aac220a8de1e025b07a01"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Cadastro de produto

import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const db = getDatabase();

// Elementos do form de cadastro
let nome = document.getElementById('nome');
let email = document.getElementById('email');
let cpf = document.getElementById('cpf');
let endereco = document.getElementById('endereço');
let cadastrarcliente = document.getElementById('cadastrarcliente');

// Elementos do form de busca/atualização
let editNome = document.getElementById('edit-nome');
let editEmail = document.getElementById('edit-email');
let editCpf = document.getElementById('edit-cpf');
let editEndereco = document.getElementById('edit-endereço');
let atualizarcliente = document.getElementById('atualizarcliente');
let deletarcliente = document.getElementById('deletarcliente');

// MÁSCARA PARA CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

cpf.addEventListener('input', function(e) {
    e.target.value = formatarCPF(e.target.value);
});

editCpf.addEventListener('input', function(e) {
    e.target.value = formatarCPF(e.target.value);
});

// ADICIONAR CLIENTE
function AddCliente(){
    // Remove a máscara do CPF para armazenar
    const cpfSemMascara = cpf.value.replace(/\D/g, '');

    set(ref(db, 'Cliente/' + cpfSemMascara), {
        nome: nome.value,
        email: email.value,
        cpf: cpfSemMascara,
        endereco: endereco.value
    }).then(() => {
        nome.value = '';
        email.value = '';
        cpf.value = '';
        endereco.value = '';
        alert("Clinete Cadastrado!");
    }).then((error) => {
        console.log(error);
        alert('Cliente Não Cadastrado!');
    });
}

// PESQUISAR CLIENTE
function PesquisarCliente(){
    const cpfBusca = editCpf.value.replace(/\D/g, '');

    if(!cpfBusca){
        alert('Informe o CPF para buscar');
        return;
    }

    const dbRef = ref(db);
    get(child(dbRef, 'Cliente/' + cpfBusca)).then((snapshot) => {
        if(snapshot.exists()){
            const cliente = snapshot.val();
            editNome.value = cliente.nome;
            editEmail.value = cliente.email;
            editEndereco.value = cliente.endereco;
            editCpf.dataset.id = cpfBusca; // Armazena o CPF sem máscara para atualização
            alert('Cliente Localizado!');
        } else {
            alert("O cliente não existe");
            editNome.value = '';
            editEmail.value = '';
            editEndereco.value = '';
        }
    }).catch((e) => {
        alert('Algo deu errado!');
        console.log(e);
    });
}

// ATUALIZAR CLIENTE
function AtualizarCliente(){
    const cpfSemMascara = editCpf.dataset.id;

    if(!cpfSemMascara){
        alert('Primeiro busque um cliente para atualizar');
        return;
    }

    update(ref(db, 'Cliente/' + cpfSemMascara), {
        nome: editNome.value,
        email: editEmail.value,
        endereco: editEndereco.value
    }).then(() => {
        alert('Cliente Atualizado!');
    }).then((e) => {
        alert('Algo deu errado!');
        console.log(e);
    });
}

// DELETAR CLIENTE
function DeletarCliente(){
    const cpfSemMascara = editCpf.dataset.id;
    
    if(!cpfSemMascara){
        alert('Primeiro busque um cliente para deletar');
        return;
    }
    
    if(confirm('Tem certeza que deseja deletar este cliente?')){
        remove(ref(db, 'Cliente/' + cpfSemMascara)).then(() => {
            editNome.value = '';
            editEmail.value = '';
            editCpf.value = '';
            editEndereco.value = '';
            delete editCpf.dataset.id;
            alert('Cliente Deletado!');
        }).catch((e) => {
            alert('Algo deu errado!');
            console.log(e);
        });
    }
}

// EVENT LISTENERS
cadastrarcliente.addEventListener('click', AddCliente);
editCpf.addEventListener('blur', PesquisarCliente); // Busca quando sai do campo
atualizarcliente.addEventListener('click', AtualizarCliente);
deletaarcliente.addEventListener('click', DeletarCliente);