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

export async function createOrder(order) {
  const { data, error } = await supabase.from('orders').insert([order]);
  return { error, data };
}

export async function getListingData(listingID: string) {
  const { listings, error } = await getListings();
  if (error) {
    return {
      error,
    };
  }
  const reqListings = listings.filter((listing) => listing.id === listingID);

  return {
    reqListings,
    error,
  };
}

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
