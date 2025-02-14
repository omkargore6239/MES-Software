import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  // Sample data for Production Trends (Line Chart)
  const productionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Units Produced',
        data: [1200, 1900, 3000, 2500, 2000, 3000, 3500],
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // Sample data for Quality Metrics (Bar Chart)
  const qualityData = {
    labels: ['Defects', 'Rework', 'Scrap', 'Good Units'],
    datasets: [
      {
        label: 'Quality Metrics',
        data: [50, 30, 20, 2000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Production Trends',
      },
    },
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Production Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Production Trends Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Production Trends</h2>
          <Line data={productionData} options={chartOptions} />
        </div>

        {/* Quality Metrics Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quality Metrics</h2>
          <Bar data={qualityData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}