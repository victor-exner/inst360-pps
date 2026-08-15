import { useEffect, useState } from "react";
import "./Cadastro.css";
import Mensagem from "../../components/Mensagem/Mensagem";
import FormularioCadastro from "../../components/FormCadastro/FormCadastro";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import Navbar from "../../components/Navbar/Navbar";

const API = "http://localhost:8080/usuarios";

function Cadastro() {
  const [usuario, setUsuario] = useState({
    nome: "",
    matricula: "",
    endereco: "",
    dataNasc: "",
    email: "",
    senha: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setUsuario({ ...usuario, [name]: value });
  }

  async function cadastrar(evento) {
    evento.preventDefault();
    setMensagem("");
    setErro("");

    try {
      const resposta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar usuário.");
      }

      setMensagem("Usuário cadastrado com sucesso!");
      setUsuario({
        nome: "",
        matricula: "",
        endereco: "",
        dataNasc: "",
        email: "",
        senha: ""
      });
      
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <>
      <Navbar/>

      <main className="container">

        <h1>Cadastro de Usuário</h1>

        <FormularioCadastro
          usuario={usuario}
          alterarCampo={alterarCampo}
          cadastrar={cadastrar}
        />

        <Mensagem
          texto={mensagem}
          tipo="sucesso"
        />

        <Mensagem
          texto={erro}
          tipo="erro"
        />

      </main>
    </>
  );
}

export default Cadastro;