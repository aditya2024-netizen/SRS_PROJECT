import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isbn || !title || !author || !genre || !stock) {
      alert("Please fill all fields ❌");
      return;
    }

    addProduct({
      id: Date.now(),
      isbn,
      title,
      author,
      genre,
      stock: Number(stock),
      image,
    });

    navigate("/products");
  };

  return (
    <div className="page">
      <BackButton />
      <h2>Add Book</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <br />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Self Development">Self Development</option>
          <option value="Science">Science</option>
        </select>
        <br />
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <br />
        <button>Add Book</button>
      </form>
    </div>
  );
};

export default AddProduct;
