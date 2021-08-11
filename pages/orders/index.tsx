import React, { useEffect, useState } from 'react';
import { getOrders, getListingData } from '../api/orders';
import { OrderCard } from '../../components/OrderCard';
import { getListingImages } from '../api/listings';

const Index = ({ orders }) => {
  useEffect(() => {
    Promise.all(
      orders.map(async (order) => {
        const { data, error } = await getListingData(order.listing_id);

        if (!error && data) {
          order.listingData = data;
        }
      })
    );
  }, [orders]);

  return (
    <>
      <h1 className='text-4xl font-bold mb-6'>Orders</h1>
      <div className='mx-auto grid lg:grid-cols-2 flex-col gap-6'>
        {orders &&
          orders
            .sort(function (x, y) {
              return x.created_at - y.created_at;
            })
            .map((order, index) => {
              console.log('order from orders.tsx: ', order);
              return (
                <div key={index}>
                  <OrderCard
                    image={order.image}
                    id={order.id}
                    customerEmail={order.customer_email}
                    shippingCode={order.shipping_to_pincode}
                    qty={order.qty}
                    title={order.listingData.title}
                    sku={order.listingData.sku}
                    payableAmount={order.payable_amount}
                    timestamp={order.created_at}
                    platform={order.platform}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { orders } = await getOrders();

  for await (let order of orders) {
    const { data } = await getListingData(order.listing_id);
    const images = await getListingImages(data);
    if (images[0] === undefined) {
      order.image = '';
    } else {
      order.image = images[0];
    }

    console.log('images: ', order.image);
    order.listingData = data;
  }

  return {
    props: {
      orders,
    },
  };
}

export default Index;
