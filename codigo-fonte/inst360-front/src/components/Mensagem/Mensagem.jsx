function Mensagem({ texto, tipo }) {

  if (!texto) {
    return null;
  }

  return (
    <p className={`mensagem ${tipo}`}>
      {texto}
    </p>
  );
}

export default Mensagem;