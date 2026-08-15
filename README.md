# Instituto 360 — versão simplificada

Projeto refeito a partir do projeto original, mantendo:
- Backend Java com Spring Boot
- API REST
- React + Vite
- PostgreSQL
- JPA/Hibernate

## Estrutura

- `inst360/` — backend
- `inst360-front/` — frontend

## Backend

Configure o PostgreSQL com:
- Banco: `inst360_spring`
- Usuário: `postgres`
- Senha: `ifsp`

Execute dentro de `inst360`:

```bash
mvn spring-boot:run
```

API:
- `POST http://localhost:8080/usuarios`
- `GET http://localhost:8080/usuarios`

## Frontend

Execute dentro de `inst360-front`:

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Arquitetura simplificada

React → REST/JSON → UsuarioController → UsuarioRepository → PostgreSQL

## Observação

A senha não é devolvida pela API. Para um sistema de produção, a senha também deve ser armazenada com hash (por exemplo, BCrypt), e autenticação/autorização devem ser implementadas.
