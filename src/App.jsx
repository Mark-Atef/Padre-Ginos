import { createRoot } from 'react-dom/client';
import Pizza from './Pizza';

const App = () => {
  return (
    <div>
      <h1>Padre Gino's Order Now</h1>
      <Pizza
        name="The Pepperoni Pizza"
        description="Mozzarella cheese, pepperoni"
        image="http://localhost:3000/public/pizzas/pepperoni.webp"
      />
      <Pizza name="The Hawaiian Pizza" description="Mozzarella cheese, ham, pineapple" image="/public/pizzas/hawaiian.webp" />
      <Pizza name="The Meat Lovers Pizza" description="Mozzarella cheese, pepperoni, sausage, bacon" image="/public/pizzas/big_meat.webp" />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);