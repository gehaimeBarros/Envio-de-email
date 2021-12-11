import React, {useState} from 'react';
import img1 from "./img/Getter (1).png";
import axios from "axios";
import './App.css';
 
function App() {

  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    mensagem: '',
    anexo: ''
});

function handleInputChange(event){
    if(event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
}

function handleFormSubmit(event){
  event.preventDefault();
  console.log(campos);
  send();
}

function send(){
  const formData = new FormData();
  Object.keys(campos).forEach(key => formData.append(key, campos[key]));
  axios.post('/send', formData, {
    headers: {
    'Content-Type': `multipart/form-data;boundary=${formData._boundary}`
  }
})
.then(response => alert("Boleto Gerado Com Sucesso! "+response.data));
setTimeout(function() {
  window.location.reload(1);
}, 5000);
}

  return (
    <div className="container">
      <img src={img1}/>
      <legend>recibo do locador</legend>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" placeholder="Email do locador(a)" onChange={handleInputChange}/>
 
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Nome do locador(a)" onChange={handleInputChange}/>
 
        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Escreva uma menssagem.." className="textArea" onChange={handleInputChange}></textarea>
 
        <label htmlFor="anexo">Anexo</label>
        <input type="file" id="anexo" name="anexo" onChange={handleInputChange}/>
 
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}
 
export default App;