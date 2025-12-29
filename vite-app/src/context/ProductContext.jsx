import { createContext, useState } from "react";

export const ProductContext = createContext();

const initialBooks = [
  {
    id: 1,
    isbn: "9780132350884",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    stock: 5,
    image: "https://m.media-amazon.com/images/I/41SH-SvWPxL.jpg",
  },
  {
    id: 2,
    isbn: "9780201616224",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    genre: "Programming",
    stock: 4,
    image: "https://m.media-amazon.com/images/I/51A8l+FxFNL.jpg",
  },
  {
    id: 3,
    isbn: "9781491950296",
    title: "Learning React",
    author: "Alex Banks",
    genre: "Programming",
    stock: 3,
    image: "https://covers.openlibrary.org/b/isbn/9781491950296-M.jpg",
  },

  // ===== Fiction =====
  {
    id: 4,
    isbn: "9780747532743",
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Fiction",
    stock: 6,
    image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg",
  },
  {
    id: 5,
    isbn: "9780451524935",
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    stock: 4,
    image: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg",
  },
  {
    id: 6,
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    stock: 3,
    image: "https://m.media-amazon.com/images/I/51IXWZzlgSL.jpg",
  },

  // ===== History =====
  {
    id: 7,
    isbn: "9780195327574",
    title: "India After Gandhi",
    author: "Ramachandra Guha",
    genre: "History",
    stock: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780195327574-M.jpg",
  },
  {
    id: 8,
    isbn: "9780140445756",
    title: "Ancient World History",
    author: "Susan Wise Bauer",
    genre: "History",
    stock: 3,
    image: "https://covers.openlibrary.org/b/isbn/9780140445756-M.jpg",
  },
  {
    id: 9,
    isbn: "9780143127741",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    stock: 4,
    image: "https://covers.openlibrary.org/b/isbn/9780143127741-M.jpg",
  },

  // ===== Computer Science =====
  {
    id: 10,
    isbn: "9780262033848",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    genre: "Computer Science",
    stock: 2,
    image: "https://covers.openlibrary.org/b/isbn/9780262033848-M.jpg",
  },
  {
    id: 11,
    isbn: "9780133594140",
    title: "Operating Systems",
    author: "Abraham Silberschatz",
    genre: "Computer Science",
    stock: 3,
    image: "https://covers.openlibrary.org/b/isbn/9780133594140-M.jpg",
  },
  {
    id: 12,
    isbn: "9780134093413",
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    genre: "Computer Science",
    stock: 2,
    image: "https://covers.openlibrary.org/b/isbn/9780134093413-M.jpg",
  },

  // ===== Self Development =====
  {
    id: 13,
    isbn: "9780743273565",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    genre: "Self Development",
    stock: 4,
    image: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg",
  },
  {
    id: 14,
    isbn: "9780593579830",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Development",
    stock: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780593579830-M.jpg",
  },
  {
    id: 15,
    isbn: "9781591847816",
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self Development",
    stock: 3,
    image: "https://covers.openlibrary.org/b/isbn/9781591847816-M.jpg",
  },

  // ===== Science =====
  {
    id: 16,
    isbn: "9780393354324",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "Science",
    stock: 4,
    image: "https://m.media-amazon.com/images/I/41xShlnTZTL.jpg",
  },
  {
    id: 17,
    isbn: "9780198788683",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    genre: "Science",
    stock: 3,
    image: "https://m.media-amazon.com/images/I/41+eK8zBwQL.jpg",
  },
  {
    id: 18,
    isbn: "9780393635066",
    title: "Cosmos",
    author: "Carl Sagan",
    genre: "Science",
    stock: 5,
    image: "https://covers.openlibrary.org/b/isbn/9780393635066-M.jpg",
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialBooks);

  // ADD BOOK
  const addProduct = (book) => {
    setProducts([...products, book]);
  };

  // BUY BOOK
  const buyBook = (id) => {
    setProducts(
      products.map((b) =>
        b.id === id && b.stock > 0 ? { ...b, stock: b.stock - 1 } : b
      )
    );
  };

  // ✅ UPDATE BOOK (EDIT PAGE FIX)
  const updateBook = (updatedBook) => {
    setProducts(
      products.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  // ✅ UPDATE STOCK (STOCK PAGE FIX)
  const updateStock = (id, newStock) => {
    setProducts(
      products.map((b) => (b.id === id ? { ...b, stock: newStock } : b))
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        buyBook,
        updateBook, // ✅ exposed
        updateStock, // ✅ exposed
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
