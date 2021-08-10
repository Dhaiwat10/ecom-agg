import { createClient } from '@supabase/supabase-js';
import { getListings } from './listings';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getOrders() {
  let { data: orders, error } = await supabase.from('orders').select('*');

  if (error) {
    return {
      success: false,
      error,
      orders: [],
    };
  }
  return {
    success: true,
    orders,
    error: null,
  };
}

export async function createOrder(order, listingSales?) {
  const { data, error } = await supabase.from('orders').insert([order]);

  await supabase
    .from('listings')
    .update({ sales: listingSales + 1 })
    .eq('id', order.listing_id);
  return { error, data };
}

export async function getListingData(listingID: string) {
  const { listings, error } = await getListings();
  if (error) {
    return {
      data: null,
      error,
    };
  }
  const reqListings = listings.filter((listing) => listing.id === listingID);

  return {
    data: reqListings[0],
    error,
  };
}

export const updatePaymentStatus = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ payment_done: true })
    .eq('id', orderId);
  return { error, data };
};

export const updateDeliveryStatus = async (orderId) => {
  const { data, error } = await supabase.from('orders').update({ delivery_done: true }).eq('id', orderId);
  return { error, data };
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const output = await getOrders();
    if (!output.success) {
      return res.status(500).json(output);
    }
    res.status(200).json(output);
  }

  if (req.method === 'POST') {
    const output = await createOrder(req.body);
    if (output.error) {
      return res.status(500).json(output);
    }
    res.status(200).json(output);
  }
}
