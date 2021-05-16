import Details from './Details';
import CategoryProducts from './CategoryProducts';
import { useRouter } from 'next/router';
import getRestaurant from '../../services/getRestaurant';

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { restaurant, isLoading, isError } = getRestaurant(String(id));

  if (isError) {
    return <div className="error"></div>;
  } else if (isLoading) {
    return <div>Carregando...</div>;
  }

  console.log(restaurant);

  return (
    <>
      <Details {...restaurant} />
      {restaurant?.product_categories?.map((product_category, i: number) => (
        <CategoryProducts
          key={i}
          restaurant={restaurant}
          {...product_category}
        />
      ))}
    </>
  );
}
