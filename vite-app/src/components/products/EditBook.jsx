import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import BackButton from "../common/BackButton";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateBook } = useContext(ProductContext);

  const book = products.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div className="page">
        <BackButton />
        <p>Book not found ❌</p>
      </div>
    );
  }

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.isbn);
  const [stock, setStock] = useState(book.stock);
  const [image, setImage] = useState(book.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !isbn) {
      alert("All fields are required ❌");
      return;
    }

    if (Number(stock) < 0) {
      alert("Stock cannot be negative ❌");
      return;
    }

    updateBook({
      ...book,
      title,
      author,
      isbn,
      stock: Number(stock),
      image,
    });

    alert("Book updated successfully ✅");
    navigate("/products");
  };

  return (
    <div className="page">
      <BackButton />
      <h2>Edit Book</h2> 

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Book Image URL</label>
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
