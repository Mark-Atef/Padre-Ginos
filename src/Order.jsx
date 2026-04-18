/** biome-ignore-all assist/source/organizeImports: <> */
import Pizza from "./Pizza";
import { useEffect, useState } from "react";
import Cart from "./Cart";

export default function Order() {

  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  async function checkout() {
    setLoading(true);

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find(pizza => pizza.name === pizzaType);
    if (selectedPizza) {
      price = intl.format(
        selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : 0
      );
    }
  }

  useEffect(() => {
    async function fetchPizzaTypes() {
      const pizzaResponse = await fetch("/api/pizzas");
      const pizzaJson = await pizzaResponse.json();
      setPizzaTypes(pizzaJson);
      setLoading(false);
    }

    fetchPizzaTypes();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, { name: pizzaType, size: pizzaSize, price }]);
        }}>
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select onChange={(e) => setPizzaType(e.target.value)} name="pizza-type" value={pizzaType}>
                {pizzaTypes.map(pizza => (
                  <option key={pizza.id} value={pizza.name}>{pizza.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    checked={pizzaSize === "S"}
                    type="radio"
                    name="pizza-size"
                    value="S"
                    id="pizza-s"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-s">Small</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "M"}
                    type="radio"
                    name="pizza-size"
                    value="M"
                    id="pizza-m"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-m">Medium</label>
                </span>
                <span>
                  <input
                    checked={pizzaSize === "L"}
                    type="radio"
                    name="pizza-size"
                    value="L"
                    id="pizza-l"
                    onChange={(e) => setPizzaSize(e.target.value)}
                  />
                  <label htmlFor="pizza-l">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          {
            loading ? (
              <h3>Loading...</h3>
            ) : selectedPizza ? (
              <div className="order-pizza">
                <Pizza
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={selectedPizza.image}
                />
                <p>{price}</p>
              </div>
            ) : null
          }
        </form>

      </div>
      {loading ? <h2>Loading ...</h2> : <Cart cart={cart} />}
    </div>
  );
}