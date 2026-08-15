import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Navbar from "../../components/Navbar/Navbar";

function Login() {

  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  function fazerLogin(evento) {

    evento.preventDefault();

    const dadosLogin = {
      matricula: matricula,
      senha: senha
    };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosLogin)
    })
      .then(async (resposta) => {

        const dados = await resposta.json();

        if (!resposta.ok) {
          throw new Error(dados.mensagem);
        }

        return dados;
      })
      .then((usuario) => {

        console.log("Usuário autenticado:", usuario);

        sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuario)
        );

        setMensagemErro("");

        navigate("/home");

      })
      .catch((erro) => {

        setMensagemErro(erro.message);

      });
  }

  return (
    <>
    <Navbar/>

    <div className="container">

      <h1>Login</h1>

      {mensagemErro && (
        <p className="mensagem erro">
          {mensagemErro}
        </p>
      )}

      <form
        className="formulario"
        onSubmit={fazerLogin}
      >

        <div className="campo">
          <label>Matrícula:</label>

          <input
            type="text"
            value={matricula}
            onChange={(evento) =>
              setMatricula(evento.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Senha:</label>

          <input
            type="password"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
          />
        </div>

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>
  </>
  );
}

export default Login;