import React from 'react';
import { Card } from '../components/Card';
import { getListings } from './api/listings';

const Index = ({ listings }) => {
  return (
    <div>
      <div className='mx-auto grid lg:grid-cols-2 flex-col gap-6'>
        {listings.map((listing) => (
          <Card listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

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

export default Index;
