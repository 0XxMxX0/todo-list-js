let input = document.getElementsByTagName('input')[0];
        let lista = document.getElementsByTagName('ul')[0];
        let erro = document.getElementById('erro');
        let valor_localstorage = localStorage.getItem("minhas_tarefas");

        let listaTarefa = [];
        listaTarefa = JSON.parse(valor_localstorage);
        
        function novaTarefa(){
            let tarefa_atual = input.value;
            console.log(tarefa_atual)
            if(tarefa_atual != ""){
                if(erro != null){
                    erro.style.display = 'none'
                }
                listaTarefa.push(tarefa_atual);
                lista.innerHTML += `<li onclick="limpar(this)">${tarefa_atual}</li>`; 
                localStorage.setItem("minhas_tarefas", JSON.stringify(listaTarefa));
            } else{
                erro.innerText = 'Digite algo!';
                erro.style.display = 'block';
            }
        }
        
        function limpar(tarefa_excluir){
            let elementoExcluir = tarefa_excluir.innerText
            tarefa_excluir.id = 'check'
            for(let i = 0; i < listaTarefa.length; i++){
                if(elementoExcluir == listaTarefa[i]){
                    listaTarefa.splice(i,1);
                    localStorage.setItem("minhas_tarefas", JSON.stringify(listaTarefa));
                    if(valor_localstorage == '[]'){
                        window.setTimeout(mensagemVazio, 1500);

                        function mensagemVazio(){
                            erro.style.display = 'block';
                        }
                    } 
                }     
            }
            tarefa_excluir.innerText = 'Concluido com sucesso!'
            window.setTimeout(apagar, 2000);
            
            function apagar(){
                tarefa_excluir.remove();
            }
        };

        onload = () => {
            console.log(listaTarefa)
            if(valor_localstorage != '[]'){
                for(let i = 0; i < listaTarefa.length; i++){
                    lista.innerHTML += `<li onclick="limpar(this)">${listaTarefa[i]}</li>`; 
                }
            } else {
                if(listaTarefa.length == 0){
                    erro.innerHTML = 'Adicione novas tarefas!!';
                }
            }
        }