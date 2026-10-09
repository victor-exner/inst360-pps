package com.inst360.formulario;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inst360.contrasenha.Contrasenha;
import com.inst360.contrasenha.ContrasenhaRepository;

@Service
public class FormularioService {

    private final FormularioRepository formularioRepository;
    private final ContrasenhaRepository contrasenhaRepository;

    public FormularioService(
            FormularioRepository formularioRepository,
            ContrasenhaRepository contrasenhaRepository) {
        this.formularioRepository = formularioRepository;
        this.contrasenhaRepository = contrasenhaRepository;
    }

    @Transactional
    public Formulario registrarFormulario(@NonNull String codigo) {

        // Verifica se essa contrassenha já foi utilizada para responder.
        boolean jaRespondido =
                formularioRepository.existsByContrasenha_Contrasenha(codigo);

        if (jaRespondido) {
            throw new IllegalStateException(
                    "Esta contrassenha já foi utilizada para responder ao formulário."
            );
        }

        // Busca a contrassenha no banco de dados.
        Contrasenha contrasenha = contrasenhaRepository.findById(codigo)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Contrassenha não encontrada."
                ));

        // Cria o registro do formulário respondido.
        Formulario formulario = new Formulario();
        formulario.setContrasenha(contrasenha);

        // Salva no banco de dados.
        return formularioRepository.save(formulario);
    }
}
