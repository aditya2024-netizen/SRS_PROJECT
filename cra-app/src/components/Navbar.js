import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav>
      <Link to="/">Product List</Link>
      
      <Link to="/add">Add Product</Link>
    </nav>
  );
};

export default Navbar;
