import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Menu } from '@headlessui/react';
import { FaPlus, FaTrashAlt, FaEdit, FaSync, FaSave, FaUndo } from 'react-icons/fa';

const WorkCenter = () => {
  const initialRows = [
    {
      id: 1,
      workCenter: 'WELD1',
      entryDate: new Date('2024-12-26T00:00:00'),
      delayCat: 'BD - BREAKDOWN',
      delayName: 'RMC - RM MILL COBBLE',
      delayReason: '',
      equipment: 'WELDING MACHINE',
      agency: 'TRANSPORT',
      actionTaken: '',
      delayStart: new Date('2024-06-28T00:00:00'),
      delayEnd: new Date('2024-06-28T00:00:00'),
    },
    {
      id: 2,
      workCenter: 'PAINT',
      entryDate: new Date('2024-12-26T00:00:00'),
      delayCat: 'SD - SHUTDOWN',
      delayName: 'LS - LACK OF SLAB',
      delayReason: '',
      equipment: 'CUTTING MACHINE',
      agency: 'ELECTRICAL',
      actionTaken: '',
      delayStart: new Date('2024-06-28T00:00:00'),
      delayEnd: new Date('2024-06-28T00:00:00'),
    },
    {
      id: 3,
      workCenter: 'PDI',
      entryDate: new Date('2024-12-26T00:00:00'),
      delayCat: 'STPL - SETUP LOSS',
      delayName: 'RMC - RM MILL COBBLE',
      delayReason: '',
      equipment: 'DRILL',
      agency: 'MECHANICAL',
      actionTaken: '',
      delayStart: new Date('2024-06-28T00:00:00'),
      delayEnd: new Date('2024-06-28T00:00:00'),
    },
    {
      id: 4,
      workCenter: 'CUTTING',
      entryDate: new Date('2024-12-26T00:00:00'),
      delayCat: 'PC - PART CHANGE',
      delayName: 'KB - KICKBACK',
      delayReason: '',
      equipment: 'PAINT MACHINE',
      agency: 'OPERATION',
      actionTaken: '',
      delayStart: new Date('2024-06-28T00:00:00'),
      delayEnd: new Date('2024-06-28T00:00:00'),
    },
    {
      id: 5,
      workCenter: 'WELD2',
      entryDate: new Date('2024-12-26T00:00:00'),
      delayCat: 'AS - ANNUAL SHUTDOWN',
      delayName: 'RB - RUNBACK',
      delayReason: '',
      equipment: 'WEIGHT MACHINE',
      agency: 'AUTOMATION',
      actionTaken: '',
      delayStart: new Date('2024-06-28T00:00:00'),
      delayEnd: new Date('2024-06-28T00:00:00'),
    },
  ];

  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const workCenters = ['WELD1', 'PAINT', 'PDI', 'CUTTING', 'WELD2'];
  const delayCats = [
    'BD - BREAKDOWN',
    'SD - SHUTDOWN',
    'STPL - SETUP LOSS',
    'PC - PART CHANGE',
    'AS - ANNUAL SHUTDOWN'
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = rows.slice(indexOfFirstItem, indexOfLastItem);

  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(row => !selectedRows.includes(row.id));
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(currentRows.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDropdownChange = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleDateChange = (id, field, date) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: date } : row
    ));
  };

  const CustomDropdown = ({ id, field, options, selectedValue }) => (
    <Menu as="div" className="relative text-sm">
      <Menu.Button className="w-full text-left flex items-center justify-between px-2 py-1 border rounded">
        {selectedValue || 'Select...'}
        <FaSync className="ml-1 text-xs" />
      </Menu.Button>
      <Menu.Items className="absolute z-50 bg-white border rounded shadow-lg mt-1 w-full max-h-60 overflow-auto text-sm">
        {options.map(option => (
          <Menu.Item key={option}>
            {({ active }) => (
              <div
                className={`px-3 py-2 ${active ? 'bg-blue-50' : ''} cursor-pointer`}
                onClick={() => handleDropdownChange(id, field, option)}
              >
                {option}
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );

  const addRow = () => {
    setRows([...rows, {
      id: rows.length + 1,
      workCenter: '',
      entryDate: new Date(),
      delayCat: '',
      delayName: '',
      delayReason: '',
      equipment: '',
      agency: '',
      actionTaken: '',
      delayStart: new Date(),
      delayEnd: new Date(),
    }]);
  };

  return (
    <div className="bg-blue-100 min-h-screen p-4">
      <div className="bg-white rounded shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-1 border rounded text-sm"
              onChange={(e) => {
                const filter = e.target.value;
                setCurrentPage(1);
                // Add filtering logic here
              }}
            >
              <option value="">All Work Centers</option>
              {workCenters.map(center => (
                <option key={center} value={center}>{center}</option>
              ))}
            </select>
            <button
              className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
            >
              <FaSync className="mr-1" /> Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 w-8">
                  {/* <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedRows.length === currentRows.length}
                  /> */}
                </th>
                <th className="border p-2">WORKCENTER</th>
                <th className="border p-2">ENTRY DATE</th>
                <th className="border p-2">DELAY CAT</th>
                <th className="border p-2">DELAY NAME</th>
                <th className="border p-2">DELAY REASON</th>
                <th className="border p-2">EQUIPMENT</th>
                <th className="border p-2">AGENCY</th>
                <th className="border p-2">ACTION TAKEN</th>
                <th className="border p-2">DELAY START TIME</th>
                <th className="border p-2">DELAY END TIME</th>
                <th className="border p-2">DURATION [min]</th>
                <th className="border p-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border p-2">
                    {/* <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => toggleRowSelection(row.id)}
                    /> */}
                  </td>
                  <td className="border p-2">
                    <CustomDropdown
                      id={row.id}
                      field="workCenter"
                      options={workCenters}
                      selectedValue={row.workCenter}
                    />
                  </td>
                  <td className="border p-2">
                    <DatePicker
                      selected={row.entryDate}
                      onChange={date => handleDateChange(row.id, 'entryDate', date)}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy HH:mm:ss"
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <CustomDropdown
                      id={row.id}
                      field="delayCat"
                      options={delayCats}
                      selectedValue={row.delayCat}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={row.delayName || ''}
                      onChange={e => handleDropdownChange(row.id, 'delayName', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={row.delayReason || ''}
                      onChange={e => handleDropdownChange(row.id, 'delayReason', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={row.equipment || ''}
                      onChange={e => handleDropdownChange(row.id, 'equipment', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={row.agency || ''}
                      onChange={e => handleDropdownChange(row.id, 'agency', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded text-sm"
                      value={row.actionTaken || ''}
                      onChange={e => handleDropdownChange(row.id, 'actionTaken', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <DatePicker
                      selected={row.delayStart}
                      onChange={date => handleDateChange(row.id, 'delayStart', date)}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy HH:mm:ss"
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <DatePicker
                      selected={row.delayEnd}
                      onChange={date => handleDateChange(row.id, 'delayEnd', date)}
                      showTimeSelect
                      dateFormat="dd-MM-yyyy HH:mm:ss"
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    {Math.round((row.delayEnd - row.delayStart) / 60000)} min
                  </td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={14} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrashAlt size={14} onClick={() => setSelectedRows([row.id])} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={addRow}
              className="px-3 py-1 border rounded bg-green-200 text-black hover:bg-green-600 text-sm"
            >
              <FaPlus className="mr-1" /> Add Row
            </button>
            <button
              onClick={deleteSelectedRows}
              className="px-3 py-1 border rounded bg-red-300 text-black hover:bg-red-600 text-sm"
              disabled={!selectedRows.length}
            >
              <FaTrashAlt className="mr-1" /> Delete
            </button>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="px-3 py-1 border rounded text-sm"
              value={itemsPerPage}
              onChange={e => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded text-sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {Math.ceil(rows.length / itemsPerPage)}
              </span>
              <button
                className="px-3 py-1 border rounded text-sm"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= Math.ceil(rows.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded bg-yellow-500 text-white hover:bg-yellow-600 text-sm"
              >
                <FaUndo className="mr-1" /> Split
              </button>
              <button
                className="px-3 py-1 border rounded bg-gray-500 text-white hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600 text-sm"
              >
                <FaSave className="mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkCenter;