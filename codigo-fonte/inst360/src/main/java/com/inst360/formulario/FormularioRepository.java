package com.inst360.formulario;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormularioRepository
        extends JpaRepository<Formulario, Long> {

    boolean existsByContrasenha_Contrasenha(String contrasenha);
}