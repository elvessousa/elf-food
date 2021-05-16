import { FaCircleNotch } from 'react-icons/fa';
import getRestaurants from '../../services/getRestaurants';
import { Restaurant } from './Restaurant';
import styles from './Restaurants.module.scss';

type Restaurant = {
  id: number;
  image_url: string;
  name: string;
  description: string;
  category_title: string;
  className: string;
  delivery_tax: string;
};

export default function ListRestaurants() {
  const { restaurants, isLoading, isError } = getRestaurants();

  function renderContent() {
    if (isError) {
      return <div className="error">Erro ao carregar.</div>;
    } else if (isLoading) {
      return (
        <p>
          <FaCircleNotch />
        </p>
      );
    } else {
      return restaurants.map((restaurant: Restaurant, i: number) => (
        <Restaurant key={i} {...restaurant} className={styles.restaurantItem} />
      ));
    }
  }

  return (
    <>
      <h3>Restaurantes</h3>
      <div className={styles.restaurantList}>{renderContent()}</div>
    </>
  );
}
