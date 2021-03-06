import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useModal } from '../../hooks/useModal';
import getAvailableCities from '../../services/getAvailableCities';
import addressState from '../../store/atoms/addressAtom';

export function AddressForm() {
  const { setAddressModal } = useModal();
  const { available_cities, isLoading, isError } = getAvailableCities();
  const [address, setAddress] = useRecoilState(addressState);
  const [cityChanged, setCityChanged] = useState(false);
  const router = useRouter();

  if (isError) {
    return <div className="error"></div>;
  } else if (isLoading) {
    return <div>Carregando...</div>;
  }

  const updateAddress = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name == 'city') {
      setCityChanged(true);
    }
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const confirmAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cityChanged) {
      router.push('/restaurants');
    }
    setAddressModal(false);
  };

  return (
    <form className="form" onSubmit={(e) => confirmAddress(e)}>
      <fieldset>
        <label>Sua cidade</label>
        <select
          required
          onChange={updateAddress}
          value={address.city}
          name="city"
        >
          {address.city == '' && <option key={0}>Escolher cidade</option>}
          {available_cities.map((state: string, i: number) => {
            return (
              <option key={i} value={state}>
                {state}
              </option>
            );
          })}
        </select>
      </fieldset>
      {address.city !== '' && (
        <fieldset>
          <div>
            <label>Bairro</label>
            <input
              type="text"
              required
              placeholder="Bairro"
              onChange={updateAddress}
              value={address.neighborhood}
              name="neighborhood"
            />
          </div>
          <div>
            <label>Logradouro</label>
            <input
              required
              type="text"
              placeholder="Rua/Avenida/Alameda"
              onChange={updateAddress}
              value={address.street}
              name="street"
            />
          </div>
          <div>
            <label>N??mero</label>
            <input
              required
              type="text"
              placeholder="N??mero"
              onChange={updateAddress}
              value={address.number}
              name="number"
            />
          </div>
          <div>
            <label>Complemento</label>
            <input
              type="text"
              placeholder="Complemento"
              onChange={updateAddress}
              value={address.complement}
              name="complement"
            />
          </div>
          <div>
            <div className="text-center">
              <button type="submit">Confirmar endere??o</button>
            </div>
          </div>
        </fieldset>
      )}
    </form>
  );
}
