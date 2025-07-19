function Pesquisar(){
    let section = document.getElementById('resultados-pesquisa');

    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();



    let resultados = "";
    
    for (let item of dados){
        nome = item.nome.toLocaleLowerCase();
        descricao = item.descricao.toLocaleLowerCase();
        
        if (nome.startsWith(campoPesquisa) || descricao.startsWith(campoPesquisa)){
            resultados += 
        `
            <div class="item-resultado">
                <img src="./img/${item.imag}"></img>
                <h2>${item.nome}</h2>
                <p class="descricao-meta">${item.descricao}</p>
            </div>
        `
        }
        
    }
    if(!resultados) {
        resultados = "<p>Resultado não Encontrado</p>"
    }     
    section.innerHTML = resultados;
}