import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h2>List of Products</h2>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
