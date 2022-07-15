const getSavedCartItems = () => {
  // seu código aqui
  const local = localStorage.getItem('cartItems');
  return local;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
