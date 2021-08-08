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
              <Typography.Text>
                {listing.created_by}
              </Typography.Text>
            </Typography.Text>
            <div className='w-16'>Price: {listing.price}</div>
          </div>
        }
        cover={[]}
      >
        <SupasbaseCard.Meta
          description={listing.description}
          title={listing.title}
        />
      </SupasbaseCard>
    </div>
  );
};
