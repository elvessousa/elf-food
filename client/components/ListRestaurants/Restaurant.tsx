import Link from 'next/link';
import Image from 'next/image';
import truncateString from '../../utils/truncateString';
import toCurrency from '../../utils/toCurrency';
import { FaStar } from 'react-icons/fa';

type RestaurantProps = {
  id: number;
  image: string;
  name: string;
  description: string;
  category_title: string;
  className: string;
  delivery_tax: string;
};

export function Restaurant({
  id,
  image,
  name,
  description,
  category_title,
  className,
  delivery_tax,
}: RestaurantProps) {
  return (
    <Link href={`restaurants/${id}`}>
      <div className={className}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          objectFit="cover"
        />
        <section className="details">
          <header>
            <h5>{truncateString(name, 25)}</h5>
          </header>
          <p>
            <small>{truncateString(description, 60)}</small>
          </p>
          <p>
            <small>
              <strong>{category_title}</strong>
            </small>
          </p>
          <footer>
            <small>entrega {toCurrency(Number(delivery_tax))}</small>
          </footer>
        </section>
        <aside>
          <FaStar /> 5
        </aside>
      </div>
    </Link>
  );
}
