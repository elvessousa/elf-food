import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/restaurants?q=${query}`);
  }

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <input
        type="text"
        className="search-input"
        placeholder="Busca"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
