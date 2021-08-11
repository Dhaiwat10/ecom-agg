import React, { useState } from 'react';
import { Card, Button, Typography, Checkbox } from '@supabase/ui';
import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';

type Props = {
  id: string;
  customerEmail: string;
  shippingCode: number;
  qty: number;
  payableAmount: number;
  paymentDone?: boolean;
  deliveryDone?: boolean;
  image?: any;
  sku: string;
  title: string;
  timestamp: string;
  platform?: string;
};
export const OrderCard = ({
  id,
  customerEmail,
  shippingCode,
  qty,
  payableAmount,
  paymentDone,
  deliveryDone,
  sku,
  image,
  title,
  timestamp,
  platform,
}: Props) => {
  const router = useRouter();
  const { pathname } = router;
  const ordersRoute = pathname === '/orders' ? true : false;

  return (
    <div>
      <Card
        className='h-full'
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            onClick={() => {
              if (pathname === '/orders') {
                router.push('/orders/' + id);
              }
            }}
            className={`h-96 object-contain ${
              pathname === '/orders' && 'cursor-pointer'
            }`}
            src={image ? image : '/image.png'}
            alt={'product'}
          />
        }
      >
        {ordersRoute && (
          <div className='flex justify-between items-center'>
            <div>
              <p>Title: {title}</p>
              <p>SKU: {sku}</p>
              <p>Date: {new Date(timestamp).toLocaleDateString()}</p>
              {/* <p>Email: {customerEmail}</p> */}
            </div>
            <div>
              <p>Payable amount: Rs {payableAmount}</p>
              <p>
                Platform: <b>{platform}</b>
              </p>
              {/* <p>Payment: {paymentDone}</p>
              <p>Delivery: {deliveryDone}</p> */}
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};
