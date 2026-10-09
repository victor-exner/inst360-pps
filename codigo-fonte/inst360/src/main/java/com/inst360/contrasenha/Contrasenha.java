package com.inst360.contrasenha;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "contrasenhas")
public class Contrasenha {

    @Id
    @Column(name = "contrasenha", length = 50)
    private String contrasenha;

    @Column(name = "valida", nullable = false)
    private boolean valida = true;

    public Contrasenha() {
    }

    public Contrasenha(String contrasenha, boolean valida) {
        this.contrasenha = contrasenha;
        this.valida = valida;
    }

    public String getContrasenha() {
        return contrasenha;
    }

    public void setContrasenha(String contrasenha) {
        this.contrasenha = contrasenha;
    }

    public boolean isValida() {
        return valida;
    }

    public void setValida(boolean valida) {
        this.valida = valida;
    }
}
