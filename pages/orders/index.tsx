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

  const [amazon, setAmazon] = useState<boolean>(true);
  const [flipkart, setFlipkart] = useState<boolean>(true);

  useEffect(() => {
    console.log(amazon);
  }, [amazon]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">Orders</h1>
      <div className="flex gap-6 mb-4">
        <div className="flex justify-between w-20 items-center">
          <label>Amazon</label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => setAmazon((prevState) => !prevState)}
          />
        </div>
        <div className="flex justify-between w-20 items-center">
          <label>Flipkart</label>
          <input
            type="checkbox"
            defaultChecked={true}
            onChange={() => setFlipkart((prevState) => !prevState)}
          />
        </div>
      </div>
      <div className="mx-auto grid lg:grid-cols-2 flex-col gap-6">
        {orders &&
          orders
            .sort(function (x, y) {
              return x.created_at - y.created_at;
            })
            .filter((order) => {
              if (flipkart && amazon) {
                return true;
              } else if (flipkart && !amazon) {
                return order.platform === 'flipkart';
              } else if (amazon && !flipkart) {
                return order.platform === 'amazon';
              }
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
