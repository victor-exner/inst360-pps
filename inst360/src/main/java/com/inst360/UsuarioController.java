package com.inst360;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;


@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }


    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        if (usuario.getNome() == null || usuario.getNome().isBlank()) {
            return erro("O nome é obrigatório.");
        }

        if (usuario.getMatricula() == null || usuario.getMatricula().isBlank()) {
            return erro("A matrícula é obrigatória.");
        }

        if (repository.existsByMatricula(usuario.getMatricula())) {
            return erro("A matrícula já está cadastrada.");
        }

        if (usuario.getEmail() != null && !usuario.getEmail().isBlank()
                && repository.existsByEmail(usuario.getEmail())) {
            return erro("O e-mail já está cadastrado.");
        }

        if (usuario.getDataNasc() == null) {
            return erro("A data de nascimento é obrigatória.");
        }

        if (Period.between(usuario.getDataNasc(), LocalDate.now()).getYears() < 12) {
            return erro("O usuário deve possuir pelo menos 12 anos.");
        }

        if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
            return erro("A senha é obrigatória.");
        }

        Usuario salvo = repository.save(usuario);

        // Nunca devolve a senha na resposta, retorna a senha null
        salvo.setSenha(null);

        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }


    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }
    private ResponseEntity<?> erro(String mensagem) {
        return ResponseEntity.badRequest().body(new Mensagem(mensagem));
    }
    public record Mensagem(String mensagem) {}


    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {

    if (!repository.existsById(id)) {
        return ResponseEntity
                .notFound()
                .build();
    }

    repository.deleteById(id);
    return ResponseEntity.noContent().build();}


    @PutMapping("/{id}")
    public ResponseEntity<?> editar(
        @PathVariable Long id,
        @RequestBody Usuario dadosAtualizados) {

    Optional<Usuario> usuarioEncontrado =
            repository.findById(id);

    if (usuarioEncontrado.isEmpty()) {
        return ResponseEntity
                .notFound()
                .build();
    }

    Usuario usuario = usuarioEncontrado.get();

    usuario.setNome(dadosAtualizados.getNome());
    usuario.setMatricula(dadosAtualizados.getMatricula());
    usuario.setEndereco(dadosAtualizados.getEndereco());
    usuario.setDataNasc(dadosAtualizados.getDataNasc());
    usuario.setEmail(dadosAtualizados.getEmail());

    Usuario usuarioAtualizado =
            repository.save(usuario);

    usuarioAtualizado.setSenha(null);

    return ResponseEntity.ok(usuarioAtualizado);}
}
