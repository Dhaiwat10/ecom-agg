import React from 'react';
import { getOrders, getListingData } from './api/orders';
import { OrderCard } from '../components/OrderCard';
const Index = ({ orders }) => {
  return (
    <div className="flex flex-col gap-6">
      {orders &&
        orders.map(async (order, index) => {
          const { reqListings } = await getListingData(order.id);
          return (
            <OrderCard
              key={index}
              id={order.id}
              customerEmail={order.customer_email}
              shippingCode={order.shipping_to_pincode}
              qty={order.qty}
              title={reqListings[0].title}
              sku={reqListings[0].sku}
              payableAmount={order.payable_amount}
            />
          );
        })}
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
