import { createClient } from '@supabase/supabase-js';
import { IReview } from '../../types';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getReviews = async (
  listingId: string
): Promise<{
  success: boolean;
  error: any;
  reviews: Array<IReview>;
}> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('listing_id', listingId);

  if (error) {
    return {
      success: false,
      error,
      reviews: [],
    };
  }
  return {
    success: true,
    error: null,
    reviews: data,
  };
};
