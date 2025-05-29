import { useState , useEffect} from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080/workcenters";
// WorkCenter Master Component
const WorkCenterMaster = () => {
  return (
    <div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
  <div className="flex justify-between items-center p-3">
    <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
      WORKCENTER MASTER
    </label>
    <div className="relative w-full max-w-4xl p-1">
      <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-x-3 gap-y-2 justify-end">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 text-sm font-medium">Type</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>CNC 1</option>
            <option>CNC 2</option>
          </select>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <label className="text-gray-700 text-sm font-medium">Process</label>
          <select className="bg-white border border-gray-300 text-sm p-1 h-8 rounded-md focus:ring-2 focus:ring-blue-500">
            <option>Cutting</option>
            <option>Drilling</option>
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

// WorkCenter Form Component (Pop-up)
const WorkCenterForm = ({ workCenter, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    workCenter || {
      name: "",
      type: "CNC_Grinding_Machine",
      location: "Shop_Floor_A",
      maxLoad: "",
      linkedProcesses: "Cutting",
      maintenanceFrequency: "",
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
          {workCenter ? "Edit WorkCenter" : "Add WorkCenter"}
        </h3>
        <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            >
              <option>CNC_Grinding_Machine</option>
              <option>CNC_Laser_Cutter</option>
              <option>CNC_Plasma_Cutter</option>
              <option>CNC_Router</option>
              </select>
          </div>
          <div>
  <label>Location</label>
  <select
    name="location"
    value={formData.location}
    onChange={handleChange}
    className="border p-2 w-full mt-2"
  >
    <option >Shop_Floor_A</option>
    <option >Shop_Floor_B</option>
    <option >Shop_Floor_C</option>
    <option >Shop_Floor_D</option>
  </select>
</div>
          <div>
            <label>Max Load (kg)</label>
            <input
              type="number"
              name="maxLoad"
              value={formData.maxLoad}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
          <div>
            <label>Linked Processes</label>
            <select
              name="linkedProcesses"
              value={formData.linkedProcesses}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            ><option >Cutting</option>
              <option >Drilling</option>  
              </select>
          </div>
          <div>
            <label>Maintenance Frequency</label>
            <input
              type="text"
              name="maintenanceFrequency"
              value={formData.maintenanceFrequency}
              onChange={handleChange}
              className="border p-2 w-full mt-2"
            />
          </div>
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

// WorkCenter Table Component
const WorkCenterTable = () => {
  const [tableData, setTableData] = useState([]);
  const [editingWorkCenter, setEditingWorkCenter] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchWorkcenter();  // Fetch latest data on component mount
}, []);


  // ✅ Fetch updated work center list from backend
  const fetchWorkcenter = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setTableData(response.data);
    } catch (error) {
      console.error("❌ Error fetching work centers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingWorkCenter(null);
    setShowForm(true);
  };

  const handleEdit = (workcenter) => {
    setEditingWorkCenter(workcenter);
    setShowForm(true);
  };

  const handleSave = async (workcenter) => {
    try {
        const headers = { "Content-Type": "application/json" };
        let response;

        if (workcenter.workCenterId) {
            response = await axios.put(`${API_BASE_URL}/update/${workcenter.workCenterId}`, workcenter, { headers });
        } else {
            response = await axios.post(`${API_BASE_URL}/add`, workcenter, { headers });
        }

        console.log("✅ Successfully saved workcenter:", response.data);

        setShowForm(false);

        // 🔄 Refresh table dynamically
        fetchWorkcenter(); 
    } catch (error) {
        console.error("❌ Error saving workcenter:", error);
    }
};


const handleDelete = async (workCenterId) => {
  try {
      await axios.delete(`${API_BASE_URL}/delete/${workCenterId}`);
      // 🔄 Immediately update tableData state (Optimistic UI Update)
      setTableData((prevData) => prevData.filter((item) => item.workCenterId !== workCenterId));
      console.log("✅ Workcenter deleted successfully");
  } catch (error) {
      console.error("❌ Error deleting workcenter:", error);
  }
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
            <tr className="bg-teal-600 text-white text-base">
              {[
                "Workcenter ID",
                "Name",
                "Type",
                "Location",
                "Max Load (kg)",
                "Linked Processes",
                "Maintenance Frequency",
                "Actions",
              ].map((heading, i) => (
                <th key={i} className="border border-gray-300 p-4 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="15" className="text-center p-4">Loading workcenters...</td>
              </tr>
            ) : tableData.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center p-4">No workcenters found.</td>
              </tr>
            ) : (
              displayedData.map((workCenter, index) => (
                <tr key={index} className="bg-white text-black text-center">
                  {Object.values(workCenter).map((cell, colIndex) => (
                    <td key={colIndex} className="border p-2">{cell}</td>
                  ))}
                  <td className="border p-2">
                    <button onClick={() => handleEdit(workCenter)} className="text-blue-500 px-2">
                      <AiOutlineEdit />
                    </button>
                    <button onClick={() => handleDelete(workCenter.workCenterId)} className="text-red-500 px-2">
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showForm && (
          <WorkCenterForm
            workCenter={editingWorkCenter}
            onSave={handleSave}
            onClose={() => setShowForm(false)}
          />
        )}
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

      {/* Buttons */}
      <div className="flex justify-end space-x-4 p-3 bg-gray-100 border-t border-gray-300">
        <button onClick={handleAdd} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">
          Add
        </button>
      </div>
    </div>
  );
};

// Main Component
const WorkCenter = () => {
  return (
    <div className="relative">
      <WorkCenterMaster />
      <WorkCenterTable />
    </div>
  );
};

WorkCenterForm.propTypes = {
  workCenter: PropTypes.object.isRequired, // Adjust based on actual data type
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default WorkCenter;
