import { createContext, ReactNode, useState } from 'react';

type ModalContextData = {
  addressModal: boolean;
  cartModal: boolean;
  productModal: boolean;
  setAddressModal: (showModal: boolean) => void;
  setCartModal: (showModal: boolean) => void;
  setProductModal: (showModal: boolean) => void;
};

type ModalContextProps = {
  children: ReactNode;
};

export const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: ModalContextProps) {
  const [addressModal, setAddressModal] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  const [productModal, setProductModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        addressModal,
        cartModal,
        productModal,
        setAddressModal,
        setCartModal,
        setProductModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
