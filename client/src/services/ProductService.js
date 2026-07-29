const STORAGE_KEY = 'chhimwal_sweets_products';

export const ProductService = {
  getProducts: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveProduct: (product) => {
    const products = ProductService.getProducts();
    if (product.id) {
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    } else {
      product.id = Date.now().toString();
      products.push(product);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  },
  
  deleteProduct: (id) => {
    const products = ProductService.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
