import React from "react";

const InspectionTable = () => {
  return (
    <div className="p-6">
      <div className="text-3xl font-bold mb-6">INSPECTION</div>

      <div className="flex gap-6">
        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6">
          {/* Dropdowns */}
          <div className="flex gap-4">
            <select className="border px-3 py-1 rounded">
              <option>WC</option>
            </select>
            <select className="border px-3 py-1 rounded">
              <option>MATERIAL</option>
            </select>
          </div>

          {/* First Table */}
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm text-center border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th rowSpan="2" className="border px-2 py-1">ID</th>
                  <th rowSpan="2" className="border px-2 py-1">SHIFT</th>
                  <th colSpan="3" className="border px-2 py-1">OUTPUT</th>
                  <th colSpan="5" className="border px-2 py-1">INPUT</th>
                </tr>
                <tr className="bg-blue-900 text-white">
                  <th className="border px-2 py-1">Tracibility No</th>
                  <th className="border px-2 py-1">WGT</th>
                  <th className="border px-2 py-1">Part Number</th>
                  <th className="border px-2 py-1">IP BATCH NO</th>
                  <th className="border px-2 py-1">THK(mm)</th>
                  <th className="border px-2 py-1">WDTH(mm)</th>
                  <th className="border px-2 py-1">LEN(mtrs)</th>
                  <th className="border px-2 py-1">WGT(mt)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1, shift: "C", tracibility: "VL1U2C1199", wgt: "13.8", partNo: "CRFHCW",
                    batch: "VL1U2C1199", thk: "1.512", wdth: "1250", len: "1670", wgtmt: "24.79"
                  },
                  {
                    id: 2, shift: "C", tracibility: "VL1UCD5066", wgt: "2.19", partNo: "CRFHCW",
                    batch: "VL1UCD5066", thk: "0.507", wdth: "1000", len: "1052.78", wgtmt: "4.19"
                  },
                  {
                    id: 3, shift: "C", tracibility: "VL1UCA5010", wgt: "2.398", partNo: "CRFHCW",
                    batch: "VL1UCA5010", thk: "0.507", wdth: "1250", len: "5000", wgtmt: "25.398"
                  }
                ].map(row => (
                  <tr key={row.id} className="odd:bg-white even:bg-orange-100">
                    <td className="border px-2 py-1">{row.id}</td>
                    <td className="border px-2 py-1">{row.shift}</td>
                    <td className="border px-2 py-1">{row.tracibility}</td>
                    <td className="border px-2 py-1">{row.wgt}</td>
                    <td className="border px-2 py-1">{row.partNo}</td>
                    <td className="border px-2 py-1">{row.batch}</td>
                    <td className="border px-2 py-1">{row.thk}</td>
                    <td className="border px-2 py-1">{row.wdth}</td>
                    <td className="border px-2 py-1">{row.len}</td>
                    <td className="border px-2 py-1">{row.wgtmt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traceability + Part Number Row */}
          <div className="flex gap-6 mt-4">
            <div className="flex-1">
              <label className="block font-semibold">Tracibility No</label>
              <input type="text" className="border w-full p-1" />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">Part Number</label>
              <input type="text" className="border w-full p-1" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          <table className="w-full border border-collapse text-sm text-center">
            <thead>
              <tr>
                <th colSpan={2} className="bg-blue-900 text-white py-2">PHYSICAL</th>
                <th colSpan={2} className="bg-blue-900 text-white py-2">MECHANICAL</th>
              </tr>
              <tr className="bg-blue-700 text-white">
                <th className="border px-2 py-1">ATTRIBUTE</th>
                <th className="border px-2 py-1">ACTUAL</th>
                <th className="border px-2 py-1">AIM</th>
                <th className="border px-2 py-1">MIN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">NOMINAL THK (MM)</td>
                <td className="border px-2 py-1">0.608</td>
                <td className="border px-2 py-1">1250</td>
                <td className="border px-2 py-1">1250</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">NOMINAL WIDTH</td>
                <td className="border px-2 py-1">1250</td>
                <td className="border px-2 py-1">0.608</td>
                <td className="border px-2 py-1">0.588</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">MEASURED THK</td>
                <td className="border px-2 py-1">0.588</td>
                <td className="border px-2 py-1">1250</td>
                <td className="border px-2 py-1">1,250,000</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">MEASURED WIDTH</td>
                <td className="border px-2 py-1">1250</td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">MEASURED LENGTH</td>
                <td className="border px-2 py-1">2313.108</td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1"></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">AVG THK</td>
                <td className="border px-2 py-1">0.608</td>
                <td className="border px-2 py-1"></td>
                <td className="border px-2 py-1">0.588</td>
              </tr>

              <tr>
                <td className="border px-2 py-1">SEGMENT</td>
                <td colSpan={3} className="border px-2 py-1 text-left">
                  <select className="w-[30%] border rounded px-2 py-1">
                    <option>RET</option>
                    <option>ALT</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1">REASON DESCRIPTION</td>
                <td colSpan={3} className="border px-2 py-1 text-left">
                  <textarea className="w-full border rounded px-2 py-1" rows="2" />
                </td>
              </tr>
              <tr>
                <td className="border px-2 py-1">MANUAL P/F</td>
                <td className="border px-2 py-1">
                  <select className="w-full border rounded px-2 py-1">
                    <option>P</option>
                    <option>F</option>
                  </select>
                </td>
                <td className="border px-2 py-1">RESULT</td>
                <td className="border px-2 py-1">PASS</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="border px-2 py-1">REMARK</td>
                <td className="border px-2 py-1" colSpan={4}>TEST</td>
              </tr>
              <tr>
                <td colSpan={4} className="border text-right p-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded">
                    SAVE (VL1U2C1199)
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InspectionTable;
