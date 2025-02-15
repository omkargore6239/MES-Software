import { XMarkIcon } from "@heroicons/react/24/outline";

const ShiftwiseProduction = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100 p-4">
      {/* Main Container */}
      <div className="h-full w-full rounded-lg bg-white overflow-hidden flex">
        {/* Left Half */}
        <div className="w-1/2 p-4 overflow-y-auto">
          {/* Header */}
          <div className="mb-4 p-3 border-b-2 border-blue-600">
            <h1 className="text-blue-600 font-bold uppercase text-lg flex items-center justify-between">
              SHIFT-WISE PART PRODUCTION
              <XMarkIcon className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-700" />
            </h1>
          </div>

          {/* Filters */}
          <div className="flex items-end gap-4 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                DATE
              </label>
              <input 
                type="date" 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-gray-700 mb-1">
                SHIFT
              </label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>

            <button className="bg-blue-600 text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              SEARCH
            </button>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th rowSpan={2} className="p-3 text-sm uppercase font-semibold text-left border-r border-blue-500">
                    STATUS
                  </th>
                  <th colSpan={2} className="p-3 text-sm uppercase font-semibold text-center border-b border-blue-500">
                    FURNACE 1
                  </th>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-sm uppercase font-semibold text-center border-r border-blue-500">
                    NOS
                  </th>
                  <th className="p-3 text-sm uppercase font-semibold text-center">
                    WGT
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CUTTING', 40, 880],
                  ['WELDING', 13, 286],
                  ['PAINT', 13, 286],
                  ['PDI', 2, 44],
                  ['RUN BACK', 1, 22],
                  ['COBBLE', 1, 22],
                  ['PLATE', 2, 44],
                  ['COILBOX COIL', 3, 66],
                  ['COIL', 15, 330],
                  ['REMOVED', 2, 44],
                ].map(([status, nos, wgt], index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition-colors`}
                  >
                    <td className="p-3 text-sm text-gray-700 border-t border-r border-gray-200">
                      {status}
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center border-t border-r border-gray-200">
                      {nos}
                    </td>
                    <td className="p-3 text-sm text-gray-700 text-center border-t border-gray-200">
                      {wgt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Half */}
        <div className="w-1/2 relative border-l-2 border-gray-200">
          <div className="absolute top-4 right-4">
            <button className="bg-green-600 text-white text-sm px-6 py-2 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
              ADD SHIFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftwiseProduction;