import { useEffect, useState } from "react";
import "./ListaUsuarios.css";

//funções para gerar lista e trazer usuários cadastrados
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [usuarioEditando, setUsuarioEditando] =
  useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {

    try {
      const resposta = await fetch(
        "http://localhost:8080/usuarios");

      if (!resposta.ok) {
        throw new Error(
        "Não foi possível carregar os usuários.");}

      const dados = await resposta.json();
      setUsuarios(dados);

    } catch (erro) {
      console.error(erro);}
  }
  
// função para excluir um usuário
async function excluirUsuario(id) {

  const confirmar = window.confirm(
    "Deseja realmente excluir este usuário?");

  if (!confirmar) {
    return;
  }

  try {
    const resposta = await fetch(
      `http://localhost:8080/usuarios/${id}`, {method: "DELETE"});

    if (!resposta.ok) {
      throw new Error(
        "Não foi possível excluir o usuário.");}

    carregarUsuarios();

  } catch (erro) {
    console.error(erro);
  }
}

// Função para salvar formulário de edição
async function salvarEdicao() {

  try {
    const resposta = await fetch(
      `http://localhost:8080/usuarios/${usuarioEditando.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioEditando)
      }
    );

    if (!resposta.ok) {
      throw new Error(
        "Não foi possível editar o usuário."
      );
    }

    setUsuarioEditando(null);

    carregarUsuarios();

  } catch (erro) {
    console.error(erro);
  }
}

// ===== JSX =====
  return (
  <>
{/* Retornando o formulário de edição, após clicar no botão de editar */}
{usuarioEditando && (

  <div className="formulario-edicao">

    <h1 className="edit-title">Editar usuário</h1>

    <input type="text" className="edit-inputs" 
      value={usuarioEditando.nome}
      onChange={(evento) =>
        setUsuarioEditando({...usuarioEditando,
        nome: evento.target.value})}/>

    <input type="text" className="edit-inputs"
      value={usuarioEditando.matricula}
      onChange={(evento) =>
        setUsuarioEditando({...usuarioEditando,
        matricula: evento.target.value})}/>

    <input type="text" className="edit-inputs"
      value={usuarioEditando.endereco || ""}
      onChange={(evento) =>
        setUsuarioEditando({...usuarioEditando,
        endereco: evento.target.value})}/>

    <input type="date" className="edit-inputs"
      value={usuarioEditando.dataNasc || ""}
      onChange={(evento) =>
        setUsuarioEditando({...usuarioEditando,
        dataNasc: evento.target.value})}/>

    <input type="email" className="edit-inputs"
      value={usuarioEditando.email || ""}
      onChange={(evento) =>
        setUsuarioEditando({...usuarioEditando,
          email: evento.target.value})}/>

    <button className="edit-btns" onClick={salvarEdicao}>
      Salvar
    </button>

    <button className="edit-btns btn-cancelar" onClick={() => setUsuarioEditando(null)}>
      Cancelar
    </button>

  </div>
)}

{/* Retornando a Lista de Usuários */}
    <div className="lista-usuarios">

      <h1>Usuários Cadastrados</h1>

      {usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        usuarios.map((usuario) => (

          <div className="usuario" key={usuario.id}>

            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Matrícula:</strong> {usuario.matricula}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>

            <div className="acoes">
              <button className="editar-btns" onClick={() => setUsuarioEditando(usuario)}>Editar</button>
              <button className="excluir-btns" onClick={() => excluirUsuario(usuario.id)}>Excluir</button>
            </div>

          <hr></hr>

          </div>
        ))
      )}
    </div>
  </>
  );
}

export default ListaUsuarios;