import React from 'react';
import { GetServerSideProps } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider> | null;
};

const Login: React.FC<Props> = ({ providers }) => {
  return (
    <main className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="spotify" />
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
