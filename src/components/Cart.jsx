import React, { useContext, useEffect, useState } from "react";
import CartContext from "./context/Context";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "./Rating";

import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [total, setTotal] = useState();

  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);

  useEffect(() => {
    setTotal(
      cart.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.price) * currentValue.qty,
        0
      )
    );
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{item.name}</span>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Rating rating={item.ratings} />{" "}
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({ type: "UPDATE_CART_QTY", payload: {id: item.id, qty: e.target.value} })
                    }
                  >
                    {[...Array(item.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>${total}</span>
        <Button disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
