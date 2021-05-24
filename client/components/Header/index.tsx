// import Image from 'next/image';
import Link from 'next/link';
import { FaCrosshairs, FaShoppingBag } from 'react-icons/fa';
import { useModal } from '../../hooks/useModal';
import AddressModal from '../AddressModal';
import CartModal from '../CartModal';
import SearchBox from '../SearchBox';

export default function Header() {
  const { addressModal, cartModal, setAddressModal, setCartModal } = useModal();

  return (
    <>
      <nav>
        <Link href="/">
          <a>
            <h2>ElFood</h2>
          </a>
        </Link>
        <ul>
          <li>
            <Link href="/restaurants">
              <a>Restaurantes</a>
            </Link>
          </li>
          <li>
            <button onClick={() => setCartModal(!cartModal)}>
              <FaShoppingBag /> Carrinho
            </button>
          </li>
          <li>
            <button onClick={() => setAddressModal(!addressModal)}>
              <FaCrosshairs /> Endereço
            </button>
          </li>
        </ul>
        <SearchBox />
      </nav>
      {addressModal && <AddressModal />}
      {cartModal && <CartModal />}
    </>
  );
}
