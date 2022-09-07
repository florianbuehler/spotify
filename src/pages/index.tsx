import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Header, Player, Playlist, Sidebar } from '../components';

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify Remote</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <Playlist />
      </main>
      <Player />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
};

export default Home;
