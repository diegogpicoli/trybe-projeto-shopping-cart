const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  const ul = document.createElement('ul')
  const li = document.createElement('li')
  li.innerText = 'Item';
  ul.appendChild(li);

  it('Testa se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    expect.assertions(1)
    saveCartItems(ul);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })

  it('Testa se o saveCartItems retorna o esperado', () => {
    expect.assertions(1)
    saveCartItems(ul);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', ul)
  })
});
