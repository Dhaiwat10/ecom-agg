import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

type Props = {
  BarLabels?: string[];
  BarDataSets?: number[];
  LineLabels?: string[];
  LineDataSets?: number[];
};
export const BarChart: React.FunctionComponent<Props> = ({
  BarLabels,
  BarDataSets,
}: Props) => {
  const data = {
    labels: BarLabels,
    datasets: [
      {
        label: '#sales',
        data: BarDataSets,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index) {
              console.log(value, index);
              return BarLabels[index];
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <h1 className="font-bold text-3xl py-4">Sales by Product</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export const LineChart: React.FunctionComponent<Props> = ({
  LineLabels,
  LineDataSets,
}: Props) => {
  const data = {
    labels: LineLabels,
    datasets: [
      {
        label: '#sales',
        data: LineDataSets,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value, index) {
              console.log(value, index);
              return LineLabels[index];
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <h1 className="font-bold text-3xl pt-10">Sales by Date</h1>
      <Line data={data} options={options} />
    </div>
  );
};
