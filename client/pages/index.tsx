import Link from 'next/link';
import { FaCrosshairs } from 'react-icons/fa';

import TypeWriter from '../components/Typewriter';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <section className={styles.hero}>
      <h1>
        <TypeWriter text="Comida saúdavel e deliciosa direto na sua casa" />
      </h1>
      <Link href="/">
        <button className="call-button">
          <FaCrosshairs />
          <span>Buscar</span>
        </button>
      </Link>
    </section>
  );
}
