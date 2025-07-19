// URL do projeto

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
let descricao = document.getElementById('descricao');
let cadastrarProduto = document.getElementById('cadastrarProduto');

// Elementos do formulario de busca/atualização
let editNome = document.getElementById('edit-nome');
let editDescricao = document.getElementById('edit-descricao');
let atualizarProduto = document.getElementById('atualizarProduto');
let deletarProduto = document.getElementById('deletarProduto');


//Adicionar Produto
function AddProduto() {
  // Gerar um ID único baseado no timestamp
  const produtoID = 'prod_' + Date.now();

  set(ref(db, 'Produto/' + produtoID), {
    id: produtoID,
    nome: nome.value,
    descricao: descricao.value
  }).then(() => {
    nome.value = '';
    descricao.value = '';
    alert("Produto Cadastrado!");
  }).catch((error) => {
    console.log(error);
    alert('Produto Não Cadastrado!')
  });
}

// Pesquisar Produto
function PesquisarProduto(){
  const dbRef = ref(db);

  //Busca todos os produtos
  get(child(dbRef, 'Produto')).then((snapshot) => {
    if(snapshot.exists()){
      const produtos = snapshot.val();
      let produtoEncontrado = null;

      // Procura pelo nome do prosuto
      for(const id in produtos){
        if(produtos[id].nome.toLowerCase() === editNome.value.toLowerCase()){
          produtoEncontrado = produtos[id];
          break;
        }
      }
      if(produtoEncontrado){
        editDescricao.value = produtoEncontrado.descricao;
        editNome.dataset.id = produtoEncontrado.id; //Armazena o ID para atualização
        alert('Produto Localizado!');
      } else {
        alert("O Produto não existe");
        editDescricao.value = '';
      }
    } else {
      alert (" Nenhum produto cadastrado ainda");
    }
  }).catch((e) => {
    alert('Algo deu errado!');
    console.log(e);
  });
}

// ATUALIZAR PRODUTO
function AtualizarProdutos(){
  const produtoID = editNome.dataset.id;

  if(!produtoID){
    alert('Primeiro busque um produto para atualizar');
    return;
  }

  update(ref(db, 'Produto/' + produtoID), {
    nome: editNome.value,
    descricao: editDescricao.value
  }).then(() => {
    alert('Produto Atualizado!');
  }).catch((e) => {
    alert('Algo deu errado!');
    console.log(e);
  });
}

// DELETAR PRODUTO
function DeletarProduto(){
  const produtoID = editNome.dataset.id;

  if(!produtoID){
    alert('Primeiro busque um produto para deletar');
    return;
  }

  if(confirm('Tem certeza que deseja deletar este produto?')){
    remove(ref(db, 'Produto/' + produtoID)).then(() => {
      editNome.value = '';
      editDescricao.value = '';
      delete editNome.dataset.id;
      alert('Produto Deletado!');
    }).catch((e) => {
      alert('Algo deu errado!');
      console.log(e);
    });
  }
}

// EVENT LISTENERS

cadastrarProduto.addEventListener('click', AddProduto);
editNome.addEventListener('blur', PesquisarProduto);
atualizarProduto.addEventListener('click', AtualizarProdutos);
deletarProduto.addEventListener('click', DeletarProduto)