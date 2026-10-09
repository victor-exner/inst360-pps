package com.inst360.formulario;

import java.time.LocalDateTime;

import com.inst360.contrasenha.Contrasenha;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "formularios_respondidos",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_formulario_contrasenha",
            columnNames = "contrasenha"
        )
    }
)
public class Formulario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(
        name = "contrasenha",
        referencedColumnName = "contrasenha",
        nullable = false,
        unique = true
    )
    private Contrasenha contrasenha;

    @Column(name = "data_envio", nullable = false)
    private LocalDateTime dataEnvio;

    public Formulario() {
    }

    @PrePersist
    public void registrarDataEnvio() {
        if (dataEnvio == null) {
            dataEnvio = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public Contrasenha getContrasenha() {
        return contrasenha;
    }

    public void setContrasenha(Contrasenha contrasenha) {
        this.contrasenha = contrasenha;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }
}