import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import createOrder from '../../services/createOrder';
import addressState from '../../store/atoms/addressAtom';
import cartState from '../../store/atoms/cartAtom';

type Product = {
  id: number;
  quantity: number;
};

type Order = {
  name: string;
  phone_number: string;
  order_products_attributes: Product[];
  restaurant_id: number;
};

type Address = {
  street: string;
  state: string;
  number: string;
  neighborhood: string;
  city: string;
};

export function OrderForm() {
  const router = useRouter();

  const [address] = useRecoilState<Address>(addressState);
  const [cart] = useRecoilState(cartState);
  const resetCart = useResetRecoilState(cartState);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState<Order>({
    name: '',
    phone_number: '',
    ...address,
    order_products_attributes: cart.products.map((p: Product) => ({
      product_id: p.id,
      quantity: p.quantity,
    })),
    restaurant_id: cart.restaurant.id,
  });

  const updateOrderState = (e: ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createOrder(order);
      router.push('/orders/success');
      resetCart();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={(e) => submitOrder(e)}>
        <h4>Detalhes finais</h4>
        <fieldset>
          <label>Nome completo</label>
          <input
            type="text"
            required
            placeholder="Seu Nome Aqui..."
            onChange={updateOrderState}
            value={order.name}
            name="name"
          />
        </fieldset>
        <fieldset>
          <label>Número de telefone</label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            onChange={updateOrderState}
            value={order.phone_number}
            name="phone_number"
          />
        </fieldset>
        <section>
          <h4>Entregar em:</h4>
          <address>
            <small>
              {address.state}, {address.number} {address.neighborhood},{' '}
              {address.city}
            </small>
          </address>
        </section>

        {cart.products.length > 0 && (
          <div className="action">
            <button type="submit">Finalizar pedido</button>
          </div>
        )}

        {error && <div className="error">Erro no pedido!</div>}
      </form>
    </div>
  );
}
