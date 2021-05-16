// import Image from 'next/image';
import Link from 'next/link';
import SearchBox from '../SearchBox';

export default function Header() {
  return (
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
            <a>Restaurantes</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
