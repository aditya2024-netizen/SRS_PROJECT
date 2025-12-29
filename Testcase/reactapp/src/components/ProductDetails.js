import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);

  const product = products.find((p) => p.id === id);

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Stock: {product.stock}</p>

      <Link to={`/product/${id}/stock`}>Manage Stock</Link>
    </div>
  );
};

export default ProductDetails;
