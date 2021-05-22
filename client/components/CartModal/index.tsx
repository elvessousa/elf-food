import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import Cart from '../Cart';

type CartModalProps = {
  showModal: boolean;
  onShow: (showModal: boolean) => void;
};

export default function CartModal({ showModal, onShow }: CartModalProps) {
  const [cart] = useRecoilState(cartState);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showModal) {
      setShow(showModal);
    }
  }, [showModal]);

  return (
    <>
      {show && (
        <div className="overlay">
          <div className="modal">
            <header>
              <h4>Carrinho</h4>
              <button className="close" onClick={() => setShow(false)}>
                &times;
              </button>
            </header>
            <div>
              <Cart />
              {cart.products.length > 0 && (
                <div className="action">
                  <Link href="/orders/new">
                    <button>Finalizar pedido</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
