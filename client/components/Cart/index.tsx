import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import toCurrency from '../../utils/toCurrency';
import truncateString from '../../utils/truncateString';

type Restaurant = {
  name: string;
};

type Product = {
  id: number;
  image_url: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

type Cart = {
  restaurant: Restaurant;
  products: Product[];
};

export default function Cart() {
  const [cart, setCart] = useRecoilState(cartState);

  const subTotal = () =>
    cart.products.reduce(
      (a: number, b: number) =>
        a + (parseFloat(b['price']) * parseFloat(b['quantity']) || 0),
      0
    );

  const total = () => cart.restaurant.delivery_tax + subTotal();

  const removeProduct = (product: Product) => {
    const newProducts = cart.products.filter(
      (p: Product) => p.id != product.id
    );
    setCart({ restaurant: { ...cart.restaurant }, products: newProducts });
  };

  if (cart.products.length <= 0) {
    return <p>Carrinho vazio</p>;
  }

  return (
    <>
      <h4>{cart.restaurant.name}</h4>
      {cart.products.map((product: Product) => (
        <div key={product.id} className="item">
          <hgroup>
            <h5>
              {product.quantity}&times; {product.name}
            </h5>
            <strong>{toCurrency(product.price)}</strong>
          </hgroup>
          <p>
            <small>{truncateString(product.description, 40)}</small>
            <button onClick={() => removeProduct(product)}>Remover</button>
          </p>
        </div>
      ))}
      <hr />
      <section className="info">
        <p>Subtotal:</p>
        <strong>{toCurrency(subTotal())}</strong>
      </section>
      <section className="info">
        <p>Taxa de entrega</p>
        <strong>{toCurrency(cart.restaurant.delivery_tax)}</strong>
      </section>
      <hr />
      <section className="info">
        <strong>Total</strong>
        <strong>{toCurrency(total())}</strong>
      </section>
    </>
  );
}
