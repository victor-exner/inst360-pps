package com.inst360.formulario;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Formulario{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contrasenha", nullable = false, length = 50)
    private String contrasenha;

    @Column(name = "data_envio", nullable = false)
    private LocalDateTime dataEnvio;

    @Column(name = "resposta_1", length = 255)
    private String resposta1;

    @Column(name = "resposta_2", length = 255)
    private String resposta2;

    @Column(name = "resposta_3", length = 255)
    private String resposta3;

    @Column(name = "resposta_4", length = 255)
    private String resposta4;

    @Column(name = "resposta_5", length = 255)
    private String resposta5;

    @Column(name = "resposta_6", length = 255)
    private String resposta6;

    @Column(name = "resposta_7", length = 255)
    private String resposta7;

    @Column(name = "resposta_8", length = 255)
    private String resposta8;

    @Column(name = "resposta_9", length = 255)
    private String resposta9;

    @Column(name = "resposta_10", length = 255)
    private String resposta10;

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

    public String getContrasenha() {
        return contrasenha;
    }

    public void setContrasenha(String contrasenha) {
        this.contrasenha = contrasenha;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public String getResposta1() {
        return resposta1;
    }

    public void setResposta1(String resposta1) {
        this.resposta1 = resposta1;
    }

    public String getResposta2() {
        return resposta2;
    }

    public void setResposta2(String resposta2) {
        this.resposta2 = resposta2;
    }

    public String getResposta3() {
        return resposta3;
    }

    public void setResposta3(String resposta3) {
        this.resposta3 = resposta3;
    }

    public String getResposta4() {
        return resposta4;
    }

    public void setResposta4(String resposta4) {
        this.resposta4 = resposta4;
    }

    public String getResposta5() {
        return resposta5;
    }

    public void setResposta5(String resposta5) {
        this.resposta5 = resposta5;
    }

    public String getResposta6() {
        return resposta6;
    }

    public void setResposta6(String resposta6) {
        this.resposta6 = resposta6;
    }

    public String getResposta7() {
        return resposta7;
    }

    public void setResposta7(String resposta7) {
        this.resposta7 = resposta7;
    }

    public String getResposta8() {
        return resposta8;
    }

    public void setResposta8(String resposta8) {
        this.resposta8 = resposta8;
    }

    public String getResposta9() {
        return resposta9;
    }

    public void setResposta9(String resposta9) {
        this.resposta9 = resposta9;
    }

    public String getResposta10() {
        return resposta10;
    }

    public void setResposta10(String resposta10) {
        this.resposta10 = resposta10;
    }
}
