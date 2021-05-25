import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useModal } from '../../hooks/useModal';
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
  restaurant: Restaurant;
  product: Product;
};

export default function AddProductModal({
  restaurant,
  product,
}: AddProductModalProps) {
  const { setProductModal } = useModal();
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = useState(1);

  const addProduct = (e: FormEvent) => {
    e.preventDefault();

    const newProduct = { ...product, ...{ quantity: quantity } };

    if (cart.restaurant.id != restaurant.id) {
      setCart({ restaurant, products: [newProduct] });
    } else {
      setCart({ restaurant, products: [...cart.products, newProduct] });
    }

    setQuantity(1);
    setProductModal(false);
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <header>
            <h4>Adicionar produto</h4>
            <button className="close" onClick={() => setProductModal(false)}>
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
          <form className="action" onSubmit={addProduct}>
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
    </>
  );
}
