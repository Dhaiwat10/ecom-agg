import { Button, Input } from '@supabase/ui';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { IListing } from '../types';
import { getListings, updateStock } from './api/listings';

const Index = ({ listings }: { listings: Array<IListing> }) => {
  const [selectedListing, setSelectedListing] = React.useState(0);
  const [newStock, setNewStock] = React.useState(null);
  const router = useRouter();

  const onSubmit = async () => {
    const { success, error } = await updateStock(
      listings[selectedListing].id,
      newStock
    );

    if (error) {
      console.error(error);
      return alert('Error');
    }

    if (success) {
      alert('Stock updated');
      return router.push('/stock');
    }
  };

  return (
    <div>
      <h1 className='text-4xl font-bold mb-6'>Update stock</h1>
      <select
        className='border-2 p-2 rounded'
        value={selectedListing}
        onChange={(e) => setSelectedListing(parseInt(e.target.value))}
      >
        {listings.map((listing: IListing, idx) => (
          <option key={listing.id} value={idx}>
            {listing.title}
          </option>
        ))}
      </select>
      {selectedListing !== null && (
        <div>
          <p className='my-4'>
            Current stock: {listings[selectedListing]?.stock || 'N/A'}
          </p>
          <Input
            label='New stock'
            type='number'
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
          <div className='mt-6 w-6/12'>
            <Button onClick={onSubmit}>Update</Button>
          </div>
        </div>
      )}
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
