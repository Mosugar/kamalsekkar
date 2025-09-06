// pages/index.jsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Header,
  Hero,
  Preloader
} from '../components';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Kamal Sekkar - Professional Photographer & Cinematographer</title>
        <meta name="description" content="Kamal Sekkar - Professional Photographer & Cinematographer with 10+ years of experience. Specialized in Fashion, Food, Portraits, Music Videos & Commercials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Preloader />}

      <div className={`main-container ${loading ? 'hidden' : 'block'}`}>
        <Header />
        <Hero />
        {/* Other components will be added later */}
      </div>
    </>
  );
}