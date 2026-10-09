package com.inst360.contrasenha;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String remetente;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarContrasenha(
            String destinatario,
            String contrasenha) {

        SimpleMailMessage mensagem =
                new SimpleMailMessage();

        mensagem.setFrom(remetente);
        mensagem.setTo(destinatario);
        mensagem.setSubject(
                "INST360 - Acesso ao formulário");

        mensagem.setText(
                "Sua contrasenha para acessar o formulário é:\n\n"
                + contrasenha
                + "\n\nEsta contrasenha pode ser utilizada apenas uma vez."
        );

        mailSender.send(mensagem);
    }
}