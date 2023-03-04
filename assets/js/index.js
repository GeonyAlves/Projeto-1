var merc = [
    {
        tipo: 'venda',
        mercadoria: 'Lorem ipsum dolor sit amet consectetur',
        valor: '12.999,99'
    },
    {
        tipo: 'compra',
        mercadoria: 'Quis nostrud exercitation',
        valor: '99,99'
    },
    {
        tipo: 'venda',
        mercadoria: 'Lorem ipsum',
        valor: '9,99'
    }
];

function desenhaTabela() {

    var table = document.querySelector('#extrato tbody');
    currentLines = [...table.querySelectorAll('tr')];
    currentLines.forEach((element) => {
        element.remove()
    });

    for (merchandise in merc) {
        var new_row = table.insertRow(-1);
        var cell_marca = new_row.insertCell(0);
        var cell_valor = new_row.insertCell(1);

        var simbolo = merc[merchandise].tipo == 'compra' ? '<strong style="color:green">+</strong>' : '<strong style="color:red">-</strong>'
        cell_marca.innerHTML = simbolo + `<span> ${merc[merchandise].mercadoria} </span>`;
        cell_valor.innerHTML = merc[merchandise].valor;
    }

    resultado = calculaTransacoes();
    resultado_el = document.querySelector('#extrato-resultado');
    resultado_valor_el = document.querySelector('#extrato-valor');
    if (resultado >= 0) {
        resultado_el.innerHTML = 'Lucro';
    } else {
        resultado_el.innerHTML = 'Prejuízo';
    }
    resultado_valor_el.innerHTML = resultado;

}

desenhaTabela();

function formatarMoeda() {
    var elemento = document.querySelector('input[id="valor"]');
    var valor = elemento.value;
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;
    if (valor == 'NaN') elemento.value = '';
}

function getValuesFromSection(section) {
    transac = {
        tipo: section.querySelector('select[name="selecao"]').value,
        mercadoria: section.querySelector('input[id="mercadoria"]').value,
        valor: section.querySelector('input[id="valor"]').value
    }
    return transac;
}

function calculaTransacoes() {
    valores = [];
    for (merchandise in merc) {
        valor = merc[merchandise].valor;
        valor = valor.replace('.', '').replace(',', '.');
        valor = parseFloat(valor);
        if (merc[merchandise].tipo == 'venda') {
            valor *= -1;
        }
        valores.push(valor);
    }

    if (valores.length > 0) {
        return valores.reduce((a, b) => a + b);
    } else {
        return 0;
    }

}

function onlyNumbers(e) {
    if (window.event) // IE
    {
        if ((e.keyCode < 48 || e.keyCode > 57) & e.keyCode != 8 && e.keyCode != 44) {
            event.returnValue = false;
            return false;
        }
    }
    else { // Fire Fox
        if ((e.which < 48 || e.which > 57) & e.which != 8 && e.which != 44) {
            e.preventDefault();
            return false;
        }
    }
}

function validaTransacao(transacao) {
    //    Validar tipo.
    const tipos_validos = ['venda', 'compra'];
    if (!tipos_validos.includes(transacao.tipo)) {
        alert('Tipo de transação inválido.')
        return false;
    }

    if (transacao.mercadoria.trim().length == 0) {
        alert('Mercadoria inválido.')
        return false;
    }

    return true;
}

const btnAddTransac = document.querySelector('input[name="btn-add-transac"]');
btnAddTransac.addEventListener('click', function (e) {
    e.preventDefault();

    section = document.querySelector('section');
    transac = getValuesFromSection(section);
    valiacao = validaTransacao(transac)
    if (valiacao) {
        merc.push(transac);
        desenhaTabela();
    }
});

const limpaExtrato = document.querySelector('a[class="linklimpar"]');
limpaExtrato.addEventListener('click', function (e) {
    e.preventDefault();
    merc = [];
    desenhaTabela();
});

function teste(e){
    e.preventDefault();
  
    var merc1 = localStorage.getItem('merc')
    if (merc1 !=null){
      var merc = JSON.parse(merc1)
    } else {
      var merc = [];
    }
    merc.push({
      compra: e.target.elements['compra'].value,
      mercadoria: e.target.elements['mercadoria'].value,
      valor: e.target.elements['valor'].value == 'true'
    })
    
    localStorage.setItem('merc', JSON.stringify(merc))
    window.location.href = '../'
  }