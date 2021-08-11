import React, { useState } from 'react';
import { BarChart, LineChart } from '../components/Dashboard';
import { IListing, IOrder } from '../types';
import { getListings } from './api/listings';
import { getOrders } from './api/orders';
import { Divider } from '@supabase/ui';

function getSales(
  listingId: string,
  orders: Array<IOrder>,
  startDate: any,
  endDate: any
): { a: number; f: number } {
  const validOrders = orders.filter((order) => {
    return (
      listingId === order.listing_id &&
      new Date(order.created_at) >= new Date(startDate) &&
      new Date(order.created_at) <= new Date(endDate)
    );
  });
  const a = validOrders
    .filter((order) => order.platform === 'amazon')
    .reduce((acc, order) => acc + order.qty, 0);
  const f = validOrders
    .filter((order) => order.platform === 'flipkart')
    .reduce((acc, order) => acc + order.qty, 0);
  return { a, f };
}

export default function Home({
  barLabels,
  barDataSets,
  lineLabels,
  lineDataSets,
  listings,
  orders,
}) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [dates, setDates] = useState({ startDate: null, endDate: null });

  const salesData = getSales(
    selectedListing,
    orders,
    dates.startDate,
    dates.endDate
  );

  return (
    <div>
      <h1 className='text-4xl font-bold mb-6'>
        Sales count for individual listings
      </h1>
      <select
        className='border-2 p-2 rounded'
        value={selectedListing}
        onChange={(e) => setSelectedListing(e.target.value)}
      >
        <option>Choose a listing</option>
        {listings.map((listing: IListing) => (
          <option key={listing.id} value={listing.id}>
            {listing.title}
          </option>
        ))}
      </select>

      <div>
        <label className='my-2 block'>Start date</label>
        <input
          className='border-2 p-2 rounded'
          type='date'
          value={dates.startDate}
          onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
        />
      </div>

      <div>
        <label className='my-2 block'>End date</label>
        <input
          className='border-2 p-2 rounded'
          type='date'
          value={dates.endDate}
          onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
        />
      </div>
      {selectedListing && dates.startDate && dates.endDate && (
        <div className='my-4 text-2xl'>
          <p>
            Total sales in the period: <b>{salesData.a + salesData.f}</b>
            <br />
            From Amazon: <b>{salesData.a}</b>
            <br />
            From Flipkart: <b>{salesData.f}</b>
          </p>
        </div>
      )}
      <Divider />
      <BarChart BarLabels={barLabels} BarDataSets={barDataSets} />
      <LineChart LineLabels={lineLabels} LineDataSets={lineDataSets} />
    </div>
  );
}

export const getServerSideProps = async (): Promise<any> => {
  const { listings } = await getListings();
  const { orders } = await getOrders();
  let barLabels: string[] = [];
  let barDataSets: number[] = [];
  let lineLabels: string[] = [];
  let lineDataSets: number[] = [];
  listings.map((listing) => {
    barLabels.push(listing.title);
    barDataSets.push(listing.a_sales || 0 + listing.f_sales || 0);
  });
  orders.map((order) => {
    lineLabels.push('');
    lineDataSets.push(order.qty);
  });
  console.log('lineLabels', lineLabels);
  console.log('LineData', lineDataSets);
  console.log('labels:', barLabels);
  console.log('dataSets:', barDataSets);
  return {
    props: {
      barLabels,
      barDataSets,
      lineLabels,
      lineDataSets,
      listings,
      orders,
    },
  };
};
