//import { Bar } from 'react-chartjs-2';
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
  const totalRunningHours = 68;
  const days = Math.floor(totalRunningHours / 24);
  const hours = totalRunningHours % 24;
  
  const machineStatusData = {
    labels: ['Stopping Time', 'Target Time', 'Over Time'],
    datasets: [{
      data: [2.15, 4.22, 1.5],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
    }]
  };

  return (
    <div className=" flex flex-wrap gap-6  ">
{/* First Row - Grid Layout */}
     <div className="flex flex-wrap gap-2 h-screen  overflow-hidden " >
  {/* Header */}
  <div className="w-screen flex justify-between items-center mb-2">
    <h1 className="text-lg font-bold">Dashboard</h1>
    <div className="flex items-center space-x-2 ">
    <select className='w-full bg-gray-300'>
          <option><FaCog className="mr-1 text-blue-500" /> E81 MACHINE</option>
          <option><FaCog className="mr-1 text-blue-500" /> E82 MACHINE</option>
          <option><FaCog className="mr-1 text-blue-500" /> E83 MACHINE</option>
          <option><FaCog className="mr-1 text-blue-500" /> E84 MACHINE</option>
          <option><FaCog className="mr-1 text-blue-500" /> E85 MACHINE</option>
          </select>
      <input
        type="text"
        placeholder="Search..."
        className="px-2 py-1 border rounded-md text-sm w-full"
      />
      <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
        Search
      </button>
    </div>
  </div>

  {/* First Row */}
  <div className="w-full flex gap-2 " style={{height: '22%'}}>
    <div className=" p-2 rounded-lg shadow flex-1 text-sm bg-[#5D6D7E]">
      <h2 className="font-bold mb-1 flex items-center text-sm">
        MACHINE
      </h2>
      <div className="space-y-1">
        <div className="flex justify-between"><span>Name:</span><span>MX-2000</span></div>
        <div className="flex justify-between"><span>Code:</span><span>E81-002</span></div>
        <div className="flex justify-between"><span>Group:</span><span>Cutting</span></div>
        <div className="flex justify-between"><span>Status:</span><span className="bg-green-100 text-green-800 px-1 rounded text-xs">Running</span></div>
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow flex-1 text-center bg-[#8B9EB7]">
      <h3 className="font-bold mb-1 flex items-center text-sm justify-center ">
        <FaStopwatch className="mr-1 text-purple-500" /> SHIFT DETAILS
      </h3>
      <div className="text-2xl mb-1">17 Days</div>
      <div className="text-lg">03:34:57</div>
    </div>

    <div className=" p-2 rounded-lg shadow flex-1 text-center bg-[#64748B]">
      <h3 className="font-bold mb-1 flex items-center text-sm justify-center">
        <FaTachometerAlt className="mr-1 text-purple-500" /> SHIFT SPEED
      </h3>
      <div className="text-2xl">685.955</div>
      <div className="text-xs">w/o Stop</div>
      <div className="text-2xl">685.955</div>
    </div>

    <div className="p-2 rounded-lg shadow flex flex-1 items-center bg-[#8B9EB7]">
      <div className="w-12 h-12 bg-blue-900 text-white flex items-center justify-center rounded-full text-sm mr-2">
        JD
      </div>
      <div>
        <p className="text-xs text-gray-900 font-semibold">OPERATOR</p>
        <h3 className="text-sm font-bold">John Doe</h3>
        <p className="text-xs font-medium">126 Days 01:25:32</p>
        <p className="text-[10px] text-gray-400">Running Time</p>
      </div>
    </div>
  </div>

  {/* Second Row */}
  <div className="w-full flex gap-2 " style={{height: '24%'}}>
    <div className=" p-2 rounded-lg shadow w-1/4 bg-[#8B9EB7]">
      <h3 className="font-bold mb-1 text-sm">Stoppage</h3>
      <p className="text-xs">Planned Stoppage</p>
      <p className="text-xs">Stoppage Time</p>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/4 bg-[#5D6D7E]">
      <h2 className="font-bold mb-1 text-sm flex items-center">
        <FaCog className="mr-1 text-blue-800" /> 684 STATUS
      </h2>
      <div className="relative w-20 h-22 mx-auto">
        <CircularProgressbar
          value={(totalRunningHours / 168) * 100}
          text={`${days}D ${hours}H`}
          styles={buildStyles({
            pathColor: "#3B82F6",
            textSize: '24px',
            trailColor: "#F3F4F6",
          })}
        />
      </div>
      <div className="mt-2 space-y-1 text-[10px]">
        {machineStatusData.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: machineStatusData.datasets[0].backgroundColor[index] }}></span>
            {label}: {machineStatusData.datasets[0].data[index]}h
          </div>
        ))}
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/4 bg-[#8B9EB7]">
      <h3 className="font-bold mb-1 text-sm flex items-center">
        <FaStopwatch className="mr-1 text-green-500" /> STOP/RUN
      </h3>
      <div className="flex justify-between mt-2">
        <div className="text-center">
          <div className="text-lg">02:15</div>
          <div className="text-[10px]">Stopped</div>
        </div>
        <div className="text-center">
          <div className="text-lg">04:22</div>
          <div className="text-[10px]">Running</div>
        </div>
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/4 bg-[#64748B]">
      <h3 className="font-bold mb-1 text-sm flex items-center">
        <FaExclamationTriangle className="mr-1 text-red-500" /> TOP 5 STOP
      </h3>
      <ul className="space-y-1 text-xs">
        {['Machine Failure', 'Absolute Change', 'Delivery to Operator', 'Operator Control', 'Other'].map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="truncate">{item}</span>
            <span className="bg-gray-100 px-1 rounded text-xs">+</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Third Row */}
  <div className="w-full flex gap-2" style={{height: '20%'}}>
    <div className=" p-2 rounded-lg shadow w-2/3 bg-[#b2cfed]">
      <div className="grid grid-cols-4 gap-2 h-full">
        {[
          { label: "OEE", value: oee, icon: FaTachometerAlt, color: "#3B82F6" },
          { label: "Performance", value: performance, icon: FaChartLine, color: "#10B981" },
          { label: "Availability", value: availability, icon: FaExclamationTriangle, color: "#10B981" },
          { label: "Quality", value: quality, icon: FaClipboardList, color: "#F59E0B" }
        ].map((metric, index) => (
          <div key={index} className="text-center">
            <h3 className="text-xs font-bold mb-1 flex items-center justify-center">
              <metric.icon className="mr-1" style={{ color: metric.color }} /> {metric.label}
            </h3>
            <CircularProgressbar
              value={metric.value}
              text={`${metric.value}%`}
              styles={buildStyles({
                pathColor: metric.color,
                textSize: '24px',
                trailColor: "#F3F4F6",
              })}
              className="w-20 h-20 mx-auto"
            />
          </div>
        ))}
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/3 bg-[#64748B]">
      <h3 className="font-bold mb-2 text-sm flex items-center">
        <FaBox className="mr-1 text-yellow-500" /> PRODUCTION
      </h3>
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-4">
        <div className="absolute h-2 bg-blue-500" style={{ width: "70%" }}></div>
        <div className="absolute h-2 bg-red-500 left-[70%]" style={{ width: "10%" }}></div>
        <div className="absolute left-[80%] h-2 bg-black" style={{ width: "2px" }}></div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><span className="font-bold">70</span> Completed</div>
        <div><span className="text-red-500 font-bold">10</span> Missing</div>
        <div><span className="font-bold">80</span> Target</div>
        <div><span className="font-bold">100</span> Shift Target</div>
      </div>
    </div>
  </div>

  {/* Fourth Row */}
  <div className="w-full flex gap-2" style={{height: '20%'}}>
    <div className=" p-2 rounded-lg shadow w-3/5 bg-[#b2cfed]">
      <h3 className="text-xs font-bold mb-2">OEE CHANGE (Last Time)</h3>
      <div className="flex justify-around">
        {[
          { label: "OEE", color: "bg-red-400", icon: "↓" },
          { label: "Availability", color: "bg-teal-400", icon: "↗" },
          { label: "Performance", color: "bg-teal-400", icon: "↗" },
          { label: "Quality", color: "bg-yellow-400", icon: "→" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-sm mb-1`}>
              {item.icon}
            </div>
            <span className="text-[10px]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/5 bg-[#8B9EB7]">
      <h3 className="font-bold mb-1 text-sm flex items-center">
        <FaClipboardList className="mr-1 text-indigo-500" /> SCRAP
      </h3>
      <div className="space-y-1 text-xs">
        {[
          { label: "Shift", value: "50/70", width: "71%" },
          { label: "Opr.", value: "15/70", width: "21%" },
          { label: "Operator", value: "5/70", width: "7%" }
        ].map((item, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full">
              <div className="bg-indigo-500 h-1 rounded-full" style={{ width: item.width }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className=" p-2 rounded-lg shadow w-1/5 bg-[#64748B]">
      <h3 className="font-bold mb-1 text-sm flex items-center">
        <FaExclamationTriangle className="mr-1 text-red-500" /> TOP 5 SCRAP
      </h3>
      <ul className="space-y-1 text-xs">
        {['Dust Surface', 'Beta Surface', 'Duty Surface', 'Operator Ctrl', 'Incorrect Cut'].map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <span className="truncate">{item}</span>
            <span className="bg-gray-100 px-1 rounded">+</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
</div>



    
  );
}   