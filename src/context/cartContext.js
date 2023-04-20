import React, { useReducer } from "react";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";

export const cartContext = React.createContext();

const INIT_STATE = {
  cart: {},
  cartLength: 0,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        cartLength: action.payload.products.length,
      };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: product.price,
    };
    let filteredCart = cart.products.filter(
      (item) => item.item.id === product.id
    );
    if (filteredCart.length > 0) {
      cart.products = cart.products.filter(
        (item) => item.item.id !== product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    console.log(cart);
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart(); //автоматически обновляет корзину
  }
  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  }
  function deleteFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    cart.products = cart.products.filter((item) => item.item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function checkItemInCart(id) {
    //проверка добавлен ли товар
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let filteredCart = cart.products.filter((item) => item.item.id === id);
    return filteredCart.length > 0 ? true : false; // проверка есть ли такой элем в корзине
  }

  function changeProductCount(count, id) {
    //количество элементов в корзине
    if (count <= 0) {
      count = 1;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.item.id === id) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  return (
    <cartContext.Provider
      value={{
        cart: state.cart,
        cartLength: state.cartLength,
        addProductToCart,
        getCart,
        deleteFromCart,
        checkItemInCart,
        changeProductCount,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
