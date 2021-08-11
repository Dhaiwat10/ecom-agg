import { createClient } from '@supabase/supabase-js';
import { IListing } from '../../types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const updateStock = async (
  listingId: string,
  newStock: number
): Promise<{
  success: boolean;
  error: any;
}> => {
  if (newStock < 0) {
    return {
      success: false,
      error: 'Stock cannot be negative',
    };
  }

  const { error } = await supabase
    .from('listings')
    .update({ stock: newStock })
    .eq('id', listingId);

  if (error) {
    return {
      success: false,
      error,
    };
  }
  return {
    success: true,
    error: null,
  };
};

export const getListings = async (): Promise<{
  success: boolean;
  error: any;
  listings: Array<IListing>;
}> => {
  const { data, error } = await supabase.from('listings').select('*');

  if (error) {
    return {
      success: false,
      error,
      listings: [],
    };
  }
  return {
    success: true,
    error: null,
    listings: data,
  };
};

export const getListing = async (
  listingId: string
): Promise<{
  success: boolean;
  error: any;
  listing: IListing;
}> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', listingId);

  if (error) {
    return {
      success: false,
      error,
      listing: null,
    };
  }
  return {
    success: true,
    error: null,
    listing: data[0],
  };
};

export async function getListingImages(listing) {
  const fileURLS = [];

  for await (let fileName of listing.image_file_names) {
    const { publicURL } = supabase.storage
      .from('listing-images')
      .getPublicUrl(`${listing.id}/${fileName}`);

    if (publicURL) {
      fileURLS.push(publicURL);
    }
  }

  return fileURLS;
}

export async function createListing(listing: IListing) {
  const { data, error } = await supabase.from('listings').insert([listing]);

  if (error) {
    console.log('Error while creating listing: ', error);
  }
  if (data) {
    console.log('Listing created: ', data);
  }
  return {
    error,
    data,
  };
}

export async function deleteListing(listingId) {
  const { data, error } = await supabase
    .from('listings')
    .delete()
    .match({ id: listingId });
  return {
    data,
    error,
  };
}

export async function uploadImage(file, listingId, idx) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${idx}.${fileExt}`;
  const filePath = `${listingId}/${fileName}`;

  const { data, error: uploadError } = await supabase.storage
    .from('listing-images')
    .upload(filePath, file);

  if (uploadError) {
    console.log('Error while uploading image: ', uploadError);
    return false;
  }
  console.log('Images uploaded successfully: ', data);
  return true;
}
