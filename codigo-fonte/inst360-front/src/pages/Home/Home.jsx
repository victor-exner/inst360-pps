import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import Navbar from "../../components/Navbar/Navbar";
import ListaUsuarios from "../../components/ListaUsuarios/ListaUsuarios";
import "./Home.css";

const CORES = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
  "#9333ea",
  "#0891b2",
  "#ea580c",
  "#4f46e5",
  "#db2777",
  "#65a30d"
];

function Home() {
  const navigate = useNavigate();

  const usuarioSalvo = sessionStorage.getItem("usuarioLogado");

  const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

  const [graficos, setGraficos] = useState([]);
  const [carregandoGraficos, setCarregandoGraficos] = useState(false);
  const [erroGraficos, setErroGraficos] = useState("");

  useEffect(() => {
    if (!usuario) {
      return;
    }

    async function carregarGraficos() {
      setCarregandoGraficos(true);
      setErroGraficos("");

      try {
        const resposta = await fetch(
          "http://localhost:8080/formularios-respondidos/graficos",
          {
            method: "GET",
            credentials: "include"
          }
        );

        if (!resposta.ok) {
          throw new Error("Não foi possível carregar os gráficos.");
        }

        const dados = await resposta.json();
        setGraficos(dados);
      } catch (erro) {
        setErroGraficos(
          "Não foi possível carregar os resultados da pesquisa. Verifique se o backend está funcionando."
        );
      } finally {
        setCarregandoGraficos(false);
      }
    }

    carregarGraficos();
  }, []);

  if (!usuario) {
    return (
      <div className="home-nao-autenticado">
        <h1>Usuário não autenticado</h1>

        <button onClick={() => navigate("/login")}>
          Ir para o login
        </button>
      </div>
    );
  }

  return (
    <div className="home-pagina">
      <Navbar />

      <main className="home-container">
        <h1 className="home-titulo">Home</h1>

        <p className="home-boas-vindas">
          Bem-vindo(a), {usuario.nome}!
        </p>

        <p className="home-tipo-usuario">
          Tipo de usuário:{" "}
          {usuario.administrador ? "Administrador" : "Usuário comum"}
        </p>

        {usuario.administrador && (
          <section className="home-lista-usuarios">
            <ListaUsuarios/>
          </section>
        )}
      </main>

        <section className="home-secao-graficos">
          <h2 className="home-subtitulo">Resultados da pesquisa de satisfação acadêmica</h2>

          <p className="home-descricao-graficos">
            Confira a distribuição das respostas de cada pergunta
            do formulário.
          </p>

          {carregandoGraficos && (
            <p>Carregando os gráficos...</p>
          )}

          {erroGraficos && (
            <p className="home-erro-graficos">{erroGraficos}</p>
          )}

          {!carregandoGraficos &&
            !erroGraficos &&
            graficos.length === 0 && (
              <p>Nenhum gráfico disponível no momento.</p>
            )}

          <div className="home-graficos-grid">
            {graficos.map((grafico, indice) => {
              const totalRespostas = grafico.dados.reduce(
                (total, item) => total + item.quantidade,
                0
              );

              return (
                <article
                  className="home-grafico-card"
                  key={grafico.id}
                >
                  <h3>{grafico.titulo}</h3>

                  {grafico.dados.length === 0 ? (
                    <p className="home-grafico-vazio">
                      Ainda não há respostas para esta pergunta.
                    </p>
                  ) : (
                    <>
                      <div className="home-grafico">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={grafico.dados}
                              dataKey="quantidade"
                              nameKey="alternativa"
                              cx="50%"
                              cy="50%"
                              outerRadius="70%"
                              labelLine={false}
                              label={({ percent }) =>
                                `${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {grafico.dados.map((item, itemIndice) => (
                                <Cell
                                  key={`${item.alternativa}-${itemIndice}`}
                                  fill={
                                    CORES[
                                      (indice + itemIndice) % CORES.length
                                    ]
                                  }
                                />
                              ))}
                            </Pie>

                            <Tooltip
                              formatter={(valor, nome) => [
                                `${valor} resposta(s)`,
                                nome
                              ]}
                            />

                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <p className="home-total-respostas">
                        Total de respostas: {totalRespostas}
                      </p>
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>

    </div>
  );
}

export default Home;