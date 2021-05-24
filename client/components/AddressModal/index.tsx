import { AddressForm } from './AddressForm';

export default function AddressModal() {
  return (
    <>
      <div className="overlay">
        <div className="modal">
          <header>
            <h4>Endereço de entrega</h4>
          </header>
          <div>
            <AddressForm />
          </div>
        </div>
      </div>
    </>
  );
}
