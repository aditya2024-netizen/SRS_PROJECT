import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import BackButton from "../common/BackButton";

const Stock = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, updateStock } = useContext(ProductContext);
const { isLoggedIn, currentUser } = useContext(AuthContext);

  const book = products.find((b) => b.id === Number(id));
  const [qty, setQty] = useState("");

  // 🔒 PROTECT PAGE
 if (
  !isLoggedIn ||
  (currentUser.role !== "admin" && currentUser.role !== "librarian")
) {
  return <Navigate to="/" />;
}
  if (!book) return <p>Book not found</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    const change = Number(qty);
    if (!Number.isInteger(change)) return;

    const newStock = book.stock + change;
    if (newStock < 0) return;

    updateStock(book.id, newStock);
    navigate("/products");
  };

  return (
    <div className="page">
      <BackButton />
      <h2>Update Stock</h2>

      <p>
        <b>Current Stock:</b> {book.stock}
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="+ Add / - Remove"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button disabled={qty === ""}>Update</button>
      </form>
    </div>
  );
};

export default Stock;
