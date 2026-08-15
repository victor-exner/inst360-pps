import "./Navbar.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const usuarioSalvo =
    sessionStorage.getItem("usuarioLogado");

  const usuarioLogado = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : null;

  function sair() {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img className="logo-img" src={logo} alt=""/>
      </div>

      <div className="menu">

        {usuarioLogado ?(
          <>
          <Link className="menu-links" to="/home">Home</Link>
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