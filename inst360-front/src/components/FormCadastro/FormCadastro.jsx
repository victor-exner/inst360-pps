function FormularioCadastro({
  usuario,
  alterarCampo,
  cadastrar
}) {
  return (
    <form
      className="formulario"
      onSubmit={cadastrar}
    >

      <div className="campo">
        <label>Nome:</label>

        <input
          type="text"
          name="nome"
          value={usuario.nome}
          onChange={alterarCampo}
        />
      </div>

      <div className="campo">
        <label>Matrícula:</label>

        <input
          type="text"
          name="matricula"
          value={usuario.matricula}
          onChange={alterarCampo}
        />
      </div>

      <div className="campo">
        <label>Endereço:</label>

        <input
          type="text"
          name="endereco"
          value={usuario.endereco}
          onChange={alterarCampo}
        />
      </div>

      <div className="campo">
        <label>Data de nascimento:</label>

        <input
          type="date"
          name="dataNasc"
          value={usuario.dataNasc}
          onChange={alterarCampo}
        />
      </div>

      <div className="campo">
        <label>E-mail:</label>

        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={alterarCampo}
        />
      </div>

      <div className="campo">
        <label>Senha:</label>

        <input
          type="password"
          name="senha"
          value={usuario.senha}
          onChange={alterarCampo}
        />
      </div>

      <button type="submit">
        Cadastrar
      </button>

    </form>
  );
}

export default FormularioCadastro;