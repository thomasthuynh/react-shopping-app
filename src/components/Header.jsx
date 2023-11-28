import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container, FormControl, Nav, Navbar } from "react-bootstrap";
import CartContext from "./context/Context";

import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch
  } = useContext(CartContext);

  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping Cart</Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaShoppingCart />
            <span style={{ padding: 8 }}>{cart.length}</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {cart.length > 0 ? (
              <div>
                {cart.map((item) => (
                  <span className="cartItem" key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cartItemImg"
                    />

                    <div className="cartItemDetails">
                      <span>{item.name}</span>
                      <span>${item.price.split(".")[0]}</span>
                    </div>

                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{width: "95%", margin: "0 10px"}}>
                    Go to Cart
                  </Button>
                </Link>
              </div>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
