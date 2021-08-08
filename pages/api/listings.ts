import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getListings = async () => {
  const { data, error} = await supabase.from('listings').select('*');

  if(error) {
    return {
      success: false,
      error,
      listings: []
    }
  }
  return {
    success: true,
    error: null,
    listings: data
  }
};


export async function createListing(listing) {
  const {data, error} = await supabase.from('listings').insert([listing]);

  if(error){
    console.log('Error while creating listing: ', error)
  }
  if(data) {
    console.log('Listing created: ', data)
  }
  return {
    error,
    data
  }
}