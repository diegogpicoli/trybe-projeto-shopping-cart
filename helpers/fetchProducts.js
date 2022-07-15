const fetchProducts = async (pesquisa) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${pesquisa}`;

  try {
    const resposta = await fetch(url);
  const data = await resposta.json();

  return data.results;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
