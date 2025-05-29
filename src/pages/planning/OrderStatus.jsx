import PropTypes from "prop-types";
import  { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const OrderStatus = () => {
  return (
    <div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
      <div className="flex justify-between items-center p-3">
        <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
          Order Status
        </label>
        <div className="relative w-full max-w-4xl p-1">
          <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-x-3 gap-y-2 justify-end">
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label className="text-gray-700 text-sm font-medium">Workcenter</label>
              <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="">VCAL1</option>
                <option value="wc1">Workcenter 1</option>
                <option value="wc2">Workcenter 2</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label className="text-gray-700 text-sm font-medium">Production Shift</label>
              <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
                <option value="">Shifts</option>
                <option value="shift1">Shift 1</option>
                <option value="shift2">Shift 2</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label className="text-gray-700 text-sm font-medium">From Date</label>
              <input type="date" className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500 w-full" />
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <label className="text-gray-700 text-sm font-medium">To Date</label>
              <input type="date" className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500 w-full" />
            </div>
            <div className="ml-3">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-2 px-2 sm:px-4 rounded-md shadow-md transition duration-200">
                Search
              </button>
            </div>
            <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      />
          </div>
        </div>
      </div>
    </div>
  );
};

const TablePopupForm = ({ rowData, onSave, onClose }) => {
  const [formData, setFormData] = useState(rowData || Array(13).fill(""));

  const handleChange = (index, value) => {
    const newData = [...formData];
    newData[index] = value;
    setFormData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-2/3 z-50">
        <h3 className="text-lg font-bold mb-4">Edit Record</h3>
        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
          {[
            "Workcenter", "Entry Date Time", "Delay", "Delay Type", "Reason", "Delay Description", "Corrective Action", "Delay Start Time", "Delay End Time", "Duration (min)", "Delay Count", "Prod Shift", "Shift In Change"
          ].map((label, i) => (
            <div key={i} className="flex flex-col">
              <label className=" text-sm font-medium text-gray-700">{label}</label>
              <input
                type="text"
                value={formData[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="border p-2 w-full mt-2"
                required
              />
            </div>
          ))}
          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [tableData, setTableData] = useState([
    ["VCAL1", "21-08-2024,15:24", "ML", "TEST DELAY TYPE", "N/A", "a", "", "20-08-2024 15:24", "20-08-2024 16:00", "36", "1", "B", "Mes It"],
    ["VCAL1", "21-08-2024,15:24", "ML", "TEST DELAY TYPE", "N/A", "a", "", "20-08-2024,16:00", "20-08-2024 16:24", "24", "0", "C", "Mes It"],
  ]);

  const [editingRow, setEditingRow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleAdd = () => {
    setEditingRow(null);
    setShowForm(true);
  };

  const handleEdit = (rowData, index) => {
    setEditingRow({ rowData, index });
    setShowForm(true);
  };

  const handleSave = (newData) => {
    if (editingRow?.index !== undefined) {
      const updatedData = [...tableData];
      updatedData[editingRow.index] = newData;
      setTableData(updatedData);
    } else {
      setTableData([...tableData, newData]);
    }
    setEditingRow(null);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };


   // Pagination Logic
   const totalPages = Math.ceil(tableData.length / rowsPerPage);
   const displayedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
   
   // Generate page numbers for display
   const generatePaginationNumbers = () => {
     const pageNumbers = [];
     const maxPageButtons = 5;
     
     if (totalPages <= maxPageButtons) {
       // If we have 5 or fewer pages, show all of them
       for (let i = 1; i <= totalPages; i++) {
         pageNumbers.push(i);
       }
     } else {
       // Always add page 1
       pageNumbers.push(1);
       
       // Calculate which pages to show around the current page
       let startPage = Math.max(2, currentPage - 1);
       let endPage = Math.min(totalPages - 1, currentPage + 1);
       
       // Handle edge cases
       if (currentPage <= 3) {
         endPage = Math.min(4, totalPages - 1);
       } else if (currentPage >= totalPages - 2) {
         startPage = Math.max(2, totalPages - 3);
       }
       
       // Add ellipsis after page 1 if needed
       if (startPage > 2) {
         pageNumbers.push('...');
       }
       
       // Add middle pages
       for (let i = startPage; i <= endPage; i++) {
         pageNumbers.push(i);
       }
       
       // Add ellipsis before last page if needed
       if (endPage < totalPages - 1) {
         pageNumbers.push('...');
       }
       
       // Always add last page
       if (totalPages > 1) {
         pageNumbers.push(totalPages);
       }
     }
     
     return pageNumbers;
   };
  const pageNumbers = generatePaginationNumbers();
  return (
    <div className="mt-8 w-full max-w-full mx-auto">
      <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto">
        <table className="p-4 w-full min-w-[800px] border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-teal-600 text-white text-base whitespace-nowrap">
              {["WORKCENTER", "ENTRY DATE TIME", "DELAY", "DELAY TYPE", "REASON", "DELAY DESCRIPTION", "CORRECTIVE ACTION", "DELAY START TIME", "DELAY END TIME", "DURATION (min)", "DELAY COUNT", "PROD SHIFT", "SHIFT IN CHANGE", "ACTIONS"].map((heading, i) => (
                <th key={i} className="border border-gray-300 p-4 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white text-black text-center whitespace-nowrap">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border p-2 text-left">
                    {colIndex === 7 || colIndex === 8 ? (
                      <div className="flex items-center gap-1">
                        {cell} <AiOutlineCalendar className="text-gray-500 text-lg" />
                      </div>
                    ) : cell}
                  </td>
                ))}
                <td className="border p-2 text-left">
                  <button onClick={() => handleEdit(row, rowIndex)} className="text-blue-500 px-2">
                    <AiOutlineEdit />
                  </button>
                  <button onClick={() => handleDelete(rowIndex)} className="text-red-500 px-2">
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* New Pagination Component */}
    <div className="flex justify-end items-center mt-4 mb-2">
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          « Previous
        </button>
        
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' ? setCurrentPage(page) : null}
            disabled={page === '...'}
            className={`px-3 py-1 rounded text-sm ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : page === '...'
                ? 'text-gray-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
        >
          Next »
        </button>
      </div>
    </div>

      <div className="flex justify-end space-x-4 p-3 bg-gray-100 border-t border-gray-300">
        <button onClick={handleAdd} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">
          Add
        </button>
      </div>

      {showForm && (
        <TablePopupForm
          rowData={editingRow?.rowData}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
TablePopupForm.propTypes = {
  rowData : PropTypes.number.isRequired,
  onSave : PropTypes.func.isRequired,
  onClose :PropTypes.func.isRequired,
}
const App = () => {
return (
  <div className="w-full">
    <OrderStatus />
    <TableComponent />
  </div>
);
};

export default App;