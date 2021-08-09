import React from 'react';
import { getOrders } from './api/orders';
import { OrderCard } from '../components/OrderCard';
const Index = ({ orders }) => {
  return (
    <div className='flex flex-col gap-6'>
      {orders &&
        orders.map((order, index) => (
          <OrderCard
            key={index}
            id={order.id}
            customerEmail={order.customer_email}
            shippingCode={order.shipping_to_pincode}
            qty={order.qty}
          />
        ))}
    </div>
  );
};

export async function getServerSideProps() {
  const { orders } = await getOrders();
  console.log(orders);
  return {
    props: {
      orders,
    },
  };
}

export default Index;
