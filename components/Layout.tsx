import Head from 'next/head';

export const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ecommerce Aggregator</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='w-11/12 sm:w-9/12 mx-auto'>
        <div style={{ height: '85vh' }} className='py-12 overflow-y-auto'>
          {children}
        </div>
      </main>
    </>
  );
};
