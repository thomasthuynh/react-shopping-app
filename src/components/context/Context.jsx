import { createContext } from "react";
import { faker } from '@faker-js/faker';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const products = [...Array(20)].map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.urlLoremFlickr({ category: 'nature' }),
    inStock: faker.number.int({ min: 0, max: 4 }),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.number.int({ min: 1, max: 5 }),
  }))

  console.log(products)

  return <CartContext.Provider value={{products}}>{children}</CartContext.Provider>;
};

export default CartContext;
