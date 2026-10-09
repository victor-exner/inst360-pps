import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Formulario() {
  const navigate = useNavigate();

  const [verificando, setVerificando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarAcesso() {
      try {
        const resposta = await fetch(
          "http://localhost:8080/contrasenhas/acesso-autorizado",
          {
            method: "GET",
            credentials: "include"
          }
        );

        if (!ativo) return;

        if (resposta.ok) {
          setAutorizado(true);
        } else {
          navigate("/acesso-formulario", { replace: true });
        }
      } catch {
        if (ativo) {
          navigate("/acesso-formulario", { replace: true });
        }
      } finally {
        if (ativo) {
          setVerificando(false);
        }
      }
    }

    verificarAcesso();

    return () => {
      ativo = false;
    };
  }, [navigate]);

  if (verificando) {
    return <p>Verificando autorização...</p>;
  }

  if (!autorizado) {
    return null;
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Formulário de pesquisa</h1>

        <p>Acesso autorizado!</p>

        <p>
          A proteção de acesso está funcionando. Em seguida,
          vamos desenvolver as perguntas da pesquisa.
        </p>
      </div>
    </>
  );
}

export default Formulario;