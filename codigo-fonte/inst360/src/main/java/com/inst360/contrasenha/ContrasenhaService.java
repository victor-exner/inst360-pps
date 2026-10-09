package com.inst360.contrasenha;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class ContrasenhaService {

    private final ContrasenhaRepository repository;

    public ContrasenhaService(ContrasenhaRepository repository) {
        this.repository = repository;
    }

    public Optional<Contrasenha> obterContrasenhaDisponivel() {

        return repository.findFirstByValidaTrue();
    }

    public boolean validarContrasenha(String codigo) {

        Optional<Contrasenha> contrasenha =
                repository.findByContrasenhaAndValidaTrue(codigo);

        if (contrasenha.isEmpty()) {
            return false;
        }

        Contrasenha encontrada = contrasenha.get();

        encontrada.setValida(false);

        repository.save(encontrada);

        return true;
    }
}