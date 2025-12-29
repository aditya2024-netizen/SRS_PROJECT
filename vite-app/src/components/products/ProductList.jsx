import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../common/BackButton";

import programming from "../../assets/genres/programming.jpg";
import fiction from "../../assets/genres/fiction.jpg";
import history from "../../assets/genres/history.jpg";
import computer from "../../assets/genres/computer.jpg";
import selfdev from "../../assets/genres/selfdevelopment.jpg";
import science from "../../assets/genres/science (2).jpg";
const genreImages = {
  Programming: programming,
  Fiction: fiction,
  History: history,
  "Computer Science": computer,
  "Self Development": selfdev,
  Science: science,
};

const ProductList = () => {
  const { products, buyBook } = useContext(ProductContext);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [search, setSearch] = useState("");

  const role = !isLoggedIn ? "guest" : currentUser.role;

  const genres = [...new Set(products.map((b) => b.genre))];

  // Books ONLY from selected genre
  const genreBooks = products.filter((b) => b.genre === selectedGenre);

  // 🔍 Search inside selected genre only
  const filteredBooks = genreBooks.filter((book) => {
    const q = search.toLowerCase();

    if (role === "admin") {
      return (
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.isbn.toLowerCase().includes(q)
      );
    }

    return (
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="page">
      <BackButton />
      <h2>Library</h2>

      {/* ================= GENRE VIEW (UNCHANGED) ================= */}
      {!selectedGenre && (
        <div className="genre-grid">
          {genres.map((g) => (
            <div
              key={g}
              className="genre-card"
              onClick={() => {
                setSelectedGenre(g);
                setSearch(""); // reset search when changing genre
              }}
            >
              <img src={genreImages[g]} alt={g} />
              <h3>{g}</h3>
            </div>
          ))}
        </div>
      )}

      {/* ================= BOOK VIEW ================= */}
      {selectedGenre && (
        <>
          <button
            className="btn-secondary"
            onClick={() => {
              setSelectedGenre(null);
              setSearch("");
            }}
          >
            ← Back to Genres
          </button>
          <br />
          {/* 🔍 SEARCH BAR (ONLY AFTER GENRE SELECTED) */}
          <input
            type="text"
            placeholder={
              role === "admin"
                ? "Search by title, author or ISBN"
                : "Search by title or author"
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ margin: "16px 0" }}
          />

          <div className="book-grid">
            {filteredBooks.length === 0 && (
              <p style={{ textAlign: "center", width: "100%" }}>
                No books found ❌
              </p>
            )}

            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="book-tile"
                onClick={() => navigate(`/product/${book.id}`)}
              >
                <img src={book.image} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <p>Stock: {book.stock}</p>

                {/* GUEST PURCHASE */}
                {!isLoggedIn && (
                  <button
                    disabled={book.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (book.stock === 0) {
                        alert("Book out of stock ❌");
                        return;
                      }
                      buyBook(book.id);
                      alert("Book purchased ✅");
                    }}
                  >
                    Purchase
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
