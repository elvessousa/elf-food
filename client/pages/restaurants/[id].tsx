import { GetStaticPaths, GetStaticProps } from 'next';
import RestaurantDetails from '../../components/RestaurantDetails';

type Restaurant = {
  id: number;
};

export default function RestaurantPage() {
  return <RestaurantDetails />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.apiUrl}/api/restaurants`);
  const restaurant = await res.json();

  const paths = restaurant.map((restaurant: Restaurant) => ({
    params: { id: restaurant.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${process.env.apiUrl}/api/restaurants/${params.id}`);
  const restaurant = await res.json();

  return {
    props: { restaurant },
    revalidate: 120,
  };
};
