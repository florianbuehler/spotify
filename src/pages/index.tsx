import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session
    }
  };
};

export default Home;
