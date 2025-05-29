import  { useState } from "react";

const BOMMaster = () => {
  return (
    <div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-2">
      {/* Heading */}
      <div className="flex justify-between items-center p-3">
        <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
          BOM MASTER
        </label>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [tableData, /*setTableData*/] = useState([
    ["BOM-001", "P-1001", "Steel Frame", "SA-2001", "Base Assembly", "RM-3001","Steel Rod","5","kg","Welding","WC-01","2","Vendor A"],
    ["BOM-001", "P-1001", "Steel Frame", "SA-2001", "Base Assembly", "RM-3002","Aluminum Plate","3","pcs","Cutting","WC-02","1","Vendor B"],
    ["BOM-001", "P-1001", "Steel Frame", "SA-2002", "Frame Assembly", "RM-3003","Fasteners","10","pcs","Assembly","WC-03","1","Vendor C"],
    ["BOM-002", "P-1002", "Metal Enclosure", "SA-2003", "Outer Shell", "RM-3004","Sheet Metal","8","kg","Bending","WC-04","3","Vendor A"],
    ["BOM-002", "P-1002", "Metal Enclosure", "SA-2004", "Inner Lining", "RM-3005","Insulation Foam","2","kg","Coating","WC-05","2","Vendor D"],
  ]);

  return (
    <div className="mt-4 w-full max-w-full mx-auto">
      {/* Table Container */}
      <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto">
        <table className="p-4 w-full min-w-[800px] border-collapse border border-gray-300 text-sm">
          {/* Table Header */}
          <thead>
            <tr className="bg-teal-600 text-white text-base">
              {["BOM ID", "Prod Code", "Product Name ", "Sub-Assembly Code", "Sub-Assembly Name", "Raw Material Code","Raw Material Name","Quantity Per Unit","UOM","Process Stage","Work Center","Lead Time (Hrs)","Supplier/Vendor"]
                .map((heading, i) => (
                  <th key={i} className="border border-gray-300 p-4 text-left">
                    {heading}
                  </th>
                ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white text-black text-center">
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="text-sm border border-gray-300 px-4 py-2 text-start whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="relative">
      <BOMMaster />
      <TableComponent />
    </div>
  );
};

export default App;