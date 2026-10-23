import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import "./AcessoFormulario.css";

function AcessoFormulario() {
  const navigate = useNavigate();

//verificando se existe um usuário logado para impedir acesso na rota sem login
  useEffect(() => {
    const usuarioSalvo = sessionStorage.getItem("usuarioLogado");

    if(!usuarioSalvo){
      navigate("/login", {replace: true});
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [contrasenha, setContrasenha] = useState("");

  const [mostrarCampoCodigo, setMostrarCampoCodigo] =
    useState(false);

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function solicitarContrasenha(evento) {
    evento.preventDefault();

    setMensagem("");
    setTipoMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:8080/contrasenhas/solicitar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const texto = await resposta.text();

      if (!resposta.ok) {
        throw new Error(texto || "Não foi possível solicitar a contrassenha.");
      }

      setMensagem(texto || "Verifique seu e-mail para obter a contrassenha.");
      setTipoMensagem("sucesso");
    } catch (erro) {
      setMensagem(
        erro.message || "Erro ao solicitar a contrassenha."
      );
      setTipoMensagem("erro");
    } finally {
      setCarregando(false);
    }
  }

  async function validarContrasenha(evento) {
    evento.preventDefault();

    setMensagem("");
    setTipoMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://localhost:8080/contrasenhas/validar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ contrasenha }),
        }
      );

      const texto = await resposta.text();

      if (!resposta.ok) {
        throw new Error(texto || "Contrassenha inválida ou já utilizada.");
      }

      navigate("/formulario");
    } catch (erro) {
      setMensagem(
        erro.message || "Erro ao validar a contrassenha."
      );
      setTipoMensagem("erro");
    } finally {
      setCarregando(false);
    }
  }

  return (
<>
  <Navbar/>

  <div className="acessoform-container">
    <main className="acessoform-subcontainer">
      <h1>Acesso ao formulário de pesquisa</h1>

      <p className="acessoform-subtitulo">Solicite uma contrassenha por e-mail ou informe um
        código que você já possui.</p>

      <form onSubmit={solicitarContrasenha}>
        <label htmlFor="email">E-mail:</label>

        <input id="email" type="email" value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          placeholder="Digite seu e-mail"
          required
          disabled={carregando}
          className="input-acessoform"/>

        <button type="submit" disabled={carregando} className="btn-acessoform">
          {carregando
            ? "Processando..."
            : "Solicitar contrassenha"}
        </button>
      </form>

      <hr/>
    
    <div className="container-btn-ocultar">
      <button type="button" disabled={carregando} 
      className={`btn-acessoform ${mostrarCampoCodigo ? "btn-acessoform-ocultar" : ""}`}
        onClick={() => {
          setMostrarCampoCodigo(!mostrarCampoCodigo);
          setMensagem("");
          setTipoMensagem("");
        }}>

        {mostrarCampoCodigo
          ? "Ocultar campo de contrassenha"
          : "Já possuo uma contrassenha"}
      </button>
    </div>

  <div className=
  {`container-contrasenha ${mostrarCampoCodigo ? "contrasenha-visivel" : ""}`}
  aria-hidden={!mostrarCampoCodigo}>

        <form onSubmit={validarContrasenha} className="form-contrasenha"
        inert={!mostrarCampoCodigo}>

          <label htmlFor="contrasenha">Contrassenha</label>

          <input id="contrasenha" type="text"
            value={contrasenha}
            onChange={(evento) =>
              setContrasenha(evento.target.value)}
            placeholder="Digite sua contrassenha"
            required
            disabled={carregando || !mostrarCampoCodigo}
            className="input-acessoform"/>

          <button type="submit" disabled={carregando || !mostrarCampoCodigo} className="btn-acessoform">
            {carregando
              ? "Validando..."
              : "Validar contrassenha"}
          </button>
        </form>
    </div>

    <div className="container-msg-acessoform">
      {mensagem && (
        <p role="status" className="msg-acessoform"
          style={{color: tipoMensagem === "sucesso" ? "green" : "red"}}>
          {mensagem}
        </p>
      )}
    </div>

    </main>
  </div>
  </>
  );
}

export default AcessoFormulario;