import "./Navbar.css";
import logo from "./logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const usuarioSalvo =
    sessionStorage.getItem("usuarioLogado");

  const usuarioLogado = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : null;

  function sair() {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  function acessoForm(){
    navigate("/acesso-formulario");
  }

  const acessoVerificacao = location.pathname === "/acesso-formulario";

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo-img" src={logo} alt=""/>
      </div>

      <div className="menu">

        {usuarioLogado ?(
          <>
          <Link className="menu-links" to="/home">Home</Link>
          {!acessoVerificacao && (
            <button className="menu-links" onClick={acessoForm}>Responder Pesquisa</button>
          )}
          <button className="menu-links" onClick={sair}>Sair</button>
          </>
        ):(
          <>
          <Link className="menu-links" to="/login">Entrar</Link>
          <Link className="menu-links" to="/cadastro">Cadastro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;