/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Card as SupasbaseCard, Typography } from '@supabase/ui';

export const Card = ({ listing }) => {
  const [statusLoading, setStatusLoading] = useState<
    'IDLE' | 'LOADING' | 'ERROR'
  >('IDLE');

  return (
    <div>
      <SupasbaseCard
        // @ts-ignore
        title={
          <div className='flex w-full justify-between items-center'>
            <Typography.Text type='secondary'>
              Created by&nbsp;
              <Typography.Text>{listing.created_by}</Typography.Text>
            </Typography.Text>
            <div className='w-16'>Price: {listing.price}</div>
          </div>
        }
        cover={[
          listing.image_file_names && listing.image_file_names?.length === 1 ? (
            <img
              className={''}
              style={{ height: '300px', objectFit: 'contain' }}
              src={listing.image_file_names[0]}
              key={listing.image_file_names[0]}
              alt='Cover'
            />
          ) : null,
        ]}
      >
        <SupasbaseCard.Meta
          description={listing.description}
          title={listing.title}
        />
      </SupasbaseCard>
    </div>
  );
};
