const fetchItem = async (nome) => {
  const url = `https://api.mercadolibre.com/items/${nome}`;

  try {
    const resposta = await fetch(url);
    const data = await resposta.json();

    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
