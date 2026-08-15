package com.inst360;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByMatricula(String matricula);
    boolean existsByEmail(String email);
    Optional<Usuario> findByMatricula(String matricula);
}
