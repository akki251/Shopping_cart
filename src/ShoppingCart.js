import React from "react";
import { useGlobalContext } from "./context";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ShoppingCart = () => {
  const {
    cartItems,
    clearCart,
    deleteItem,
    decreaseAmount,
    amount,
    finalPrice,
    increaseAmount,
  } = useGlobalContext();

  if (cartItems.length >= 1)
    return (
      <React.Fragment>
        <h3 className="cart-title">Shopping Cart</h3>
        <AiOutlineShoppingCart className="cart-btn" />
        <h5 className="cart-amount">{amount}</h5>
        <button onClick={clearCart} className="clear-btn">
          Clear Cart
        </button>

        {cartItems.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <div className="item">
                <div key={item.id} className="item-title">
                  {" "}
                  {item.title}{" "}
                </div>
                <div className="button-container">
                  <button
                    className="down-btn"
                    onClick={() => decreaseAmount(item.id)}
                  >
                    <AiFillCaretDown />
                  </button>
                  <h3 className="item-count">{item.amount}</h3>
                  <button
                    className="up-btn"
                    onClick={() => increaseAmount(item.id)}
                  >
                    <AiFillCaretUp />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="down-btn"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        <div className="totalPrice">
          <h3>Total Price to be billed</h3>
          <h3>{finalPrice}</h3>
        </div>
      </React.Fragment>
    );
  else {
    return (
      <>
        <h3 className="cart-title"> Shopping Cart</h3>
        <h1 className="empty">Cart is EMPTY</h1>
      </>
    );
  }
};

export default ShoppingCart;
