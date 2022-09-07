import React from 'react';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { Logo } from '../components';

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null;
};

const Login: React.FC<Props> = ({ providers }) => {
  return (
    <main className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <div className="flex items-center justify-center mb-10 text-[#18D860]">
        <Logo className="h-28 w-28" />
        <div className="text-3xl font-bold">
          <h1 className="ml-4">Spotify</h1>
          <h1 className="ml-[3.25rem] mt-[-0.5rem]">Remote</h1>
        </div>
      </div>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-[#18D860] text-white p-4 rounded-full"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
          </div>
        ))}
    </main>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
};
