import { Divider } from '@supabase/ui';
import { Card } from '../../components/Card';
import { IReview } from '../../types';
import { getListing } from '../api/listings';
import { getReviews } from '../api/reviews';

function calcAvg(reviews) {
  return (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  );
}

const Index = ({ listing, reviews }) => {
  return (
    <div className='flex flex-col gap-4'>
      <Card listing={listing} onDelete={() => {}} />
      <Divider />
      <h1 className='text-3xl font-bold'>Reviews</h1>
      <p>
        Average rating: <b className='text-xl'>{calcAvg(reviews)}</b>/5
      </p>
      {reviews.map((review: IReview) => (
        <div key={review.id} className='border-2 p-4 rounded'>
          <h1>Rating: {review.rating}/5</h1>
          <p>{review.content}</p>
          <div className='flex w-full'>
            <p style={{ color: '#ccc' }}>by {review.created_by}</p>
            <p className='ml-auto mr-0 capitalize'>from {review.platform}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { listing, error } = await getListing(id);
  if (error) {
    console.log(error);
  }

  const { reviews } = await getReviews(id);

  return {
    props: {
      listing,
      reviews,
    },
  };
}

export default Index;
