package com.inst360;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UsuarioRepository repository;

    public LoginController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {

        if (login.matricula() == null || login.matricula().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Mensagem("A matrícula é obrigatória."));
        }

        if (login.senha() == null || login.senha().isBlank()) {
            return ResponseEntity
                    .badRequest()
                    .body(new Mensagem("A senha é obrigatória."));
        }

        Optional<Usuario> usuarioEncontrado =
                repository.findByMatricula(login.matricula());

        if (usuarioEncontrado.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new Mensagem("Matrícula ou senha inválida."));
        }

        Usuario usuario = usuarioEncontrado.get();

        if (!usuario.getSenha().equals(login.senha())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new Mensagem("Matrícula ou senha inválida."));
        }

        usuario.setSenha(null);

        return ResponseEntity.ok(usuario);
    }

    public record LoginRequest(
            String matricula,
            String senha
    ) {}

    public record Mensagem(String mensagem) {}
}