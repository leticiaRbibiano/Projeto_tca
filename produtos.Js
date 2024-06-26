// Array de objetos representando os itens do cardápio
const cardapio = [

    //Pão
    { 
      nome: "Pão Francês 73g", 
      preco: "R$ 1,08/un", 
      imagem: "img/paess.jpg", 
      categoria: "paes" 
    },
    { 
        nome: "Baguete 300g", 
        preco: "R$ 9,90/un", 
        imagem: "img/baguete.jpg", 
        categoria: "paes" 
    },
    { 
        nome: "Pão de queijo", 
        preco: "R$ 2,50/un", 
        imagem: "img/pao de queijo.jpg", 
        categoria: "paes" 
    },
    { 
        nome: "Pão de forma 450g", 
        preco: "R$ 5,79", 
        imagem: "img/pao de forma.jpg", 
        categoria: "paes" 
    },
    { 
        nome: "Pão integral 450g", 
        preco: "R$ 8,79", 
        imagem: "img/pao integral.jpg", 
        categoria: "paes" 
    },
    { 
        nome: "Pão de hambúrguer", 
        preco: "R$ 6,49", 
        imagem: "img/OIP.jfif", 
        categoria: "paes" 
    },
    { nome: "Pão doce 125g", 
        preco: "R$ 7,98", 
        imagem: "img/pao doce.jpg", 
        categoria: "paes" 
    },

    //Doces
    { 
        nome: "Sonho 20g", 
        preco: "R$ 7,00/un", 
        imagem: "img/sonho.jpg", 
        categoria: "doces" 
    },
    { 
        nome: "Quindim ", 
        preco: "R$ 1,78/un", 
        imagem: "img/quindin.jpg", 
        categoria: "doces"
    },
    { 
        nome: "Rocambole", 
        preco: "R$ 10,00", 
        imagem: "img/rocambole.jpg", 
        categoria: "doces" 
    },
    { 
        nome: "Bolos", 
        preco: "R$ 10,00", 
        imagem: "img/bolosC.jpg", 
        categoria: "doces" 
    },
    { 
        nome: "Tortas",
        preco: "R$ 10,00", 
        imagem: "img/tortas.jpg", 
        categoria: "doces" 
    },
    { 
        nome: "Brigadeiro",
        preco: "R$ 3,00/un", 
        imagem: "img/brigadeiros.jpg", 
        categoria: "doces" 
    },
    { 
        nome: "Pudim", 
        preco: "R$ 30,50/kg", 
        imagem: "img/pudim.jpg", 
        categoria: "doces" 
    },

    //Salgados
    { 
        nome: "Risoles", 
        preco: "R$ 8.00/un", 
        imagem: "img/risoles1.jpg", 
        categoria: "salgados" 
    },
    { 
        nome: "Pastéis", 
        preco: "R$ 5.00/un",
        imagem: "img/pastel.jpg", 
        categoria: "salgados" },
    { 
        nome: "Enroladinhos", 
        preco: "R$ 3.00/un", 
        imagem: "img/enroladinho.webp", 
        categoria: "salgados" 
    },
    { 
        nome: "Coxinhas", 
        preco: "R$ 4.00/un", 
        imagem: "img/coxinhas.jpg", 
        categoria: "salgados" 
    },
    { 
        nome: "Croquetes", 
        preco: "R$ 1.50/un", 
        imagem: "img/croquetes.jpg", 
        categoria: "salgados" 
    },
    { 
        nome: "Folhados", 
        preco: "R$ 7.00/un", 
        imagem: "img/folhados.jpg", 
        categoria: "salgados" 
    }
];

function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrarProdutos() {
    var pesquisarTexto = removerAcentos(document.getElementById("search").value.toLowerCase().trim());

    var listas = document.querySelectorAll(".lista");               // elementos do cardápio
    var produtosEncontrados = false;                                // nenhum produto é encontrado no começo

    // aqui faz o Loop nos elementos
    listas.forEach(function (list) {
        var itemTexto = removerAcentos(list.querySelector("h1").textContent.toLowerCase()); 
        if (itemTexto.includes(pesquisarTexto)) {
            list.style.display = "inline-block";
            list.querySelector("h1").style.display = "block";     //funçao para exibir o título só para o produto q corresponde 

            //marca q o produto foi encontrado
            produtosEncontrados = true;
        } else {
            list.style.display = "none";
        }
    });
    document.getElementById("no-products-found").style.display = produtosEncontrados ? "none" : "block";

    document.querySelectorAll("#cardapio > h1").forEach(function (title) {              //Atualiza a exibição dos titulos
        var sectionComId = title.nextElementSibling.id;
        var sectionDeItems = document.querySelectorAll(`#${sectionComId} .lista`);
        var anyVisible = Array.from(sectionDeItems).some(item => item.style.display !== "none");
        title.style.display = anyVisible ? "block" : "none";
    });
}

// limpa a pesquisa quando clicar em qualquer lugar da tela
document.addEventListener("click", function (event) { 
    if (!event.target.closest("#cardapio") && event.target.id !== "search") {           //verifica se o clique NÃO ocorreu dentro do cardápio 
       
        document.getElementById("search").value = "";                                   // Limpa o campo de pesquisa
        filtrarProdutos();                                                               // Restaura a exibição normal dos produtos

        document.querySelectorAll("#cardapio h1").forEach(function (title) {            // Restaura a exibição dos títulos
            title.style.display = "block";
        }); 
        document.getElementById("search").addEventListener("input", filtrarProdutos);     //filtra os produtos quando o texto da pesquisa mudar
    }
});

let cart = {};         //aqui é a funçao do carrinho

function adicionarAoCart(itemName, itemPrice) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = { price: itemPrice, quantity: 1 };
    }
    console.log(`${itemName} adicionado ao carrinho. Quantidade: ${cart[itemName].quantity}`); 
    atualizarCart();
}

function aumentoQuantidade(itemName) {    
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
        console.log(`Quantidade de ${itemName} aumentada para ${cart[itemName].quantity}`);  
        atualizarCart();
    }
}

function diminuiQuantidade(itemName) {
    if (cart[itemName]) {
        if (cart[itemName].quantity > 1) {
            cart[itemName].quantity -= 1;
            console.log(`Quantidade de ${itemName} diminuída para ${cart[itemName].quantity}`);
        } else {
            delete cart[itemName];
            console.log(`${itemName} removido do carrinho`);
        }
        atualizarCart();
    }
}

function atualizarCart() {
    const cartDisplay = document.getElementById("cart");
    cartDisplay.innerHTML = '';

    let itemCount = 0;
    for (const item in cart) {
        itemCount += cart[item].quantity;

        const cartItem = document.createElement("li");
        cartItem.textContent = `${item}: `;

        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = `${cart[item].quantity}x ${cart[item].price}`;   //sinal de vezes ao lado do numero dentro da lista
        cartItem.appendChild(quantitySpan);

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = function () {
            diminuiQuantidade(item);
        };

        cartItem.appendChild(decreaseButton);

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";           
        increaseButton.onclick = function () {
            aumentoQuantidade(item);    
        };      

        cartItem.appendChild(increaseButton);

        const removeButton = document.createElement("button"); // Botão para remover dentro da lista
        removeButton.textContent = "x";
        removeButton.onclick = function () {
            removeCart(item);
        };
        cartItem.appendChild(removeButton);                    // aqui adiciona o botao

        cartDisplay.appendChild(cartItem);
    }

    document.getElementById("cart-count").textContent = `${itemCount} itens`;
}

function removeCart(itemName) {
    if (cart[itemName]) {
        delete cart[itemName];                                  // Remove o item do carrinho
        console.log(`${itemName} removido do carrinho`);
        atualizarCart();
    }
}

function aparecerCart() {
    const cartContainer = document.getElementById("cart-container");
    if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
        cartContainer.style.display = "block";
    } else {
        cartContainer.style.display = "none";
    }
}

function finalizaCompra() {
    alert("Sua compra foi finalizada!");
    cart = {};
    atualizarCart();
}

function criarItensCardapio() {
    const categorias = ["paes", "doces", "salgados"];    

    categorias.forEach(categoria => {  
        const itensCardapioContainer = document.getElementById(`itens-${categoria}`);   //busca o elemento;

        cardapio.filter(item => item.categoria === categoria)                           //inclui apenas os que pertencem a categoria;
            .forEach(item => {                                                          //cada item executa a funçao;

                const divItem = document.createElement("div");                          //cria um novo elemento e adiciona a classe lista;
                divItem.classList.add("lista");

                if (item.imagem) {
                    const img = document.createElement("img");
                    img.src = item.imagem;
                    img.alt = item.nome;                                                //se o item tiver imagem, cria e define seu src;
                    divItem.appendChild(img);
                }

                const divInfo = document.createElement("div");                          //cria um div para informacoes do item e
                divInfo.classList.add("info");                                          //adiciona a classe info;

                const h1Nome = document.createElement("h1");                            //Cria um elemento para o nome;
                h1Nome.textContent = item.nome;

                const spanPreco = document.createElement("span");                       //cria um elemento para o preço do item e
                spanPreco.classList.add("preco");                                       //adiciona a classe e o preço;
                spanPreco.innerHTML = `<strong>${item.preco}</strong>`;

                const divButtonContainer = document.createElement("div");                //Cria uma div para os botões e adiciona a classe button-container.
                divButtonContainer.classList.add("button-container");

                const buttonAddCart = document.createElement("button"); 
                buttonAddCart.classList.add("add-to-cart-button");
                buttonAddCart.textContent = "Adicionar ao carrinho";
                buttonAddCart.onclick = () => adicionarAoCart(item.nome, item.preco);    

                divButtonContainer.append(buttonAddCart);
                divInfo.append(h1Nome, spanPreco, divButtonContainer); 

                // Verificando se o item é da categoria;
                if (categoria === "doces" || categoria === "salgados") {
                    const linkWhatsApp = document.createElement("a");
                    linkWhatsApp.href = `https://wa.me/${51994299041}?text=Olá, estou interessado no produto: ${item.nome}`;
                    linkWhatsApp.target = '_blank';
                    linkWhatsApp.classList.add("whatsapp-link");
                    linkWhatsApp.textContent = "Sabores personalizados via whatsapp";
                    divInfo.appendChild(linkWhatsApp);
                }

                divItem.appendChild(divInfo);
                itensCardapioContainer.appendChild(divItem);
            });
       });
    }

window.onload = criarItensCardapio;
 
//animacao da logo;
window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo');
    const headerHeight = document.querySelector('header').offsetHeight;

    if (window.scrollY > 0) {
        logo.style.opacity = '0';     //Logo desaparece;
    } else {
        logo.style.opacity = '0.60';  // Logo aparece;
    }
});