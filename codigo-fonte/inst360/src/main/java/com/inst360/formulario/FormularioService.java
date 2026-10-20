package com.inst360.formulario;

import java.util.List;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inst360.contrasenha.ContrasenhaRepository;

@Service
public class FormularioService {

    private final FormularioRepository formularioRepository;
    private final ContrasenhaRepository contrasenhaRepository;

    public FormularioService(
            FormularioRepository formularioRepository,
            ContrasenhaRepository contrasenhaRepository) {

        this.formularioRepository = formularioRepository;
        this.contrasenhaRepository = contrasenhaRepository;
    }

    @Transactional
    public Formulario registrarFormulario(
            @NonNull String codigo,
            FormularioRequest request) {

        // Verifica se a contrassenha existe
        if (!contrasenhaRepository.existsById(codigo)) {
            throw new IllegalArgumentException(
                    "Contrassenha não encontrada."
            );
        }

        // Verifica se todas as perguntas foram respondidas
        List<String> respostas = List.of(
                request.getResposta1(),
                request.getResposta2(),
                request.getResposta3(),
                request.getResposta4(),
                request.getResposta5(),
                request.getResposta6(),
                request.getResposta7(),
                request.getResposta8(),
                request.getResposta9(),
                request.getResposta10()
        );

        for (String resposta : respostas) {
            if (resposta == null || resposta.isBlank()) {
                throw new IllegalArgumentException(
                        "Todas as perguntas devem ser respondidas."
                );
            }
        }

        // Impede o uso repetido da mesma contrassenha
        if (formularioRepository.existsByContrasenha(codigo)) {
            throw new IllegalStateException(
                    "Esta contrassenha já foi utilizada para responder ao formulário."
            );
        }

        Formulario formulario = new Formulario();

        formulario.setContrasenha(codigo);
        formulario.setResposta1(request.getResposta1());
        formulario.setResposta2(request.getResposta2());
        formulario.setResposta3(request.getResposta3());
        formulario.setResposta4(request.getResposta4());
        formulario.setResposta5(request.getResposta5());
        formulario.setResposta6(request.getResposta6());
        formulario.setResposta7(request.getResposta7());
        formulario.setResposta8(request.getResposta8());
        formulario.setResposta9(request.getResposta9());
        formulario.setResposta10(request.getResposta10());

        return formularioRepository.save(formulario);
    }


    public List<Map<String, Object>> obterDadosGraficos() {
    List<Formulario> formularios = formularioRepository.findAll();

    List<Map<String, Object>> graficos = new ArrayList<>();

    graficos.add(montarGrafico(
            "resposta1",
            "1. Infraestrutura das salas de aula",
            1,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta2",
            "2. Espaços de estudo e pesquisa",
            2,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta3",
            "3. Higiene e limpeza dos banheiros",
            3,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta4",
            "4. Limpeza e conservação das áreas comuns",
            4,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta5",
            "5. Convivência na faculdade",
            5,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta6",
            "6. Atendimento administrativo e acadêmico",
            6,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta7",
            "7. Melhoria mais urgente",
            7,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta8",
            "8. Segurança na faculdade",
            8,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta9",
            "9. Confiança na instituição",
            9,
            formularios
    ));

    graficos.add(montarGrafico(
            "resposta10",
            "10. Satisfação geral",
            10,
            formularios
    ));

    return graficos;
    }

    private Map<String, Object> montarGrafico(
        String id,
        String titulo,
        int numeroPergunta,
        List<Formulario> formularios) {

    Map<String, Integer> contagem = new LinkedHashMap<>();

    for (Formulario formulario : formularios) {
        String resposta = switch (numeroPergunta) {
            case 1 -> formulario.getResposta1();
            case 2 -> formulario.getResposta2();
            case 3 -> formulario.getResposta3();
            case 4 -> formulario.getResposta4();
            case 5 -> formulario.getResposta5();
            case 6 -> formulario.getResposta6();
            case 7 -> formulario.getResposta7();
            case 8 -> formulario.getResposta8();
            case 9 -> formulario.getResposta9();
            case 10 -> formulario.getResposta10();
            default -> null;
        };

        if (resposta != null && !resposta.isBlank()) {
            contagem.merge(resposta, 1, (valorAtual, incremento) -> valorAtual + incremento);
        }
    }

    List<Map<String, Object>> dados = new ArrayList<>();

    contagem.forEach((alternativa, quantidade) -> {
        Map<String, Object> item = new LinkedHashMap<>();
        item.put("alternativa", alternativa);
        item.put("quantidade", quantidade);
        dados.add(item);
    });

    Map<String, Object> grafico = new LinkedHashMap<>();
    grafico.put("id", id);
    grafico.put("titulo", titulo);
    grafico.put("dados", dados);

    return grafico;
    }
}