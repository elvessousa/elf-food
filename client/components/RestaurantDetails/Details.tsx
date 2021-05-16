import Image from 'next/image';
import toCurrency from '../../utils/toCurrency';
import styles from './Details.module.scss';

type DetailsProps = {
  name: string;
  image: string;
  description: string;
  delivery_tax: string;
};

export default function Details({
  name,
  image,
  description,
  delivery_tax,
}: DetailsProps) {
  return (
    <section>
      <h1>{name}</h1>
      <div className={styles.detailItem}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          objectFit="cover"
        />
        <p>
          {description}
          <hr />
          <span>Entrega: {toCurrency(Number(delivery_tax))}</span>
        </p>
      </div>
    </section>
  );
}
