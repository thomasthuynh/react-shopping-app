import React, { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import CartContext from "./context/Context";
import Rating from "./Rating";

const SingleProduct = ({ item }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);

  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={item.image} alt={item.name} />

        <Card.Body>
          <Card.Title>{item.name}</Card.Title>

          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>{item.price.split(".")[0]}</span>
            {item.fastDelivery ? (
              <div>Fast Delivery</div>
            ) : (
              <div>4 days delivery</div>
            )}
            <Rating rating={item.ratings}/>
          </Card.Subtitle>

          {cart.some((ci) => ci.id === item.id) ? (
            <Button
              variant="danger"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: item });
              }}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              disabled={!item.inStock}
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: item });
              }}
            >
              {!item.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
