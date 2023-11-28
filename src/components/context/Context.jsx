import { createContext, useReducer } from "react";
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from "./Reducer";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  faker.seed(99)

  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({ category: 'nature' }),
    inStock: faker.number.int({ min: 0, max: 4 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.number.int({ min: 1, max: 5 }),
  }))

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart:[]
  })

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
  })

  return <CartContext.Provider value={{state, dispatch, productState, productDispatch}}>{children}</CartContext.Provider>;
};

export default CartContext;
