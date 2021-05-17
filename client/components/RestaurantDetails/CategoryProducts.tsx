import Image from 'next/image';

import truncateString from '../../utils/truncateString';
import toCurrency from '../../utils/toCurrency';

import styles from './CategoryProducts.module.scss';
import AddProductModal from '../AddProductModal';
import { useState } from 'react';

type CategoryProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

type CategoryProductsProps = {
  title: string;
  restaurant: Object;
  products: CategoryProductItem[];
};

export default function CategoryProducts({
  title,
  products,
  restaurant,
}: CategoryProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <h2>{title}</h2>
      <div className={styles.productsList}>
        {products?.map((product: CategoryProductItem, i: number) => (
          <div
            key={i}
            className={styles.productItem}
            onClick={() => setSelectedProduct(product)}
          >
            <section>
              <header>
                <h5>{product.name}</h5>
              </header>
              <p>
                <small>{truncateString(product.description, 80)} - </small>
                <small>
                  <strong>{toCurrency(product.price)}</strong>
                </small>
              </p>
            </section>
            <Image
              src={product.image_url}
              alt={product.name}
              width={300}
              height={200}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <AddProductModal
        showModal={selectedProduct != null}
        restaurant={restaurant}
      />
    </>
  );
}
