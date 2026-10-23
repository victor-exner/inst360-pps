import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";

import Navbar from "../../components/Navbar/Navbar";

const perguntas = [
  {
    id: "resposta1",
    titulo:
      "1. Como você avalia a infraestrutura das salas de aula (iluminação, climatização, mobiliário e recursos tecnológicos)?",
    opcoes: [
      "Excelente",
      "Boa",
      "Regular",
      "Ruim",
      "Péssima",
    ],
  },
  {
    id: "resposta2",
    titulo:
      "2. Os espaços de estudo e pesquisa (biblioteca, laboratórios, salas de informática) atendem às suas necessidades acadêmicas?",
    opcoes: [
      "Atendem totalmente",
      "Atendem parcialmente",
      "Atendem muito pouco",
      "Não atendem",
      "Não utilizo esses espaços",
    ],
  },
  {
    id: "resposta3",
    titulo:
      "3. Qual o seu nível de satisfação com a limpeza e higienização dos banheiros da instituição?",
    opcoes: [
      "Muito satisfeito(a)",
      "Satisfeito(a)",
      "Neutro(a)",
      "Insatisfeito(a)",
      "Muito insatisfeito(a)",
    ],
  },
  {
    id: "resposta4",
    titulo:
      "4. A limpeza e a conservação das áreas comuns (corredores, pátios, praça de alimentação) são mantidas de forma adequada?",
    opcoes: [
      "Sempre",
      "Na maioria das vezes",
      "Às vezes",
      "Raramente",
      "Nunca",
    ],
  },
  {
    id: "resposta5",
    titulo:
      "5. Como você avalia o clima de convivência social e integração entre os estudantes no campus?",
    opcoes: [
      "Muito acolhedor e integrativo",
      "Acolhedor",
      "Neutro",
      "Pouco integrativo",
      "Hostil / Distante",
    ],
  },
  {
    id: "resposta6",
    titulo:
      "6. Quando você precisa resolver um problema administrativo ou acadêmico, a faculdade oferece um suporte eficiente?",
    opcoes: [
      "Sim, resolve rapidamente",
      "Sim, mas com demoras pontuais",
      "Raramente resolve no prazo",
      "Não, o suporte é ineficiente",
      "Nunca precisei utilizar",
    ],
  },
  {
    id: "resposta7",
    titulo:
      "7. Qual destas áreas você considera que necessita de melhorias mais urgentes no momento?",
    opcoes: [
      "Conectividade (Wi-Fi e sinal de internet)",
      "Segurança interna e nos arredores",
      "Opções e qualidade da alimentação/cantina",
      "Acessibilidade para pessoas com deficiência ou mobilidade reduzida",
      "Manutenção e limpeza geral",
      "Outro",
    ],
  },
  {
    id: "resposta8",
    titulo:
      "8. Você se sente seguro(a) frequentando as dependências da faculdade e seus arredores imediatos?",
    opcoes: [
      "Totalmente seguro(a)",
      "Seguro(a)",
      "Parcialmente seguro(a)",
      "Inseguro(a)",
      "Muito inseguro(a)",
    ],
  },
  {
    id: "resposta9",
    titulo:
      "9. Caso ocorra algum problema de convivência, assédio ou discriminação, você confia na capacidade da instituição de acolher e resolver a situação de forma justa?",
    opcoes: [
      "Confio totalmente",
      "Confio parcialmente",
      "Tenho dúvidas",
      "Não confio",
      "Não conheço os canais de denúncia/ouvidoria",
    ],
  },
  {
    id: "resposta10",
    titulo:
      "10. Em uma escala de 1 a 5, qual o seu grau de satisfação geral com o ambiente acadêmico da faculdade?",
    opcoes: [
      "1 – Muito insatisfeito(a)",
      "2 – Insatisfeito(a)",
      "3 – Neutro(a)",
      "4 – Satisfeito(a)",
      "5 – Muito satisfeito(a)",
    ],
  },
];

function Formulario() {
  const navigate = useNavigate();

  const [respostas, setRespostas] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

  useEffect(() => {
    async function verificarAcesso() {
      try {
        const resposta = await fetch(
          "http://localhost:8080/contrasenhas/acesso-autorizado",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!resposta.ok) {
          navigate("/acesso-formulario", { replace: true });
          return;
        }

        setAutorizado(true);
      } catch {
        setMensagem(
          "Não foi possível verificar o acesso ao formulário."
        );
        setTipoMensagem("erro");
      } finally {
        setCarregando(false);
      }
    }

    verificarAcesso();
  }, [navigate]);

  function selecionarResposta(pergunta, opcao) {
    setRespostas((respostasAtuais) => ({
      ...respostasAtuais,
      [pergunta]: opcao,
    }));
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();

    const perguntaNaoRespondida = perguntas.find(
      (pergunta) => !respostas[pergunta.id]
    );

    if (perguntaNaoRespondida) {
      setMensagem(
        `Responda à pergunta ${perguntaNaoRespondida.id.replace("resposta", "")} antes de enviar.`
      );
      setTipoMensagem("erro");
      return;
    }

    setEnviando(true);
    setMensagem("");
    setTipoMensagem("");

    try {
      const resposta = await fetch(
        "http://localhost:8080/formularios-respondidos",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(respostas),
        }
      );

      const texto = await resposta.text();

      if (!resposta.ok) {
        setMensagem(texto || "Não foi possível enviar a pesquisa.");
        setTipoMensagem("erro");

        if (resposta.status === 403) {
          setAutorizado(false);
        }

        return;
      }

      setMensagem(texto);
      setTipoMensagem("sucesso");
      setAutorizado(false);
      setRespostas({});
    } catch {
      setMensagem(
        "Erro de comunicação com o servidor. Tente novamente."
      );
      setTipoMensagem("erro");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return <p>Verificando autorização...</p>;
  }

  return (
  <>
  <Navbar/>

  <main className="pesquisa-container">
    <h1 className="pesquisa-titulo">Pesquisa de satisfação acadêmica</h1>

    <p className="pesquisa-descricao">
      Sua opinião é importante para identificar melhorias
      na infraestrutura e na convivência da faculdade.</p>

{autorizado ? (
  <form
    className="pesquisa-formulario"
    onSubmit={enviarFormulario}
  >
    {perguntas.map((pergunta) => (
      <fieldset className="pesquisa-pergunta" key={pergunta.id}>

      <p className="pesquisa-enunciado">{pergunta.titulo}</p>

        {pergunta.opcoes.map((opcao, indice) => (
          <label className="pesquisa-alternativa" key={opcao}>
            <input className="pesquisa-radio"
              type="radio"
              name={pergunta.id}
              value={opcao}
              checked={respostas[pergunta.id] === opcao}
              onChange={() => selecionarResposta(pergunta.id, opcao)}
              required={indice === 0}
              disabled={enviando}/>
            {opcao}
          </label>
        ))}
      </fieldset>
    ))}

    <button className="pesquisa-botao" type="submit" disabled={enviando}>
      {enviando ? "Enviando pesquisa..." : "Enviar pesquisa"}
    </button>
  </form>
) : (
    !mensagem && (
    <p className="pesquisa-mensagem">
      Você não possui autorização ativa para responder.
    </p>)
    )}

{mensagem && (
          <p role="status" className={`pesquisa-mensagem ${
            tipoMensagem === "sucesso" ? "mensagem-sucesso" : "mensagem-erro"}`}>
            {mensagem}
          </p>
        )}
  </main>
  </>
);
}
export default Formulario;
