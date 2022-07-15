const items = document.querySelector('.items');
const botoes = document.getElementsByClassName('item__add');
const listaCards = document.querySelector('.cart__items');
const valorTotal = document.querySelector('.total-price');
const esvazia = document.querySelector('.empty-cart');
const carrega = document.querySelector('.carregamento');

const carregamento = (status) => {
  if (status === true) {
    const carregando = document.createElement('span');
    carregando.innerText = 'carregando...';
    carregando.className = 'loading';
    carrega.appendChild(carregando);
  } else {
    carrega.innerHTML = '';
  }
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource.replace('I.jpg', 'W.jpg');
  return img;
};

const createProductImageElementCart = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'imageCart';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const addLocal = (lista) => {
  saveCartItems(lista);
};

const somaPrice = async () => {
    const produtos = document.getElementsByClassName('cart__item');
    let vTotal = 0;
    for (let index = 0; index < produtos.length; index += 1) {
      console.log(parseFloat(produtos[index].innerText.split('$')[1]));
      vTotal += parseFloat(produtos[index].innerText.split('$')[1]);
    }
    valorTotal.innerText = vTotal.toFixed(2);
};

const cartItemClickListener = (event) => {
  listaCards.removeChild(event.target);
  addLocal(listaCards.innerHTML);
  somaPrice();
};

const createCartItemElement = async ({ name, salePrice, src }) => {
  carregamento(true);
  const li = document.createElement('li');
  const div = document.createElement('div');
  const img = createProductImageElementCart(src);
  div.className = 'cart__item';
  div.innerText = `${name}
  R$${salePrice}`;
  div.appendChild(img);
  div.addEventListener('click', cartItemClickListener);
  li.appendChild(div);
  if (valorTotal.innerText === '') {
    valorTotal.innerHTML = salePrice;
  } else {
   const tvalor = parseFloat(valorTotal.innerHTML) + salePrice;
   valorTotal.innerHTML = tvalor.toFixed(2);
  }
  carregamento(false);
  return div;
};

// criaElemento é responsavel por criar elementos na tela caso seja chamada sem parâmetro,
// Casso tenha parâmetro, ela retorna um objeto de um único item.
const criaElemento = async (elemento) => {
  if (elemento) {
    carregamento(true);
    const element = await fetchItem(elemento);
    carregamento(false);
    return element;
  }
  carregamento(true);
  const produto = await fetchProducts('computador');
  carregamento(false);
  produto.forEach(({ id, title, thumbnail }) => {
    const item = createProductItemElement({ sku: id, name: title, image: thumbnail });
    items.appendChild(item);
  });
};

// Adiciona eventos em todos os botões, o evento e responsavel por enviar o item para o carrinho.
const addEventBotoes = () => {
  for (let index = 0; index < botoes.length; index += 1) {
    botoes[index].addEventListener('click', async () => {
      const produto = botoes[index].parentNode.firstChild.innerText; 
      const { id, title, price, thumbnail } = await criaElemento(produto);
      const li = await createCartItemElement({ sku: id,
                                                name: title,
                                                salePrice: price, 
                                                src: thumbnail }); 
      listaCards.appendChild(li);
      addLocal(listaCards.innerHTML);
    });
  }
};

const chamaLocal = () => {
  const lista = document.querySelector('.cart__items');
  lista.innerHTML = getSavedCartItems();
  const cardItems = document.getElementsByClassName('cart__item');
  for (let index = 0; index < cardItems.length; index += 1) {
    cardItems[index].addEventListener('click', cartItemClickListener);
  }
};

esvazia.addEventListener('click', () => {
  listaCards.innerHTML = '';
  valorTotal.innerHTML = '';
});

criaElemento();

window.onload = () => {
  addEventBotoes();
  chamaLocal();
  somaPrice();
};
