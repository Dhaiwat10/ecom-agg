import { useEffect } from 'react';
import { getListings } from './api/listings';

export default function Home({ listings }) {
  useEffect(() => {
    console.log('listings: ', listings);
  }, [listings]);
  return <p className='text-4xl'>Working on Listings</p>;
}

export async function getServerSideProps(context) {
  const { listings, error } = await getListings();
  if (error) {
    console.log('error while fetching listing: ', error);
  }
  return {
    props: {
      listings,
    },
  };
}
