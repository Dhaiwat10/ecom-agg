import React, { useState } from 'react';
import { BarChart, LineChart } from '../components/Dashboard';
import { getListings } from './api/listings';
import { getOrders } from './api/orders';

export default function Home({
  barLabels,
  barDataSets,
  lineLabels,
  lineDataSets,
}) {
  return (
    <div>
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
    barDataSets.push(listing.sales);
  });
  orders.map((order) => {
    lineLabels.push(order.created_at.split('T')[0]);
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
    },
  };
};
