import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { Auth, Typography } from '@supabase/ui';
import { createClient } from '@supabase/supabase-js';
import { Layout, SupabaseContext } from '../components';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Container = ({ children, Component, pageProps }) => {
  const { user } = Auth.useUser();

  if (user) {
    return <Component {...pageProps} />;
  }
  if (!user) {
    return <>{children}</>;
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <SupabaseContext.Provider value={supabase}>
        <Layout>
          <Container Component={Component} pageProps={pageProps}>
            <div className='justify-center text-center py-10'>
              <h1 className='text-4xl font-bold mx-auto inline-block'>
                eCommerce aggregator 🪑
              </h1>
              <br />
              <Typography.Text type='secondary'>
                Helping online sellers manage their businesses easily.
              </Typography.Text>
            </div>

            <div className='lg:w-6/12 xl:w-6/12 mx-auto'>
              <Auth supabaseClient={supabase} />
            </div>
          </Container>
        </Layout>
      </SupabaseContext.Provider>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
