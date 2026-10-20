package com.inst360.formulario;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/formularios-respondidos")
@CrossOrigin(
    origins = "http://localhost:5173",
    allowCredentials = "true"
)
public class FormularioController {

    private final FormularioService formularioService;

    public FormularioController(
            FormularioService formularioService){
        this.formularioService = formularioService;
    }

    @PostMapping
    public ResponseEntity<String> registrar(
            @RequestBody FormularioRequest formularioRequest,
            HttpServletRequest request){

        HttpSession sessao = request.getSession(false);

        //Verifica se existe autorização na sessão
        if (sessao == null
                || !Boolean.TRUE.equals(
                    sessao.getAttribute("acessoFormulario"))) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Você não possui autorização para responder ao formulário.");
        }

        Object codigoSessao =
                sessao.getAttribute("contrasenhaFormulario");

        if (!(codigoSessao instanceof String)
                || ((String) codigoSessao).isBlank()) {

            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Não foi possível identificar a contrassenha autorizada.");
        }

        String codigo = (String) codigoSessao;

        try {
            formularioService.registrarFormulario(
                    codigo,
                    formularioRequest
            );

            //Remove a autorização depois do envio
            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.ok(
                    "Pesquisa respondida e registrada com sucesso!"
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest()
                    .body(e.getMessage());

        } catch (IllegalStateException e) {

            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(e.getMessage());

        } catch (DataIntegrityViolationException e) {

            //A restrição UNIQUE protege contra registros duplicados
            sessao.removeAttribute("acessoFormulario");
            sessao.removeAttribute("contrasenhaFormulario");

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Esta contrassenha já foi utilizada para responder ao formulário.");
        }
    }

    @GetMapping("/graficos")
    public ResponseEntity<List<Map<String, Object>>> obterGraficos(){
        return ResponseEntity.ok(
                formularioService.obterDadosGraficos()
        );
    }
}