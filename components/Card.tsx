/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Card as SupasbaseCard, Typography } from '@supabase/ui';
import { IListing } from '../types';

export const Card = ({ listing }: { listing: IListing }) => {
  const [statusLoading, setStatusLoading] = useState<
    'IDLE' | 'LOADING' | 'ERROR'
  >('IDLE');

  return (
    <div>
      <SupasbaseCard
        cover={[
          listing.images && listing.images?.length >= 1 ? (
            <img
              className={''}
              style={{ height: '300px', objectFit: 'contain' }}
              src={listing.images[0]}
              key={listing.images[0]}
              alt="Cover"
            />
          ) : null,
        ]}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col h-3 gap-2 justify-around items-start">
            <h2 className="font-bold">{listing.title}</h2>
            <h2>{listing.sku}</h2>
          </div>
          <div className="flex flex-col h-3 gap-2 justify-around items-start">
            <h2>Rs {listing.price}</h2>
            <h2>10 Sales</h2>
          </div>
        </div>
      </SupasbaseCard>
    </div>
  );
};
