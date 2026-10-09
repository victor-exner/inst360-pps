package com.inst360.contrasenha;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/contrasenhas")
@CrossOrigin(origins = "http://localhost:5173",
            allowCredentials = "true"
)
public class ContrasenhaController {

    private final ContrasenhaService contrasenhaService;
    private final EmailService emailService;

    public ContrasenhaController(
            ContrasenhaService contrasenhaService,
            EmailService emailService) {

        this.contrasenhaService = contrasenhaService;
        this.emailService = emailService;
    }


    @PostMapping("/solicitar")
    public ResponseEntity<String> solicitar(
            @RequestBody SolicitarRequest request) {

        Optional<Contrasenha> contrasenha =
                contrasenhaService.obterContrasenhaDisponivel();

        if (contrasenha.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Nenhuma contrasenha disponível.");
        }

        emailService.enviarContrasenha(
                request.getEmail(),
                contrasenha.get().getContrasenha());

        return ResponseEntity.ok(
                "Contrasenha enviada para o e-mail.");
    }


    @PostMapping("/validar")
    public ResponseEntity<String> validar(
            @RequestBody ValidarRequest RequestBody, HttpServletRequest request) {

        String codigo = RequestBody.getContrasenha();

        boolean valida =
                contrasenhaService.validarContrasenha(codigo);

        if (!valida) {
            return ResponseEntity
                .badRequest()
                .body("Contrasenha inválida ou já utilizada.");
        }

        var sessao = request.getSession(true);

        sessao.setAttribute("acessoFormulario", true);
        sessao.setAttribute("contrasenhaFormulario", codigo);

        return ResponseEntity.ok(
                "Contrasenha validada com sucesso.");
    }


    @GetMapping("/acesso-autorizado")
    public ResponseEntity<Void> verificarAcesso(
    HttpServletRequest request){

    var session = request.getSession(false);

    if (session == null ||
            !Boolean.TRUE.equals(
                    session.getAttribute("acessoFormulario"))) {

        return ResponseEntity.status(403).build();
    }

    return ResponseEntity.ok().build();
}


    public static class SolicitarRequest {

        private String email;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }


    public static class ValidarRequest {

        private String contrasenha;

        public String getContrasenha() {
            return contrasenha;
        }

        public void setContrasenha(String contrasenha) {
            this.contrasenha = contrasenha;
        }
    }
}