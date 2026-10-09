package com.inst360.contrasenha;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContrasenhaRepository
        extends JpaRepository<Contrasenha, String> {

    Optional<Contrasenha> findFirstByValidaTrue();

    Optional<Contrasenha> findByContrasenhaAndValidaTrue(String contrasenha);
}