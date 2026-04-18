import { usePizzaOfTheDay } from './usePizzaOfTheDay';


const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) {
    return <div>Loading...</div>
  }
  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div className="pizza-of-the-day-info">
      <p>{pizzaOfTheDay.name}</p>
      <p>{pizzaOfTheDay.description}</p>
      <p className="pizza-of-the-day-price">From: {intl.format(pizzaOfTheDay.sizes.S)}</p>
      </div>
      <div>
        <img className="pizza-of-the-day-image" src={pizzaOfTheDay.image} alt={pizzaOfTheDay.name} />
      </div>
    </div>
  )
}

export default PizzaOfTheDay;