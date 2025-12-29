import { useParams, useHistory } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Stock = () => {
  const { id } = useParams();
  const history = useHistory();
  const { products, updateStock } = useContext(ProductContext);

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <p>Current Stock: {product.stock}</p>

      <button onClick={() => updateStock(id, 1)}>+</button>
      <button onClick={() => updateStock(id, -1)}>-</button>

      <button onClick={() => history.push(`/product/${id}`)}>
        Back to Product
      </button>
    </div>
  );
};

export default Stock;
