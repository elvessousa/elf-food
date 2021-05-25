import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import Header from '../components/Header';
import { ModalProvider } from '../contexts/ModalContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Head>
        <title>Elf Food</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <RecoilRoot>
        <Header />
        <main className="container">
          <Component {...pageProps} />
        </main>
        <footer>
          <p>Este aplicativo foi criado no projeto OneBitFood V2.</p>
        </footer>
      </RecoilRoot>
    </ModalProvider>
  );
}

export default MyApp;
