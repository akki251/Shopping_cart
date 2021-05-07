// import "./App.css";
import "../src/index.css";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import ShoppingCart from "./ShoppingCart";

function App() {
  const { items, handleSubmit, loading } = useGlobalContext();

  if (loading && items.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        {items.map((item) => {
          return (
            <div key={item.id} className="card">
              <div>
                <img className="img" src={item.image} alt="img" />
              </div>
              <div className="title">{item.title}</div>
              <div className="desc">
                <p>{item.description}</p>
              </div>

              <div className="price"> Rs. {item.price}</div>

              <div className="cart">
                <button onClick={() => handleSubmit(item.id)} className="btn">
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-container">
        <ShoppingCart />
      </div>
    </>
  );
}

export default App;
