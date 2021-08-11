/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Button, Card as SupasbaseCard, Typography } from '@supabase/ui';
import { IListing } from '../types';
import { deleteListing } from '../pages/api/listings';
import { useRouter } from 'next/dist/client/router';

export const Card = ({
  listing,
  onDelete,
}: {
  listing: IListing;
  onDelete: () => null | void;
}) => {
  const [statusLoading, setStatusLoading] = useState<
    'IDLE' | 'LOADING' | 'ERROR'
  >('IDLE');

  const router = useRouter();

  const nestedRoute = router.pathname !== '/listings';

  return (
    <div
      className={!nestedRoute && 'cursor-pointer'}
      onClick={() => {
        if (!nestedRoute) {
          router.push(`/listings/${listing.id}`);
        }
      }}
    >
      <SupasbaseCard
        cover={[
          listing.images && listing.images?.length >= 1 ? (
            <img
              style={{ height: '300px', objectFit: 'contain' }}
              src={listing.images[0]}
              key={listing.images[0]}
              alt='Cover'
            />
          ) : null,
        ]}
      >
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col h-3 gap-2 justify-around items-start'>
              <h2 className='font-bold'>{listing.title}</h2>
              <h2>{listing.sku}</h2>
              <h2>{listing.stock} in stock</h2>
            </div>
            <div className='flex flex-col h-10 gap-2 justify-around items-start'>
              <h2>{listing.a_sales || 0 + listing.f_sales || 0} Sales</h2>
              <h2>
                Listed on: {listing.on_amazon && 'Amazon'}{' '}
                {listing.on_flipkart && 'Flipkart'}
              </h2>
            </div>
          </div>
          {/* <div className=''>
            <Button onClick={onDelete}></Button>
          </div> */}
        </div>
      </SupasbaseCard>
    </div>
  );
};
