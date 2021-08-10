import { Button } from '@supabase/ui';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { OrderCard } from '../../../components';
import { getListingImages } from '../../api/listings';
import {
  getListingData,
  getOrders,
  updateDeliveryStatus,
  updatePaymentStatus,
} from '../../api/orders';

const Index = ({ orders }) => {
  const router = useRouter();
  const id = router.query.id;

  return (
    <div>
      {orders
        .filter((order) => order.id === id)
        .map((order) => (
          <div key={order.id}>
            {console.log('order: ', order.delivery_done)}
            <OrderCard
              image={order.image}
              id={order.id}
              customerEmail={order.customer_email}
              shippingCode={order.shipping_to_pincode}
              qty={order.qty}
              title={order.listingData.title}
              sku={order.listingData.sku}
              paymentDone={order.payment_done}
              deliveryDone={order.delivery_done}
              payableAmount={order.payable_amount}
            />
            <div>
              <p className='my-2 mt-5'>Order id: {order.id}</p>
              <p className='my-2'>Title: {order.listingData.title}</p>
              <p className='my-2'>Customer email: {order.customer_email}</p>
              <p className='my-2'>Amount: {order.payable_amount}</p>
              <p className='my-2'>Shipping code: {order.shipping_to_pincode}</p>
              <p className='my-2'>Customer email: {order.customer_email}</p>

              <div className='flex items-center justify-between mt-4'>
                <div>
                  Delivery status:{' '}
                  {order.delivery_done ? 'Delivered' : 'Pending'}
                </div>
                {!order.delivery_done && (
                  <Button
                    onClick={async () => {
                      const { data } = await updateDeliveryStatus(order.id); 
                      if(data) {
                        order.delivery_done = true;
                        alert('Order delivery status updated');
                        router.reload()
                      }
                    }}
                  >
                    Mark as delivered
                  </Button>
                )}
              </div>
              <div className='flex items-center justify-between mt-4'>
                <div>
                  Payment status:{' '}
                  {order.payment_done ? 'Successful' : 'Pending'}
                </div>
                {!order.payment_done && (
                  <Button
                    onClick={async () => {
                      const { data } = await updatePaymentStatus(order.id); 
                      if(data) {
                        order.payment_done = true;
                        alert('Order payment status updated');
                        router.reload()
                      }
                    }}
                  >
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
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
