// import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaCrosshairs, FaShoppingBag } from 'react-icons/fa';
import AddressModal from '../AddressModal';
import CartModal from '../CartModal';
import SearchBox from '../SearchBox';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  function onShow(show: boolean) {
    setShowModal(show);
  }

  function onShowCart(show: boolean) {
    setShowCart(show);
  }

  return (
    <>
      <nav>
        <Link href="/">
          <a>
            <h2>ElFood</h2>
          </a>
        </Link>
        <SearchBox />
        <ul>
          <li>
            <Link href="/restaurants">
              <a>Restaurants</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a onClick={() => setShowCart(true)}>
                <FaShoppingBag />
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a onClick={() => setShowModal(true)}>
                <FaCrosshairs />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <AddressModal showModal={showModal} onShow={onShow} />
      <CartModal showModal={showCart} onShow={onShowCart} />
    </>
  );
}
