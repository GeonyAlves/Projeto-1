var merc = [
    {
        compra: true,
        mercadoria: 'Lorem ipsum dolor sit amet consectetur',
        valor: '12.999,99',
    },
    {
        compra: false,
        mercadoria: 'Quis nostrud exercitation',
        valor: '99,99',
    }, 
    {
        compra: true,
        mercadoria: 'Lorem ipsum',
        valor: '9,99',
    },  
];

function desenhatabela () {
    var merc = [
        {
            compra: true,
            mercadoria: 'Lorem ipsum dolor sit amet consectetur',
            valor: '12.999,99',
        },
        {
            compra: false,
            mercadoria: 'Quis nostrud exercitation',
            valor: '99,99',
        }, 
        {
            compra: true,
            mercadoria: 'Lorem ipsum',
            valor: '9,99',
        },  
    ];

    currentLines = [...document.querySelectorAll('div.tabela_corpo')];
    currentLines.forEach((element) => {
        element.remove()
        
    });


}

for (merchandise in merc) {
        document.querySelector('div.tabela div.tabela_titulo').innerHTML += `<div class="tabela" div class="tabela_titulo">
        <div class="tabela_corpo">
            ${ (merc[merchandise].compra ? '<strong style="color:green">+</strong>' : '<strong style="color:red">-</strong>') }
        </div>
        <div class="tabela_corpo">
            ${ merc[merchandise].mercadoria }
        </div>
        <div class="tabela_corpo">
        ${ merc[merchandise].valor }
        </div>
    </div>`
    }

    
      const linkLimpar = document.querySelector('.linklimpar');
      linkLimpar.addEventListener('click', function(event) {
        event.preventDefault();
        const confirmacao = confirm('Tem certeza que deseja limpar os dados?');
        if (confirmacao) {
        }
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

