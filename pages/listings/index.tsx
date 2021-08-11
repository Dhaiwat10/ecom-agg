import { useRouter } from 'next/dist/client/router';
import { Auth, Typography } from '@supabase/ui';
import Link from 'next/link';
import React from 'react';
import { Card } from '../../components/Card';
import { IListing } from '../../types';
import { deleteListing, getListingImages, getListings } from '../api/listings';

const Index = ({ listings }: { listings: Array<IListing> }) => {
  const { user } = Auth.useUser();
  const router = useRouter();

  const onDelete = async (listingId) => {
    const { data, error } = await deleteListing(listingId);

    if (!error && data) {
      // listings = [...listings.filter((listing) => listing.id !== listingId)];
      alert('Listing deleted successffully');
      router.reload();
    }
  };

  return (
    <div>
      <h1 className='text-4xl font-bold mb-6'>Listings</h1>
      <div className='flex gap-4'>
        <Link href='/csv' passHref>
          <Typography.Link href='/csv' target='_self'>
            Export inventory
          </Typography.Link>
        </Link>
        <Link href='/stock' passHref>
          <Typography.Link href='/stock' target='_self'>
            Update stock
          </Typography.Link>
        </Link>
      </div>

      <div className='mx-auto grid lg:grid-cols-2 flex-col gap-6 mt-6'>
        {listings
          // .filter((listing) => listing.created_by === user.email)
          .map((listing) => (
            <Card
              onDelete={() => onDelete(listing.id)}
              listing={listing}
              key={listing.id}
            />
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
