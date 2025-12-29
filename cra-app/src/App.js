import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import Stock from "./components/Stock";

function App() {
  return (
    <>
      <Link to="/">Product List</Link>{" "}
      <Link to="/add">Add Product</Link>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddProduct} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route path="/product/:id/stock" component={Stock} />
      </Switch>
    </>
  );
}

export default App;
