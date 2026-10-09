package com.inst360.contrasenha;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AcessoFormularioService {

    public boolean possuiAcesso(HttpServletRequest request) {

        var sessao = request.getSession(false);

        return sessao != null
                && Boolean.TRUE.equals(
                    sessao.getAttribute("acessoFormulario")
                );
    }
}