import React, { useState } from 'react';
import { Button, Input, Typography, Checkbox } from '@supabase/ui';
import { createOrder } from './api/orders';
import { IOrder } from '../types';
const NewOrder = ({}) => {
  const [orderData, setOrderData] = useState<IOrder>({
    listing_id: '',
    customer_email: '',
    shipping_to_pincode: '',
    qty: undefined,
    payment_done: false,
    delivery_done: false,
    created_at: (new Date()).toISOString()
  });

  const [orderState, setOrderState] = useState<string>('pending');

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const order: IOrder = {
      listing_id: orderData.listing_id,
      customer_email: orderData.customer_email,
      shipping_to_pincode: orderData.shipping_to_pincode,
      qty: orderData.qty,
      payment_done: orderData.payment_done,
      delivery_done: orderData.delivery_done,
      created_at: (new Date()).toISOString(),
    };
    setOrderState('pending');
    createOrder(order).then(() => {
      setOrderState('success');
    });
  };

  return (
    <div>
      <Typography.Text>New Order</Typography.Text>
      <form>
        <Input
          label='Listing ID'
          type='text'
          value={orderData.listing_id}
          onChange={(e) =>
            setOrderData({ ...orderData, listing_id: e.target.value })
          }
        />
        <Input
          label='Email'
          type='email'
          value={orderData.customer_email}
          onChange={(e) =>
            setOrderData({ ...orderData, customer_email: e.target.value })
          }
        />
        <Input
          label='Pincode'
          type='number'
          value={orderData.shipping_to_pincode}
          onChange={(e) =>
            setOrderData({ ...orderData, shipping_to_pincode: e.target.value })
          }
        />
        <Input
          label='Quantity'
          type='Number'
          value={orderData.qty}
          onChange={(e) =>
            setOrderData({ ...orderData, qty: Number(e.target.value) })
          }
        />
        <Checkbox
          label='Payment'
          onChange={(e) =>
            setOrderData({
              ...orderData,
              payment_done: e.target.checked,
            })
          }
        />
        <Checkbox
          label='Deliviery'
          onChange={(e) =>
            setOrderData({
              ...orderData,
              delivery_done: e.target.checked,
            })
          }
        />

        <Button size='large' onClick={onSubmit}>
          Create
        </Button>
      </form>
    </div>
  );
};

export default NewOrder;
