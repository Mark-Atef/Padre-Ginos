/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Cart({cart, checkout}) {

  let total = 0;
  for ( let i = 0; i < cart.length; i++ ) {
    const current = cart[i];
    total += current.pizza.sizzes[current.size];
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
            <Pizza name={item.name} description={item.description} image={item.image} />
          </li>
        ))}
      </ul> 
      <p>Total: {intl.format(total)}</p>
      <button type="button" onClick={checkout}>Checkout</button>
    </div>
  )
}
