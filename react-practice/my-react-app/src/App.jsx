import "./App.css";
import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    alert("You clicked me!");
    setCount(count + 1);
  }
  return <button onClick={handleClick}>Clicked {count} times</button>;
}

function App() {
  const isLoggedIn = true;
  return (
    <>
      {isLoggedIn ? (
        <h1 className="welcome-text">Welcome back!</h1>
      ) : (
        <h1 className="welcome-text">Please sign up.</h1>
      )}
      <h2>Counters that update separately!</h2>
      <MyButton />
      <MyButton />
      <MyButton />
      <ShoppingList />
    </>
  );
}

const products = [
  { title: "Cabbage", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];

function ShoppingList() {
  const listItems = products.map((product) => {
    return (
      <li
        key={product.id}
        style={{ color: product.isFruit ? "green" : "black" }}
      >
        {product.title}
      </li>
    );
  });
  return <ul>{listItems}</ul>;
}

export default App;
