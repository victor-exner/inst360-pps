package com.inst360;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 9)
    private String matricula;

    private String endereco;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

    private boolean usuarioValido = false;
    private boolean administrador = false;

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }
    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }
    public LocalDate getDataNasc() { return dataNasc; }
    public void setDataNasc(LocalDate dataNasc) { this.dataNasc = dataNasc; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public boolean isUsuarioValido() { return usuarioValido; }
    public boolean isAdministrador() { return administrador; }
}
