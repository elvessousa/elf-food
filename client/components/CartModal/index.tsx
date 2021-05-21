import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import toCurrency from '../../utils/toCurrency';
import truncateString from '../../utils/truncateString';
import Cart from '../Cart';

type Restaurant = {
  id: number;
};

type Product = {
  image_url: string;
  name: string;
  price: number;
  description: string;
};

type CartModalProps = {
  showModal: boolean;
  onHide: (showModal: boolean) => void;
};

export default function CartModal({ showModal, onHide }: CartModalProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showModal);
  }, [showModal, onHide]);

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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
