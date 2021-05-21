import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import addressState from '../../store/atoms/addressAtom';
import { AddressForm } from './AddressForm';

type AddressModalProps = {
  showModal?: boolean;
  onShow?: (showModal: boolean) => void;
};

export default function AddressModal({ showModal, onShow }: AddressModalProps) {
  const [show, setShow] = useState(false);
  const [address, _setAddress] = useRecoilState(addressState);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/' && address.city == '') {
      setShow(true);
    } else if (address.city !== '' && showModal) {
      setShow(true);
    }
  }, [router]);

  return (
    <>
      {show && (
        <div className="overlay">
          <div className="modal">
            <header>
              <h4>Endereço de entrega</h4>
            </header>
            <div>
              <AddressForm show={setShow} onShow={onShow} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
