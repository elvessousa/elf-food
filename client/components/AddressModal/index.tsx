import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import addressState from '../../store/atoms/addressAtom';
import { AddressForm } from './AddressForm';

export default function AddressModal() {
  const [show, setShow] = useState(false);
  const [address, _setAddress] = useRecoilState(addressState);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/' && address.city == '') {
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
              <AddressForm show={setShow} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
