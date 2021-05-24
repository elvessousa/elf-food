import Details from './Details';
import CategoryProducts from './CategoryProducts';
import { useRouter } from 'next/router';
import getRestaurant from '../../services/getRestaurant';

type CategoryProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

type ProductCategory = {
  title: string;
  restaurant: Object;
  products: CategoryProductItem[];
};

export default function RestaurantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { restaurant, isLoading, isError } = getRestaurant(String(id));

  if (isError) {
    return <div className="error"></div>;
  } else if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Details {...restaurant} />
      {restaurant?.product_categories?.map(
        (product_category: ProductCategory, i: number) => (
          <CategoryProducts
            key={i}
            restaurant={restaurant}
            {...product_category}
          />
        )
      )}
    </>
  );
}
