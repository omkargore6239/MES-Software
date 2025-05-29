import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserMaster = () => {
  return (
    <div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
      <div className="flex justify-between items-center p-3">
        <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
          USER MASTER
        </label>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

const UserMasterPopup = ({ roleData, onSave, onClose }) => {
  const [formData, setFormData] = useState(roleData || { roleName: "", description: "", status: "Active" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h3 className="text-lg font-bold mb-4">{roleData?.index !== undefined ? "Edit Role" : "Add Role"}</h3>
        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
          <div>
            <label>Role Name</label>
            <input
              type="text"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <div className="col-span-2">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [tableData, setTableData] = useState([
    { roleName: "CHAMP_PPC", description: "Champion User PPC", status: "Active" },
    { roleName: "CHAMP_FIN", description: "Champion User Finishing", status: "Active" },
    { roleName: "ADMIN", description: "Administrator", status: "Active" },
    { roleName: "PRD_MNGR", description: "Production Manager", status: "Inactive" },
    { roleName: "CHAMP_CGL", description: "Champion User GI/GL", status: "Active" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [editingUserMaster, setEditingUserMaster] = useState(null);

  const handleAdd = () => {
    setEditingUserMaster({ roleName: "", description: "", status: "Active" });
  };

  const handleEdit = (index) => {
    setEditingUserMaster({ ...tableData[index], index });
  };

  const handleDelete = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleSave = (newData) => {
    if (newData.index !== undefined) {
      // Editing existing item
      const updatedData = tableData.map((role, i) =>
        i === newData.index ? newData : role
      );
      setTableData(updatedData);
    } else {
      // Adding new item
      setTableData([...tableData, newData]);
    }
    setEditingUserMaster(null);
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
      <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-x-auto">
        <table className="p-4 w-full min-w-[800px] border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-teal-600 text-white text-base">
              {["ROLE NAME", "DESCRIPTION", "STATUS", "ACTION"].map((heading, i) => (
                <th key={i} className="border border-gray-300 p-4 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="bg-white text-black text-center">
                <td className="text-sm border border-gray-300 px-4 py-2 text-start">{row.roleName}</td>
                <td className="text-sm border border-gray-300 px-4 py-2 text-start">{row.description}</td>
                <td className="text-sm border border-gray-300 px-4 py-2 text-start">{row.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-3">
                  <button onClick={() => handleEdit(rowIndex)} className="text-blue-500 px-2">
                  <AiOutlineEdit />
                </button>
                <button onClick={() => handleDelete(rowIndex)} className="text-red-500 px-2">
                  <AiOutlineDelete />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      {editingUserMaster && (
        <UserMasterPopup
          roleData={editingUserMaster}
          onSave={handleSave}
          onClose={() => setEditingUserMaster(null)}
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
          <button onClick={handleAdd} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">
            Add
          </button>
        </div>

    </div>
  );
};

const UserMasterComponent = () => {
  return (
    <div className="relative">
      <UserMaster />
      <TableComponent />
    </div>
  );
};

UserMasterPopup.propTypes = {
  roleData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserMasterComponent;
