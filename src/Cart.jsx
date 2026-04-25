/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
/** biome-ignore-all assist/source/organizeImports: <> */
import Pizza from "./Pizza";
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({ cart, checkout }) {

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const current = cart[i];
    if (current.pizza && current.pizza.sizes) {
      total += current.pizza.sizes[current.size];
    }
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> -
            <span className="type">{item.pizza.name}</span> -
            <span className="price">{item.price}</span>
            <Pizza name={item.pizza.name} description={item.pizza.description} image={item.pizza.image} />
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button type="button" onClick={checkout}>Checkout</button>
    </div>
  )
}
