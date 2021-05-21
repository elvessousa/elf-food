import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import cartState from '../../store/atoms/cartAtom';
import toCurrency from '../../utils/toCurrency';
import truncateString from '../../utils/truncateString';

type Restaurant = {
  id: number;
};

type Product = {
  image_url: string;
  name: string;
  price: number;
  description: string;
};

type AddProductModalProps = {
  showModal: boolean;
  restaurant: Restaurant;
  product: Product;
  onHide: () => void;
};

export default function AddProductModal({
  showModal,
  restaurant,
  product,
  onHide,
}: AddProductModalProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(showModal);
  }, [showModal, onHide]);

  const addProduct = (e: FormEvent) => {
    e.preventDefault();

    const newProduct = { ...product, ...{ quantity: quantity } };

    if (cart.restaurant.id != restaurant.id) {
      setCart({ restaurant, products: [newProduct] });
    } else {
      setCart({ restaurant, products: [...cart.products, newProduct] });
    }

    setQuantity(1);
    onHide();
  };

  if (!product) {
    return null;
  }

  return (
    <>
      {show && (
        <div className="overlay">
          <div className="modal">
            <header>
              <h4>Adicionar produto</h4>
              <button className="close" onClick={() => setShow(false)}>
                &times;
              </button>
            </header>
            <div>
              <Image
                src={product.image_url}
                alt={product.name}
                width={300}
                height={200}
              />
              <h3>{product.name}</h3>
              <strong>{toCurrency(product.price)}</strong>
              <p>{truncateString(product.description, 60)}</p>
            </div>
            <form
              onSubmit={addProduct}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <input
                type="number"
                value={quantity}
                name="quantity"
                placeholder="Qtde."
                min={1}
                step={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button type="submit">Adicionar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
