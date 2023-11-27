import React from "react";
import CartContext from "./context/Context";
import { useContext } from "react";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
    dispatch,
  } = useContext(CartContext);

  // console.log(products);

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {products.map((item) => {
          return <SingleProduct key={item.id} item={item}/>
        })}
      </div>
    </div>
  );
};

export default Home;
