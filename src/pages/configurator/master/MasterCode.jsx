import { useState ,useEffect ,useMemo } from "react";
import { FaEdit } from "react-icons/fa";
import Pagination from "../../../components/Pagination";
import PropTypes from "prop-types";

const MasterCodeTable = ({ setSelectedGroup }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ groupCode: "", description: "", status: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const [tableData, setTableData] = useState([
    { id: 1, groupCode: "Department", description: "Department types", status: "Active" },
    { id: 2, groupCode: "Branch", description: "Branch Types", status: "Active" },
    { id: 3, groupCode: "Prefix", description: "Prefix Types", status: "Active" },
    { id: 4, groupCode: "Product_Type", description: "Product Types", status: "Active" },
    { id: 5, groupCode: "Product_category", description: "Product Categories", status: "Active" },
    { id: 6, groupCode: "WorkCenter_type", description: "WorkCenters Types", status: "Active" },
    { id: 7, groupCode: "WorkCenter_location", description: "WorkCenters Locations", status: "Active" },
  ]);

  // Search filter
  const filteredData = tableData.filter((item) =>
    item.groupCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic applied to filtered data
  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleRowClick = (groupCode) => {
    const selectedGroupData = tableData.find((item) => item.groupCode === groupCode);
    if (selectedGroupData && selectedGroupData.status === "Active") {
      setSelectedRow(groupCode);
      setSelectedGroup(groupCode);
    } else {
      setSelectedRow(null);
      setSelectedGroup(null);
    }
  };
  const openModal = (data = { id: null, groupCode: "", description: "", status: "Active" }) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({ id: null, groupCode: "", description: "", status: "Active" });
  };

  const handleStatusToggle = (id) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" } : row
      )
    );
  };

  const handleSave = () => {
    if (modalData.id) {
      setTableData((prevData) =>
        prevData.map((row) => (row.id === modalData.id ? modalData : row))
      );
    } else {
      setTableData([...tableData, { ...modalData, id: tableData.length + 1 }]);
    }
    closeModal();
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto p-4">
      <div className="border-b-2 bg-gray-100 shadow-md p-2 flex justify-between items-center">
        <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md">Group Code</label>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search Group Code..."
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse border border-gray-300 text-sm mt-2">
        <thead>
          <tr className="bg-teal-600 text-white text-base">
            {["", "Group Code", "Description", "Status", "Actions"].map((heading, i) => (
              <th key={i} className="border border-gray-300 p-4 text-left">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((data, index) => (
            <tr
              key={data.id}
              className={`cursor-pointer text-center ${selectedRow === data.groupCode ? "bg-yellow-300" : "bg-white"}`}
              onClick={() => handleRowClick(data.groupCode)}
            >
              <td className="border px-4 py-2 text-start">{index + 1}</td>
              <td className="border px-4 py-2 text-start">{data.groupCode}</td>
              <td className="border px-4 py-2 text-start">{data.description}</td>
              <td className="border px-4 py-2 text-start">
                <button
                  className={`px-3 py-1 rounded-md text-sm font-semibold 
                  ${data.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusToggle(data.id);
                  }}
                >
                  {data.status}
                </button>
              </td>
              <td className="border p-2 flex justify-center gap-2">
                <button className="text-blue-500 px-2" onClick={(e) => { e.stopPropagation(); openModal(data); }}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      <div className="flex justify-end space-x-4 p-3 bg-gray-100 border-t border-gray-300">
        <button onClick={() => openModal()} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">Add</button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{modalData.id ? "Edit Group Code" : "Add Group Code"}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Group Code</label>
              <input type="text" value={modalData.groupCode} onChange={(e) => setModalData({ ...modalData, groupCode: e.target.value })} className="w-full border p-2 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input type="text" value={modalData.description} onChange={(e) => setModalData({ ...modalData, description: e.target.value })} className="w-full border p-2 rounded-md" />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




const CodeAttributeTable = ({ selectedGroup }) => {
  const groupData = useMemo(() => ({
    Department: [
      { id: 1, code: "Design", description: "Design Department", status: "Active" },
      { id: 2, code: "Production", description: "Production Department", status: "Active" },
      { id: 3, code: "Inventory", description: "Inventory Department", status: "Active" },
      { id: 4, code: "Logistics", description: "Logistics Department", status: "Active" },
      { id: 5, code: "Quality", description: "Quality Department", status: "Active" },
      { id: 6, code: "Maintainance", description: "Maintainance Department", status: "Active" },
    ],
    Branch: [
      { id: 1, code: "Wakad", description: "Wakad Branch", status: "Active" },
      { id: 2, code: "Kurli", description: "Kurli Branch", status: "Active" },
      { id: 3, code: "Katraj", description: "Katraj Branch", status: "Active" },
    ],
    Prefix: [
      { id: 1, code: "#EMP", description: "Employee Prefix", status: "Active" },
      { id: 2, code: "#CUST", description: "Customer Prefix", status: "Active" },
      { id: 3, code: "#PROD", description: "Product Prefix", status: "Active" },
      { id: 4, code: "#VEND", description: "Vendor Prefix", status: "Active" },
      { id: 5, code: "#INVO", description: "Invoice Prefix", status: "Active" },
      { id: 6, code: "#QUO", description: "Quotation Prefix", status: "Active" },
      { id: 7, code: "#BILL", description: "Bill Prefix", status: "Active" },
      { id: 8, code: "#PUR", description: "Purchase Prefix", status: "Active" },
      { id: 9, code: "#EXP", description: "Expense Prefix", status: "Active" },
      { id: 10, code: "#WOR", description: "Workcenter Prefix", status: "Active" },
    ],
    Product_Type: [
      { id: 1, code: "Goods", description: "Physical goods", status: "Active" },
      { id: 2, code: "Services", description: "Non-physical goods", status: "Active" },
    ],
    Product_category: [
      { id: 1, code: "FINISHED_GOODS", description: "Finished goods", status: "Active" },
      { id: 2, code: "RAW_MATERIAL", description: "Raw Materials", status: "Active" },
      { id: 3, code: "CONSUMABLE", description: "Consumable", status: "Active" },
      { id: 4, code: "SCRAP", description: "Scrap products", status: "Active" },
    ],
    WorkCenter_type: [
      { id: 1, code: "CNC_Grinding_Machine", description: "Grinding Machine", status: "Active" },
      { id: 2, code: "CNC_Laser_Cutter", description: "Laser Cutter", status: "Active" },
      { id: 3, code: "CNC_Plasma_Cutter", description: "Plasma Cutter", status: "Active" },
      { id: 4, code: "CNC_Router", description: "Router Type", status: "Active" },
    ],
    WorkCenter_location: [
      { id: 1, code: "Shop_Floor_A", description: "Shop A", status: "Active" },
      { id: 2, code: "Shop_Floor_B", description: "Shop B", status: "Active" },
      { id: 3, code: "Shop_Floor_C", description: "Shop C", status: "Active" },
      { id: 4, code: "Shop_Floor_D", description: "Shop D", status: "Active" },
    ],
  }), []);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ id: null, code: "", description: "", status: "Active" });
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  useEffect(() => {
    setTableData(groupData[selectedGroup] || []);
    setCurrentPage(1);
  }, [groupData, selectedGroup]);

  const filteredData = tableData.filter((item) =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const displayedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const openModal = (data = { id: null, code: "", description: "", status: "Active" }) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({ id: null, code: "", description: "", status: "Active" });
  };

  const handleStatusToggle = (id) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: row.status === "Active" ? "Inactive" : "Active" } : row
      )
    );
  };
  const handleSave = () => {
    if (modalData.id) {
      setTableData((prevData) =>
        prevData.map((row) => (row.id === modalData.id ? modalData : row))
      );
    } else {
      setTableData([...tableData, { ...modalData, id: tableData.length + 1 }]);
    }
    closeModal();
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg bg-white overflow-auto p-4">
      <div className="border-b-2 bg-gray-100 shadow-md p-2 flex justify-between items-center">
        <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md"> Code Attributes</label>
        <input
          type="text"
          placeholder="Search Code..."
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse border border-gray-300 text-sm mt-2">
        <thead>
          <tr className="bg-teal-600 text-white text-base">
            {['SI NO', 'Code', 'Description', 'Status', 'Actions'].map((heading, i) => (
              <th key={i} className="border p-4 text-left">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((data, index) => (
            <tr key={data.id} className="text-black text-center">
              <td className="border px-4 py-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td className="border px-4 py-2">{data.code}</td>
              <td className="border px-4 py-2">{data.description}</td>
              <td className="border px-4 py-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${data.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                  onClick={() => handleStatusToggle(data.id)}
                >
                  {data.status}
                </button>
              </td>
              <td className="border p-2 flex justify-center">
                <button className="text-blue-500 px-2" onClick={() => openModal(data)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      <div className="flex justify-end space-x-4 p-3 bg-gray-100 border-t border-gray-300">
        <button onClick={() => openModal()} className="bg-green-900 text-white px-5 py-2 rounded-md shadow-md">Add</button>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{modalData.id ? "Edit Code Attribute" : "Add Code Attribute"}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Code</label>
              <input type="text" value={modalData.code} onChange={(e) => setModalData({ ...modalData, code: e.target.value })} className="w-full border p-2 rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input type="text" value={modalData.description} onChange={(e) => setModalData({ ...modalData, description: e.target.value })} className="w-full border p-2 rounded-md" />
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const MasterCode = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="w-full mx-auto p-6">  
      <div className="grid grid-cols-2 gap-6">
        <MasterCodeTable setSelectedGroup={setSelectedGroup} />
        <CodeAttributeTable selectedGroup={selectedGroup} />
      </div>
    </div>
  );
};
MasterCodeTable.propTypes = {
  setSelectedGroup: PropTypes.func.isRequired, // Ensures setSelectedGroup is a function
};
CodeAttributeTable.propTypes = {
  selectedGroup: PropTypes.string,
}

export default MasterCode;
