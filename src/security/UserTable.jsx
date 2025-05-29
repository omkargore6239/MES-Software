import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const UserTable = () => {
  return (
    <div className="w-full max-w-full mx-auto border border-b-2 bg-gray-100 shadow-md p-1">
    <div className="flex justify-between items-center p-3">
      <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
        USER TABLE
      </label>
      <div className="relative w-full max-w-4xl p-1">
        <div className="flex flex-wrap md:flex-nowrap whitespace-nowrap items-center gap-x-3 gap-y-2 justify-end">
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
  
  );
};

const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    user || {
      userId: "",
      empId: "",
      userName: "",
      password: "",
      dept: "",
      role: "",
      workCenters: "",
      designation: "",
      email: "",
      phone: "",
      status: "Active",
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
    
    {/* Modal Title */}
    <h3 className="text-lg font-bold mb-4">
      {user ? "Edit User" : "Add User"}
    </h3>

    {/* Form */}
    <form onSubmit={handleSubmit} autoComplete="off" className="grid grid-cols-2 gap-4">
      
      {/* Dynamic Form Fields */}
      {[
        { label: "Username", name: "username" },
        { label: "Password", name: "password" },
        { label: "Dept", name: "dept" },
        { label: "Role", name: "role" },
        { label: "WorkCenters", name: "workcenter" },
        { label: "Designation", name: "designation" },
        { label: "Email", name: "email" }, // Fixed typo from "Emai" to "Email"
        { label: "Phone", name: "phone" },
        { label: "Status", name: "status" },
      ].map((field, i) => (
        <div key={i} className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="border p-2 w-full mt-2 "
          />
        </div>
      ))}

      {/* Action Buttons */}
      <div className="col-span-2 flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md "
        >
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
    { userId: "1002", empId: "1002", userName: "Ganesh", password: "****", dept: "SMS", role: "LHF Operator", workCenters: "LHF1, LHF2", designation: "VC", email: "Ganesh@gmail.com", phone: "7788445512", status: "Active" },
    { userId: "2543", empId: "2543", userName: "Ashok", password: "****", dept: "Quality", role: "Quality Manager", workCenters: "LHF2, LHF1", designation: "Manager", email: "Ashok@gmail.com", phone: "9632587412", status: "Active" },
    { userId: "1234", empId: "1234", userName: "Rajesh", password: "****", dept: "Production", role: "Supervisor", workCenters: "WC1, WC2", designation: "Lead", email: "Rajesh@gmail.com", phone: "8123456789", status: "Active" },
    { userId: "4569", empId: "4569", userName: "Suresh", password: "****", dept: "Maintenance", role: "Technician", workCenters: "WC3, WC4", designation: "Senior Tech", email: "Suresh@gmail.com", phone: "7894561230", status: "Active" },
    { userId: "8765", empId: "8765", userName: "Vikram", password: "****", dept: "Production", role: "Machine Operator", workCenters: "LHF3", designation: "Operator", email: "Vikram@gmail.com", phone: "9988776655", status: "Inactive" },
    { userId: "6789", empId: "6789", userName: "Ramesh", password: "****", dept: "Logistics", role: "Transport Manager", workCenters: "Warehouse", designation: "Manager", email: "Ramesh@gmail.com", phone: "8899001122", status: "Active" },
    { userId: "7894", empId: "7894", userName: "Mahesh", password: "****", dept: "Inventory", role: "Stock Controller", workCenters: "Storage1, Storage2", designation: "Executive", email: "Mahesh@gmail.com", phone: "9988223344", status: "Active" },
    { userId: "5236", empId: "5236", userName: "Sunil", password: "****", dept: "SMS", role: "Operator", workCenters: "LHF1", designation: "Junior Operator", email: "Sunil@gmail.com", phone: "7766554433", status: "Inactive" },
    { userId: "4456", empId: "4456", userName: "Pankaj", password: "****", dept: "Production", role: "Line Supervisor", workCenters: "LHF4", designation: "Supervisor", email: "Pankaj@gmail.com", phone: "6677889900", status: "Active" },
    { userId: "5541", empId: "5541", userName: "Anil", password: "****", dept: "Quality", role: "Inspector", workCenters: "WC5", designation: "QC Inspector", email: "Anil@gmail.com", phone: "1122334455", status: "Active" },
    { userId: "6325", empId: "6325", userName: "Mohan", password: "****", dept: "Production", role: "Shift Manager", workCenters: "LHF3, LHF4", designation: "Manager", email: "Mohan@gmail.com", phone: "9900112233", status: "Active" },
    { userId: "7485", empId: "7485", userName: "Dinesh", password: "****", dept: "Security", role: "Security Officer", workCenters: "Main Gate", designation: "Officer", email: "Dinesh@gmail.com", phone: "7788991122", status: "Inactive" },
    { userId: "8521", empId: "8521", userName: "Vikas", password: "****", dept: "HR", role: "HR Manager", workCenters: "Office", designation: "Manager", email: "Vikas@gmail.com", phone: "6655443322", status: "Active" },
    { userId: "9632", empId: "9632", userName: "Sanjay", password: "****", dept: "Planning", role: "Scheduler", workCenters: "Planning Office", designation: "Executive", email: "Sanjay@gmail.com", phone: "5544332211", status: "Active" },
    { userId: "7415", empId: "7415", userName: "Deepak", password: "****", dept: "IT", role: "System Admin", workCenters: "Server Room", designation: "Admin", email: "Deepak@gmail.com", phone: "4433221100", status: "Active" },
    { userId: "1111", empId: "1111", userName: "Pankaj", password: "****", dept: "Inventory", role: "LHF Operator", workCenters: "LHF1, LHF2", designation: "VC", email: "Ganesh@gmail.com", phone: "7788445512", status: "Active" },
    { userId: "2455", empId: "2455", userName: "Mohan", password: "****", dept: "Production", role: "Quality Manager", workCenters: "LHF2, LHF1", designation: "Manager", email: "Ashok@gmail.com", phone: "9632587412", status: "Active" },
    { userId: "3001", empId: "3001", userName: "Vikas", password: "****", dept: "Maintenance", role: "Supervisor", workCenters: "WC1, WC2", designation: "Lead", email: "Rajesh@gmail.com", phone: "8123456789", status: "Active" },
    { userId: "4521", empId: "4521", userName: "Deepak", password: "****", dept: "Quality", role: "Technician", workCenters: "WC3, WC4", designation: "Senior Tech", email: "Suresh@gmail.com", phone: "7894561230", status: "Active" },
    { userId: "7685", empId: "7685", userName: "Ramesh", password: "****", dept: "Production", role: "Machine Operator", workCenters: "LHF3", designation: "Operator", email: "Vikram@gmail.com", phone: "9988776655", status: "Inactive" },
    { userId: "7845", empId: "7845", userName: "Vikram", password: "****", dept: "Logistics", role: "Transport Manager", workCenters: "Warehouse", designation: "Manager", email: "Ramesh@gmail.com", phone: "8899001122", status: "Active" },
    { userId: "8965", empId: "8965", userName: "Mahesh", password: "****", dept: "Stat", role: "Stock Controller", workCenters: "Storage1, Storage2", designation: "Executive", email: "Mahesh@gmail.com", phone: "9988223344", status: "Active" },
    { userId: "9999", empId: "9999", userName: "Sunil", password: "****", dept: "SMS", role: "Operator", workCenters: "LHF1", designation: "Junior Operator", email: "Sunil@gmail.com", phone: "7766554433", status: "Inactive" },
    { userId: "7414", empId: "7414", userName: "Ganesh", password: "****", dept: "Production", role: "Line Supervisor", workCenters: "LHF4", designation: "Supervisor", email: "Pankaj@gmail.com", phone: "6677889900", status: "Active" },
    { userId: "2323", empId: "2323", userName: "Anil", password: "****", dept: "Quality", role: "Inspector", workCenters: "WC5", designation: "QC Inspector", email: "Anil@gmail.com", phone: "1122334455", status: "Active" },
    { userId: "4444", empId: "4444", userName: "Ashok", password: "****", dept: "Production", role: "Shift Manager", workCenters: "LHF3, LHF4", designation: "Manager", email: "Mohan@gmail.com", phone: "9900112233", status: "Active" },
    { userId: "2222", empId: "2222", userName: "Rajesh", password: "****", dept: "Logistics", role: "Security Officer", workCenters: "Main Gate", designation: "Officer", email: "Dinesh@gmail.com", phone: "7788991122", status: "Inactive" },
    { userId: "6666", empId: "6666", userName: "Dinesh", password: "****", dept: "HR", role: "HR Manager", workCenters: "Office", designation: "Manager", email: "Vikas@gmail.com", phone: "6655443322", status: "Active" },
    { userId: "7777", empId: "7777", userName: "Sanjay", password: "****", dept: "IT", role: "Scheduler", workCenters: "Planning Office", designation: "Executive", email: "Sanjay@gmail.com", phone: "5544332211", status: "Active" },
    { userId: "8888", empId: "8888", userName: "Suresh", password: "****", dept: "Planning", role: "System Admin", workCenters: "Server Room", designation: "Admin", email: "Deepak@gmail.com", phone: "4433221100", status: "Active" },
    { userId: "9999", empId: "9999", userName: "Suresh", password: "****", dept: "Planning", role: "System Admin", workCenters: "Server Room", designation: "Admin", email: "Deepak@gmail.com", phone: "4433221100", status: "Active" },
    { userId: "1000", empId: "1000", userName: "Suresh", password: "****", dept: "Planning", role: "System Admin", workCenters: "Server Room", designation: "Admin", email: "Deepak@gmail.com", phone: "4433221100", status: "Active" },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleAdd = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    try {
      setTableData((prevData) => prevData.filter((item) => item[0] !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const handleSave = (user) => {
    if (editingUser) {
      setTableData(tableData.map((item) => (item.userId === editingUser.userId ? user : item)));
    } else {
      setTableData([...tableData, user]);
    }
    setShowForm(false);
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
    <div className="mt-4 w-full max-w-full mx-auto">
      <div className="relative border border-gray-300 shadow-lg rounded-lg bg-white overflow-x-auto whitespace-nowrap">
        <table className="p-4 w-full min-w-[1100px] border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-teal-600 text-white text-base font-bold">
              {["USER ID", "EMP ID", "USER NAME","PASSWORD", "DEPT", "ROLE", "WORK CENTERS","DESIGNATIONS", "EMAIL","PHONE","STATUS", "ACTIONS"].map((heading, i) => (
                <th key={i} className="border border-gray-300 p-4 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((user, index) => (
              <tr key={index} className="bg-white text-black text-center">
                {Object.values(user).map((cell, colIndex) => (
                  <td key={colIndex} className="text-sm border border-gray-300 px-4 py-2 text-start">
                    {cell}
                  </td>
                ))}
                <td className="border p-2">
                                <button onClick={() => handleEdit(user)} className="text-blue-500 px-2">
                  <AiOutlineEdit />
                </button>
                <button onClick={() => handleDelete([0])} className="text-red-500 px-2">
                  <AiOutlineDelete />
                  </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
          
      {showForm && <UserForm user={editingUser} onSave={handleSave} onClose={() => setShowForm(false)} />}
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
    
    
    <div className="flex justify-end space-x-4 p-4 bg-gray-100 border-t border-gray-300">
          <button onClick={handleAdd} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">
            Add User
          </button>
        </div>
      </div>
  );
};

const App = () => {
  return (
    <div className="relative">
      <UserTable />
      <TableComponent />
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default App;