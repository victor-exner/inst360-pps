import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function AcessoFormulario() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [contrasenha, setContrasenha] = useState("");
const [etapa, setEtapa] = useState("email");
const [mensagem, setMensagem] = useState("");
const [erro, setErro] = useState("");
const [carregando, setCarregando] = useState(false);

async function solicitarContrasenha(evento) {
evento.preventDefault();

setErro("");
setMensagem("");
setCarregando(true);

try {
  const resposta = await fetch(
    "http://localhost:8080/contrasenhas/solicitar",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    }
  );

  const texto = await resposta.text();

  if (!resposta.ok) {
    throw new Error(texto || "Não foi possível solicitar o código.");
  }

  setMensagem(texto);
  setEtapa("codigo");
} catch (erro) {
  setErro(erro.message || "Erro ao solicitar a contrassenha.");
} finally {
  setCarregando(false);
}

}

async function validarContrasenha(evento) {
evento.preventDefault();

setErro("");
setMensagem("");
setCarregando(true);

try {
  const resposta = await fetch(
    "http://localhost:8080/contrasenhas/validar",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ contrasenha })
    }
  );

  const texto = await resposta.text();

  if (!resposta.ok) {
    throw new Error(texto || "Contrassenha inválida ou já utilizada.");
  }

  setMensagem("Código validado com sucesso!");

  navigate("/formulario");
} catch (erro) {
  setErro(erro.message || "Erro ao validar a contrassenha.");
} finally {
  setCarregando(false);
}

}

return (
<>
<Navbar />

  <div className="container">
    <h1>Acesso ao formulário</h1>

    {mensagem && (
      <p className="mensagem sucesso">{mensagem}</p>
    )}

    {erro && (
      <p className="mensagem erro">{erro}</p>
    )}

    {etapa === "email" ? (
      <form className="formulario" onSubmit={solicitarContrasenha}>
        <div className="campo">
          <label htmlFor="email">E-mail:</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? "Enviando..." : "Solicitar contrassenha"}
        </button>
      </form>
    ) : (
      <form className="formulario" onSubmit={validarContrasenha}>
        <div className="campo">
          <label htmlFor="contrasenha">Contrassenha recebida:</label>

          <input
            id="contrasenha"
            type="text"
            value={contrasenha}
            onChange={(evento) => setContrasenha(evento.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? "Validando..." : "Validar contrassenha"}
        </button>

        <button
          type="button"
          disabled={carregando}
          onClick={() => {
            setEtapa("email");
            setContrasenha("");
            setErro("");
            setMensagem("");
          }}
        >
          Voltar
        </button>
      </form>
    )}
  </div>
</>

);
}

export default AcessoFormulario;