import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import BackButton from "../common/BackButton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, buyBook } = useContext(ProductContext);
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="page">Book not found ❌</div>;
  }

  return (
    <div className="page">
      <BackButton />
      <h2>Book Details</h2>

      <div className="card book-card">
        <img
          src={product.image || "https://via.placeholder.com/100x140?text=Book"}
          alt={product.title}
          className="book-img"
        />

        <div className="book-info">
          <p><b>Title:</b> {product.title}</p>
          <p><b>Author:</b> {product.author}</p>
          <p><b>ISBN:</b> {product.isbn}</p>
          <p><b>Stock:</b> {product.stock}</p>

          {/* GUEST */}
          {!isLoggedIn && (
            <button
              onClick={() => {
                if (product.stock === 0) {
                  alert("Book out of stock ❌");
                  return;
                }
                buyBook(product.id);
                alert("Book purchased ✅");
              }}
              disabled={product.stock === 0}
            >
              Purchase Book
            </button>
          )}

         {/* ADMIN → Edit + Stock */}
{isLoggedIn && currentUser?.role === "admin" && (
  <>
    <button
      onClick={() => navigate(`/product/${product.id}/edit`)}
      className="btn-secondary"
    >
      Edit
    </button>

    <button
      onClick={() => navigate(`/product/${product.id}/stock`)}
      className="btn-secondary"
    >
      Update Stock
    </button>
  </>
)}

{/* LIBRARIAN → Stock ONLY */}
{isLoggedIn && currentUser?.role === "librarian" && (
  <button
    onClick={() => navigate(`/product/${product.id}/stock`)}
    className="btn-secondary"
  >
    Update Stock
  </button>
)}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
