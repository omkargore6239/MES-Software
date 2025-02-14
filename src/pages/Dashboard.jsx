import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  FaCog,
  FaChartLine,
  FaTachometerAlt,
  FaExclamationTriangle,
  FaBox,
  FaClipboardList,
  FaStopwatch,
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // Circular progress values
  const oee = 85;
  const availability = 92;
  const performance = 75;
  const quality = 88;

  // Chart data for machine status
  const machineStatusData = {
    labels: ['Stopping Time', 'Target Time', 'Over Time'],
    datasets: [{
      data: [2.15, 4.22, 1.5],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
    }]
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - 6 Cards */}
        <div className="space-y-6">
          {/* Machine Details */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCog className="mr-2 text-blue-500" /> E81 MACHINE
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-semibold">MX-2000</span>
              </div>
              <div className="flex justify-between">
                <span>Code:</span>
                <span className="font-semibold">E81-002</span>
              </div>
              <div className="flex justify-between">
                <span>Group:</span>
                <span className="font-semibold">Cutting</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="bg-green-100 text-green-800 px-2 rounded">Running</span>
              </div>
            </div>
          </div>

          {/* Shift Details */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaStopwatch className="mr-2 text-purple-500" /> SOME SHIFT IN THE MANUFACTURED
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">17 Days</div>
              <div className="text-2xl">03:34:57</div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaChartLine className="mr-2 text-green-500" /> PERFORMANCE
            </h3>
            <div className="text-center text-4xl font-bold text-blue-600">60.42%</div>
          </div>

          {/* OEE */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaTachometerAlt className="mr-2 text-yellow-500" /> OEE
            </h3>
            <div className="flex justify-center">
              <CircularProgressbar
                value={oee}
                text={`${oee}%`}
                styles={buildStyles({
                  pathColor: '#3B82F6',
                  textColor: '#1E293B',
                  trailColor: '#F3F4F6',
                })}
                className="w-32 h-32"
              />
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-500" /> AVAILABILITY
            </h3>
            <div className="flex justify-center">
              <CircularProgressbar
                value={availability}
                text={`${availability}%`}
                styles={buildStyles({
                  pathColor: '#10B981',
                  textColor: '#1E293B',
                  trailColor: '#F3F4F6',
                })}
                className="w-32 h-32"
              />
            </div>
          </div>

          {/* Quality */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaClipboardList className="mr-2 text-indigo-500" /> QUALITY
            </h3>
            <div className="flex justify-center">
              <CircularProgressbar
                value={quality}
                text={`${quality}%`}
                styles={buildStyles({
                  pathColor: '#F59E0B',
                  textColor: '#1E293B',
                  trailColor: '#F3F4F6',
                })}
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>

        {/* Right Column - 7 Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Machine Status */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaCog className="mr-2 text-blue-500" /> 684 MACHINE STATUS
            </h2>
            <div className="h-48">
              <Bar 
                data={machineStatusData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false }
                  }
                }}
              />
            </div>
          </div>

          {/* Shift Speed */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaTachometerAlt className="mr-2 text-purple-500" /> SHIFT SPEED
            </h3>
            <div className="text-center text-4xl font-bold">685.955</div>
            <div className="text-center">685.955</div>
          </div>

          {/* Stoppage/Running */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaStopwatch className="mr-2 text-green-500" /> STOPPAGE/RUNNING TIME
            </h3>
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl">02:15:00</div>
                <div className="text-sm">Stopped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">04:22:00</div>
                <div className="text-sm">Running</div>
              </div>
            </div>
          </div>

          {/* Top Stoppage */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-500" /> SPIRIT TOP 5 STOPPAGE
            </h3>
            <ul className="space-y-2">
              {['Machine Failure', 'Absolute Change', 'Delivery to the Operator', 
                'Operator Control', 'Other'].map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="bg-gray-100 px-2 rounded">+</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Quantity */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaBox className="mr-2 text-yellow-500" /> PRODUCTION QUANTITY
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">70</div>
                <div className="text-sm">Completed Production</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm">Missing Production</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">80</div>
                <div className="text-sm">Current Target</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100</div>
                <div className="text-sm">Shelf Target</div>
              </div>
            </div>
          </div>

          {/* Scrap Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaClipboardList className="mr-2 text-indigo-500" /> SCRAP
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Shelf (prod./scope)</span>
                <span>50/70</span>
              </div>
              <div className="flex justify-between">
                <span>Op.: (prod./scope)</span>
                <span>15/70</span>
              </div>
              <div className="flex justify-between">
                <span>Operator</span>
                <span>5/70</span>
              </div>
            </div>
          </div>

          {/* Top Scrap */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaExclamationTriangle className="mr-2 text-red-500" /> SHIFT TOP 5 SCRAP
            </h3>
            <ul className="space-y-2">
              {['Dust on the Surface', 'Beta in the Surface', 'Duty Surface', 
                'Operator Control', 'Incorrect Cut'].map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="bg-gray-100 px-2 rounded">+</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}   