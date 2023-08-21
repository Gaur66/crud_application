import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraph: React.FC = () => {
  const fetchGraphData = () => axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  const { data: graphData } = useQuery('graphData', fetchGraphData);

  const dates = Object.keys(graphData?.data.cases || {});
  const cases = Object.values(graphData?.data.cases || {});

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Cases',
        data: cases,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const isMobile = window.innerWidth <= 640; // Adjust the breakpoint as needed
  const chartHeight = isMobile ? '240px' : '400px'; // Adjust heights as needed

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Line graph showing the cases fluctuations',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Cases',
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto" style={{ height: chartHeight }}>
      {/* Responsive container */}
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
