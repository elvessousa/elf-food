import Link from 'next/link';
import Image from 'next/image';

import styles from './Category.module.scss';

type CategoryProps = {
  id: number;
  title: string;
  image_url: string;
};

export function Category({ title, image_url }: CategoryProps) {
  return (
    <div className={styles.categoryItem}>
      <Link href={`/restaurants?category=${title}`}>
        <a>
          <Image src={image_url} alt={title} width={300} height={200} />
        </a>
      </Link>
      <h5>{title}</h5>
    </div>
  );
}
