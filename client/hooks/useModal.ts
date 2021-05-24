import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ModalContext } from '../contexts/ModalContext';
import addressState from '../store/atoms/addressAtom';

export function useModal() {
  const router = useRouter();
  const [address] = useRecoilState(addressState);
  const {
    addressModal,
    setAddressModal,
    cartModal,
    setCartModal,
    productModal,
    setProductModal,
  } = useContext(ModalContext);

  useEffect(() => {
    if (router.asPath !== '/' && address.city == '') {
      setAddressModal(true);
    } else if (address.city !== '' && addressModal) {
      setAddressModal(true);
    }
  }, [router]);

  return {
    addressModal,
    setAddressModal,
    cartModal,
    setCartModal,
    productModal,
    setProductModal,
  };
}
