import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaCircleNotch } from 'react-icons/fa';
import { Category } from './Category';
import slickSettings from './slick-settings';
import getCategories from '../../services/getCategories';

type CategoryItem = {
  id: number;
  title: string;
  image_url: string;
};

export function Categories() {
  const { categories, isLoading, isError } = getCategories();

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
      return categories.map((category: CategoryItem, i: number) => (
        <Category key={i} {...category} />
      ));
    }
  }

  return (
    <>
      <h3>Categorias</h3>
      <section className="categories">
        <Slider {...slickSettings}>{renderContent()}</Slider>
      </section>
    </>
  );
}
