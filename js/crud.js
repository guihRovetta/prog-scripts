$(document).ready(function () {
    var $formFilme = $('#form-filme');
    var $formGroups = $('div.form-group');
    var $helpBlocks = $('span.help-block');
    var $tituloInput = $('#titulo-input');
    var $notaInput = $('#nota-input');
    var $tabelaFilme = $('#tabela-filmes');
    var idCrescente = 0;

    $formFilme.hide();

    $('#botao-novo-titulo').click(function () {
        $formFilme.slideToggle();
    });

    function limparErros() {
        $formGroups.removeClass('has-error');
        $helpBlocks.text('');
    }

    /* SERVER */
    /*$.get('http://localhost:8080/filmes/rest', function (filmes) {
        console.log(filmes);
    }, 'json');*/

    function addFilme(filme) {
        var linha = '<tr>';
        linha += '<td>' + filme.id + '</td>';
        linha += '<td>' + filme.titulo + '</td>';
        linha += '<td>' + filme.nota + '</td>';
        linha += '<td>';
        linha += '<button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash"></i>  Excluir</button>';
        linha += '</td ></tr>';

        var $linhaSelecionada = $(linha);
        var $botaoRemover = $linhaSelecionada.find('button.btn').click(function () {
            console.log('Filme/Série Removido(a) -> ' + filme.id + ' - ' + filme.titulo + ' - ' + filme.nota);
            $linhaSelecionada.remove();
        });

        $tabelaFilme.append($linhaSelecionada);

    }

    function listarfilmes(filmes) {
        $.each(filmes, function (i, filme) {
            addFilme(filme);
        })
        idCrescente = filmes[filmes.length - 1].id + 1;
    }

    var testeFilmes = [{
        "id": 1,
        "titulo": "Game of Thrones",
        "nota": 10
    }, {
        "id": 2,
        "titulo": "Guardiões da Galáxia",
        "nota": 9.5
    }, {
        "id": 3,
        "titulo": "Velozes e Furiosos 7",
        "nota": 9
    }];
    listarfilmes(testeFilmes);

    function mostrarErros(erros) {
        var helpBlockPrefixo = '#help-block-';
        var formGroupPrefixo = '#form-group-';
        $.each(erros, function (propriedade, valor) {
            $(helpBlockPrefixo + propriedade).text(valor);
            $(formGroupPrefixo + propriedade).addClass('has-error');
        });
    }

    $('#form-filme').submit(function (evento) {
        evento.preventDefault();
        limparErros();
        var titulo = $tituloInput.val();
        var nota = $notaInput.val();
        if (nota === '' && titulo === '') {
            mostrarErros({
                'titulo': 'Campo Obrigatório! Digite um valor para o título.',
                'nota': 'Campo Obrigatório! Digite uma nota.'
            })
        } else if ((titulo === '') && (nota < 0 || nota > 10)) {
            mostrarErros({
                'titulo': 'Campo Obrigatório! Digite um valor para o título.',
                'nota': 'Valor inválido! Digite uma nota de 0 a 10.'
            })
        } else if (titulo === '') {
            mostrarErros({
                'titulo': 'Campo Obrigatório! Digite um valor para o título.'
            })
        } else if (nota === '') {
            mostrarErros({
                'nota': 'Campo Obrigatório! Digite uma nota.'
            })
        } else if (nota < 0 || nota > 10) {
            mostrarErros({
                'nota': 'Valor inválido! Digite uma nota de 0 a 10.'
            })

        } else {
            addFilme({
                "id": idCrescente,
                "titulo": titulo,
                "nota": nota
            });
            $tituloInput.val('');
            $notaInput.val('');
            idCrescente++;
        }

    });

});