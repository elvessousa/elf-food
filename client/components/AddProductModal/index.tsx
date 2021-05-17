import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import addressState from '../../store/atoms/addressAtom';

type AddProductModalProps = {
  showModal: boolean;
  restaurant: Object;
};

export default function AddProductModal({ showModal }: AddProductModalProps) {
  const [show, setShow] = useState(false);
  const [address, _setAddress] = useRecoilState(addressState);
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/' && address.city == '') {
      setShow(true);
    }
  }, [router]);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <>
      {show && (
        <div className="overlay" onClick={() => setShow(false)}>
          <div className="modal">
            <header>
              <h4>Adicionar produto</h4>
            </header>
            <div>Produteum</div>
          </div>
        </div>
      )}
    </>
  );
}
