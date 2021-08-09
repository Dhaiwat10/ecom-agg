import React from 'react';
import { Card, Button, Typography } from '@supabase/ui';

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
  title,
}: Props) => {
  return (
    <div>
      <Card title={id}>
        <div className="flex">
          <div>
            <p>Title: {title}</p>
            <p>SKU: {sku}</p>
            <p>Email: {customerEmail}</p>
          </div>
          <div>
            <p>Rs {payableAmount}</p>
            <p>Payment: {paymentDone}</p>
            <p>Delivery: {deliveryDone}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
