package com.inst360.formulario;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.dao.DataIntegrityViolationException;

@RestController
@RequestMapping("/formularios-respondidos")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowCredentials = "true"
)
public class FormularioController {

    private final FormularioService formularioService;

    public FormularioController(
            FormularioService formularioService) {
        this.formularioService = formularioService;
    }

    @PostMapping
    public ResponseEntity<String> registrar(
            HttpServletRequest request) {

        // Recupera a sessão existente, sem criar uma nova.
        HttpSession sessao = request.getSession(false);

        // Verifica se o usuário foi autorizado.
        if (sessao == null
                || !Boolean.TRUE.equals(
                    sessao.getAttribute("acessoFormulario"))) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Você não possui autorização para responder ao formulário.");
        }

        // Recupera a contrassenha validada anteriormente.
        Object codigoSessao =
                sessao.getAttribute("contrasenhaFormulario");

        if (!(codigoSessao instanceof String)
                || ((String) codigoSessao).isBlank()) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Não foi possível identificar a contrassenha autorizada.");
        }

        String codigo = (String) codigoSessao;

        try {
            formularioService.registrarFormulario(codigo);

            // Impede que a mesma sessão envie novamente.
            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.ok(
                    "Formulário registrado com sucesso."
            );

        } catch (IllegalStateException e) {

            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());

        } catch (DataIntegrityViolationException e) {

            // Proteção adicional para tentativas duplicadas simultâneas.
            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Esta contrassenha já foi utilizada para responder ao formulário.");
        }
    }
}
