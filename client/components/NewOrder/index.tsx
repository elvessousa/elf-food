import Cart from '../Cart';
import { OrderForm } from './OrderForm';

export function NewOrder() {
  return (
    <>
      <h1>Finalizar pedido</h1>
      <div className="half">
        <div className="modal">
          <Cart />
        </div>
        <OrderForm />
      </div>
    </>
  );
}
