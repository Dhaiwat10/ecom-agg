import React from 'react';
import { Card, Button, Typography } from '@supabase/ui';

type Props = {
  id: string;
  customerEmail: string;
  shippingCode: number;
  qty: number;
  paymentDone?: boolean;
  deliveryDone?: boolean;
};
export const OrderCard = ({
  id,
  customerEmail,
  shippingCode,
  qty,
  paymentDone,
  deliveryDone,
}: Props) => {
  return (
    <div>
      <Card title={id}>
        <div>
          <p>Email: {customerEmail}</p>
          <p>Pincode: {shippingCode}</p>
          <p>Quantity: {qty}</p>
        </div>
      </Card>
    </div>
  );
};
