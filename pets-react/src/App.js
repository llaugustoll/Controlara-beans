import React from 'react';
import axios from "axios";

class ListaPets extends React.Component{
  render(){
    const lista = this.props.state.lista ;
    const listaDisplay =[];
    for (let i = 0 ; i<lista.length; i++){
      listaDisplay.push(
        <p> {lista[i].id} - {lista[i].especie} - {lista[i].raca} - {lista[i].nome} </p>
      )
    }
    return(
      <div>
         <h2>PETS</h2>
         {listaDisplay}
      </div>
    )
  }
}

function LabelInput(props){
  return(
    <div>
      <label>{props.label}</label>
      <input type="TEXT" value = {props.value} 
                          onChange={(e)=>{
                            if(props.atualizarTexto){
                              props.atualizarTexto(e.target.value);
                            }
                          }}/>
    </div>
  )

}

class App extends React.Component {
  state = { 
    petAtual:{
      id:"",
      nome:"",
      especie:"",
      raca:"",
    },
    lista:[]
  }


  componentDidMount(){
    axios.get(
      'http://localhost:8080/Atividade3/pets',
        {
          responseType: 'json',
        }
      ).then(
      (response) => {
        console.log(response);
        const novoState = { ...this.state};
        novoState.lista = response.data;
        this.setState(novoState);
      }
    );
    console.log("Pets Carregados")
  }
  atualizarTexto(txt , dado){
    const novoState = {...this.state};
    novoState.petAtual[dado] = txt
    this.setState(novoState);
  }

  salvar(){
    const apiUrl = 'http://localhost:8080/Atividade3/adicionarPet';
      fetch(apiUrl, {
        method:'POST',
        headers:{
          Accept:'text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.petAtual)
      }).then(
        (response)=>{
          console.log(response.body);
          this.componentDidMount();
        }
      );
  }

  render() {
    return(
      <div> 
          <h1>Formulario de Pets </h1>
          <p>ID:</p>
          <LabelInput value = {this.state.petAtual.id} 
                      atualizarTexto ={(txt) => this.atualizarTexto(txt,'id')}/>
          <p> ---------------------------------------------------------------</p>
          <p>Nome:</p>
          <LabelInput value = {this.state.petAtual.nome} 
                      atualizarTexto ={(txt) => this.atualizarTexto(txt,'nome')} />
          <p> ---------------------------------------------------------------</p>
          <p>Espécie:</p>
          <LabelInput value = {this.state.petAtual.especie} 
                      atualizarTexto ={(txt) => this.atualizarTexto(txt,'especie')} />
          <p> ---------------------------------------------------------------</p>
          <p>Raça</p>
          <LabelInput value = {this.state.petAtual.raca} 
                      atualizarTexto ={(txt) => this.atualizarTexto(txt,'raca')} />
                    

          <button onClick ={()=>{this.salvar()}}>Salvar</button>
          <ListaPets state = {this.state}/>

      </div>
    );
  }
}

export default App;
