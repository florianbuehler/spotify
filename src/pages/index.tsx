import type { NextPage } from 'next';
import Head from 'next/head';
import { Center, Header, Sidebar } from '../components';

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div>
  );
};

export default Home;
