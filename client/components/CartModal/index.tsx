import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { useModal } from '../../hooks/useModal';
import cartState from '../../store/atoms/cartAtom';
import Cart from '../Cart';

export default function CartModal() {
  const { setCartModal } = useModal();
  const [cart] = useRecoilState(cartState);

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <header>
            <h4>Carrinho</h4>
            <button className="close" onClick={() => setCartModal(false)}>
              &times;
            </button>
          </header>
          <div>
            <Cart />
            {cart.products.length > 0 && (
              <div className="action">
                <Link href="/orders/new">
                  <button onClick={() => setCartModal(false)}>
                    Finalizar pedido
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
