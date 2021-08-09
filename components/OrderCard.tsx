import React from 'react';
import { Card, Button, Typography } from '@supabase/ui';
import Image from 'next/image';

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
}: Props) => {
  return (
    <div>
      <Card
        className="h-full"
        cover={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-96 object-contain"
            src={image ? image : '/image.png'}
            alt={'product'}
          />
        }
      >
        <div className="flex justify-between items-center">
          <div>
            <p>Title: {title}</p>
            <p>SKU: {sku}</p>
            <p>Email: {customerEmail}</p>
          </div>
          <div>
            <p>Payable amount: Rs {payableAmount}</p>
            <p>Payment: {paymentDone}</p>
            <p>Delivery: {deliveryDone}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
