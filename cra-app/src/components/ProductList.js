import React from 'react'
import {useContext} from "react"
import {ProductContext} from "../context/ProductContext"
import {Link} from "react-router-dom"
const ProductList = () => {
    const { products } =useContext(ProductContext)
  return (
    <div>
        <h1>Product List</h1>
        <h2>List of Products</h2>
        <ul>
            {ProductContext.map((product) => (
                <li key={product.id}>
                    <Link to = {`/prooduct/${product.id}`}>
                        {product.name}
                    </Link> {" "}
                    -Stock: {product.stock}
                </li>
            ))}
        </ul>

        </div>
  );
};

export default ProductList