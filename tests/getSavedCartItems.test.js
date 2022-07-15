const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    expect.assertions(1)
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  })

  it('Testa se, ao executar getSavedCartItems com cartItems como parâmetro , tem o retorno correto', () => {
    expect.assertions(1)
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  })
});
