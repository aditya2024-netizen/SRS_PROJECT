import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateStock = (id, change) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, stock: p.stock + change } : p
      )
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateStock }}>
      {children}
    </ProductContext.Provider>
  );
};
