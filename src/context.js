import React, { useState, useContext, useEffect } from "react";
import data from "./data";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // states Declartaion
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    // total cart Item
    function amounTotal() {
      let dummyAmount = 0;
      cartItems.map((item) => {
        return (dummyAmount = dummyAmount + item.amount);
      });

      setAmount(dummyAmount);
    }

    // total price
    function totalPrice() {
      let totalCost = cartItems.reduce((total, item) => {
        total = total + item.price * item.amount;
        return total;
      }, 0);

      totalCost = totalCost.toFixed(2);

      setFinalPrice(totalCost);
      // console.log(totalCost);
    }
    totalPrice();
    // data fetch
    setItems(data);
    amounTotal();
  }, [cartItems]);

  // adding items
  const handleSubmit = (id) => {
    let duplicateItem = null;

    const selectedItem = items.find((item) => {
      return item.id === id;
    });
    if (cartItems.length === 0) {
      selectedItem.amount = 1;
      return setCartItems([...cartItems, selectedItem]);
    }

    duplicateItem = cartItems.find((item) => {
      return item.id === id;
    });

    if (duplicateItem === selectedItem) {
      increaseAmount(id);
    } else {
      selectedItem.amount = 1;
      return setCartItems([...cartItems, selectedItem]);
    }
  };

  // clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // delete Item
  const deleteItem = (id) => {
    const updatedItems = cartItems.filter((item) => {
      return item.id !== id;
    });
    setCartItems(updatedItems);
  };

  //increase item count
  const increaseAmount = (id) => {
    const findItem = cartItems.find((item) => {
      return item.id === id;
    });
    const newAmount = findItem.amount + 1;
    findItem.amount = newAmount;

    setCartItems([...cartItems]);
  };

  // decrease item Count
  const decreaseAmount = (id) => {
    const findItem = cartItems.find((item) => {
      return item.id === id;
    });
    if (findItem.amount === 1) {
      return deleteItem(id);
    }

    const newAmount = findItem.amount - 1;
    findItem.amount = newAmount;
    setCartItems([...cartItems]);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        cartItems,
        handleSubmit,
        setCartItems,
        clearCart,
        deleteItem,
        increaseAmount,
        setAmount,
        loading,
        decreaseAmount,
        setLoading,
        amount,
        finalPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
