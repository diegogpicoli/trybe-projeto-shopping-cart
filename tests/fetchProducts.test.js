require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  test('Testa se fetchProducts é uma função', () => {
    expect.assertions(1);

    expect(typeof fetchProducts).toBe('function');
  });

  test('Testa se a função fetchProducts com o argumento computador e teste se fetch foi chamada corretamente', async () => {
    expect.assertions(1);
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Testa se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Testa se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch);
  });

  test('Testa e, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const erro = await fetchProducts();
    expect(erro).toEqual(new Error('You must provide an url'))
  });
});
