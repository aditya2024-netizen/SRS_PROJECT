import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  const { addProduct } = useContext(ProductContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    addProduct({
      id: Date.now().toString(),
      name,
      description,
      stock: Number(stock),
    });

    history.push("/");
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button type="submit">Save product</button>
      </form>
    </div>
  );
};

export default AddProduct;
