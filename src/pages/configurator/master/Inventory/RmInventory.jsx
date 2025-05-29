import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
// RM Inventory Form (Pop-up)
const RmInventoryForm = ({ inventory, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    inventory || {
      rmId: "",
      materialType: "",
      grade: "",
      dimension: "",
      supplierId: "",
      uom: "",
      storageRack: "",
      heatNo: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2 z-[1001]">
        <h3 className="text-lg font-bold mb-4">
          {inventory ? "Edit Inventory" : "Add Inventory"}
        </h3>
        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
          {[
            { label: "RM ID", name: "rmId" },
            { label: "Material Type", name: "materialType" },
            { label: "Grade", name: "grade" },
            { label: "Dimension", name: "dimension" },
            { label: "Supplier ID", name: "supplierId" },
            { label: "UOM", name: "uom" },
            { label: "Storage Rack", name: "storageRack" },
            { label: "Heat No", name: "heatNo" },
          ].map((field, i) => (
            <div key={i}>
              <label>{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border p-2 w-full mt-2"
              />
            </div>
          ))}

          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// RM Inventory Table Component
const RmInventoryTable = () => {
  const [tableData, setTableData] = useState([
    {
      rmId: "RM-001",
      materialType: "Bar",
      grade: "ASTM A36",
      dimension: "20mm*6m",
      supplierId: "SUP-01",
      uom: "kg",
      storageRack: "Rack-A1",
      heatNo: "HSMS1",
    },
    {
      rmId: "RM-002",
      materialType: "Bar",
      grade: "ASTM A37",
      dimension: "20mm*6m",
      supplierId: "SUP-02",
      uom: "kg",
      storageRack: "Rack-A2",
      heatNo: "HSMS2",
    },
    {
      rmId: "RM-003",
      materialType: "Bar",
      grade: "ASTM A38",
      dimension: "20mm*6m",
      supplierId: "SUP-03",
      uom: "kg",
      storageRack: "Rack-A3",
      heatNo: "HSMS3",
    },
  ]);

  const [editingInventory, setEditingInventory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleAdd = () => {
    setEditingInventory(null);
    setShowForm(true);
  };

  const handleEdit = (inventory) => {
    setEditingInventory(inventory);
    setShowForm(true);
  };

  const handleSave = (inventory) => {
    if (editingInventory) {
      // Update existing inventory
      setTableData(
        tableData.map((item) =>
          item.rmId === editingInventory.rmId ? inventory : item
        )
      );
    } else {
      // Add new inventory
      setTableData([...tableData, inventory]);
    }
    setShowForm(false);
  };

  const handleDelete = (rmId) => {
    setTableData(tableData.filter((item) => item.rmId !== rmId));
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
      {/* Table Container */}
      <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto">
        <table className="p-4 w-full min-w-[800px] border-collapse border border-gray-300 text-sm">
          {/* Table Header */}
          <thead>
            <tr className="bg-teal-600 text-white text-base">
              {[
                "RM ID",
                "Material Type",
                "Grade",
                "Dimension",
                "Supplier ID",
                "UOM",
                "Storage Rack",
                "Heat No",
                "Actions",
              ].map((heading, i) => (
                <th key={i} className="border border-gray-300 p-4 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {displayedData.map((inventory, index) => (
              <tr key={index} className="bg-white text-black text-center">
                {Object.values(inventory).map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className="text-sm border border-gray-300 px-4 py-2 text-start whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
                {/* Actions Column */}
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(inventory)}
                    className="text-blue-500 px-2"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(inventory.rmId)}
                    className="text-red-500 px-2"
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Buttons (Add) */}
      </div>

      {/* Pop-up Form */}
      {showForm && (
        <RmInventoryForm
          inventory={editingInventory}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      )}
          
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
          <button
            onClick={handleAdd}
            className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md"
          >
            Add
          </button>
        </div>
    </div>
    
  );
};

// Main Component
const RmInventory = () => {
  return (
    <div className="relative">
      <RmInventoryMaster />
      <RmInventoryTable />
    </div>
  );
};

// RM Inventory Master Component
const RmInventoryMaster = () => {
  return (
<div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
  <div className="flex justify-between items-center p-3">
    <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
      RM INVENTORY MASTER
    </label>
    <div className="relative w-full max-w-4xl p-1">
      <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-x-3 gap-y-2 justify-end">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 text-sm font-medium">Material Type</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="Bar">Bar</option>
            <option value="Sheet">TMT</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 text-sm font-medium">Grade</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="ASTM A36">ASTM A36</option>
            <option value="ASTM A37">ASTM A37</option>
            <option value="ASTM A38">ASTM A38</option>
          </select>
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


RmInventoryForm.propTypes = {
  inventory:PropTypes.object.isRequired,
   onSave:PropTypes.func.isRequired,
    onClose:PropTypes.func.isRequired,

};


export default RmInventory;
















