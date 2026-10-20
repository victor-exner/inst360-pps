import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

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

    <main className="acesso-formulario-container">
      <h1>Acesso ao formulário de pesquisa</h1>

      <p>
        Solicite uma contrassenha por e-mail ou informe um
        código que você já possui.
      </p>

      <form onSubmit={solicitarContrasenha}>
        <label htmlFor="email">
          E-mail
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          placeholder="Digite seu e-mail"
          required
          disabled={carregando}
        />

        <button type="submit" disabled={carregando}>
          {carregando
            ? "Processando..."
            : "Solicitar contrassenha"}
        </button>
      </form>

      <hr />

      <button
        type="button"
        disabled={carregando}
        onClick={() => {
          setMostrarCampoCodigo(!mostrarCampoCodigo);
          setMensagem("");
          setTipoMensagem("");
        }}
      >
        {mostrarCampoCodigo
          ? "Ocultar campo de contrassenha"
          : "Já possuo uma contrassenha"}
      </button>

      {mostrarCampoCodigo && (
        <form onSubmit={validarContrasenha}>
          <label htmlFor="contrasenha">
            Contrassenha
          </label>

          <input
            id="contrasenha"
            type="text"
            value={contrasenha}
            onChange={(evento) =>
              setContrasenha(evento.target.value)
            }
            placeholder="Digite sua contrassenha"
            required
            disabled={carregando}
          />

          <button type="submit" disabled={carregando}>
            {carregando
              ? "Validando..."
              : "Validar contrassenha"}
          </button>
        </form>
      )}

      {mensagem && (
        <p
          role="status"
          style={{
            color: tipoMensagem === "sucesso" ? "green" : "red",
            marginTop: "16px",
          }}
        >
          {mensagem}
        </p>
      )}
    </main>
  </>
  );
}

export default AcessoFormulario;