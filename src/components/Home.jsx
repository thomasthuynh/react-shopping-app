import React from "react";
import CartContext from "./context/Context";
import { useContext } from "react";
import SingleProduct from "./SingleProduct";
import Filter from "./Filter";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = useContext(CartContext);

  console.log(sort, byStock, byFastDelivery, byRating, searchQuery);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((item) => item.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((item) => item.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (item) => item.ratings === byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // console.log(sortedProducts)
    return sortedProducts;
  };

  return (
    <div className="home">
      <Filter />
      <div className="productContainer">
        {transformProducts().map((item) => {
          return <SingleProduct key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
