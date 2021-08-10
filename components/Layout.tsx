import { Auth, Button, Typography } from '@supabase/ui';
import Head from 'next/head';
import { useContext } from 'react';
import { SupabaseContext } from './SupabaseContext';
import NextLink from 'next/link';

interface Route {
  path: string;
  label: string;
}

const routes: Array<Route> = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/listings',
    label: 'Listings',
  },
  {
    path: '/orders',
    label: 'Orders',
  },
  {
    path: '/new-listing',
    label: 'Create Listing',
  },
  // {
  //   path: '/new-order',
  //   label: 'Create Order',
  // },
];

const TopBar = () => {
  const { user } = Auth.useUser();
  const supabaseClient = useContext(SupabaseContext);

  return (
    <div className='flex items-center pt-10'>
      <div className='flex gap-4 sm:gap-6'>
        {routes.map((route) => (
          <NextLink key={route.path} href={route.path}>
            <Typography.Link href={route.path} target='_self'>
              {route.label}
            </Typography.Link>
          </NextLink>
        ))}
        <Typography.Link
          href='https://github.com/dhaiwat10/ecom-agg'
          target='_blank'
          style={{ color: '#bbb' }}
        >
          Source
        </Typography.Link>
      </div>

      {user && (
        <div className='flex items-center ml-auto mr-0 gap-4'>
          <Button
            style={{ marginLeft: 'auto', marginRight: 0 }}
            onClick={() => supabaseClient.auth.signOut()}
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
};

export const Layout = ({ children }) => {
  const { user } = Auth.useUser();

  return (
    <>
      <Head>
        <title>Ecommerce Aggregator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto px-64'>
        {user && (
          <>
            <TopBar />
          </>
        )}
        <div className='py-10'>{children}</div>
      </main>
    </>
  );
};
