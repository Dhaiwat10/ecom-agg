import { Button } from '@supabase/ui';
import { parse } from 'json2csv';
import { getListings } from './api/listings';

const Index = ({ json }) => {
  const parsed = parse(json);

  return (
    <div>
      <h1 className='text-4xl mb-6 font-bold'>Export inventory as CSV</h1>
      <pre className='w-full h-7/12 overflow-x-scroll overflow-y-scroll p-6 border-2'>
        {parsed}
      </pre>
      <Button
        onClick={() => navigator.clipboard.writeText(parsed)}
        className='mt-6'
      >
        Copy to clipboard
      </Button>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { listings, error } = await getListings();
  if (error) {
    console.log('error while fetching listing: ', error);
  }

  return {
    props: {
      json: listings,
    },
  };
}

export default Index;
