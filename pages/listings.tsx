import { Auth } from '@supabase/ui';
import React from 'react';
import { Card } from '../components/Card';
import { IListing } from '../types';
import { getListingImages, getListings } from './api/listings';

const Index = ({ listings }: { listings: Array<IListing> }) => {
  const { user } = Auth.useUser();

  return (
    <div>
      <div className='mx-auto grid lg:grid-cols-2 flex-col gap-6'>
        {listings
          // .filter((listing) => listing.created_by === user.email)
          .map((listing) => (
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

  for await (let listing of listings) {
    const images = await getListingImages(listing);
    listing.images = images;
  }
  return {
    props: {
      listings,
    },
  };
}

export default Index;
