import { useState } from "react";
import PropTypes from "prop-types";
const RoleScreen = () => {
  return (
    <div className="w-full max-w-full border border-b-2 bg-gray-100 shadow-md p-2 hidden md:block">
  <div className="flex justify-between items-center gap-4">
    {/* Left-aligned ROLE DEFINITION label */}
    <label className="bg-emerald-700 text-white px-3 py-2 font-bold rounded-md w-fit">
      ROLE DEFINITION
    </label>


      {/* ROLE NAME dropdown */}
      <div className="flex items-center gap-x-4">
      <div className=" border bg-gray-200 shadow-md p-2 flex items-center gap-x-4">
        <label className="font-bold text-black">ROLE NAME</label>
        <select className="bg-white border border-gray-300 text-sm p-1 h-8 w-auto md:w-[150px] focus:ring-2 focus:ring-blue-500">
          <option value="admin">ADMIN</option>
          <option value="champ">CHAMP</option>
        </select>
      </div>
      <div className="ml-3">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-2 px-2 sm:px-4 rounded-md shadow-md transition duration-200">
            Search
          </button>
        </div>
    {/* Right-aligned Search Bar & Role Name */}
  
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</div>
      );
    };


  const Modules = ({ setScreenPermissions, selectedModule, setSelectedModule }) => {
    const moduleData = [
      "PLTCM_TEST", "UD", "EMB", "CTL", "SORT", "RW", "PROF", "MASTER_SCHEDULE",
      "TACH", "HRS", "MASTER_PRODUCTION", "FINISHING", "MASTER_PLANNING", "PACKAGING",
      "CGL", "CRM", "CCL", "SCHEDULING", "MASTER", "PLANNING", "PRODUCTION", "PLTCM", "QUALITY"
    ];

    // Initially, all checkboxes are unchecked
    const modulePermissions = moduleData.reduce((acc, module) => {
      acc[module] = Array(9).fill().map(() => Array(5).fill(false)); // All checkboxes unchecked
      return acc;
    }, {});

    // Click handler for assigning a module's screen permissions
    const handleModuleClick = (module) => {
      setSelectedModule(module);
      setScreenPermissions(modulePermissions[module]); // Assign module-specific data to screen
    };

    return (
      <div className="w-[20%]  border shadow-md p-2 flex flex-col">
        <div className="bg-emerald-700 text-white p-1 font-bold rounded-se-xl w-[40%]">
          MODULES
        </div>

        <div className="mt-2 flex flex-col">
          <div className="bg-teal-600 text-white p-2 font-bold">MODULE NAME</div>
          <div className="h-[60vh] overflow-y-auto border border-black">
            <table className="w-full border-collapse">
              <tbody>
                {moduleData.map((module, i) => (
                  <tr
                    key={i}
                    className={`${selectedModule === module ? "bg-yellow-400" : "bg-white"} border border-black cursor-pointer`}
                    onClick={() => handleModuleClick(module)}
                  >
                    <td className="p-2 text-start">{module}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

const Screens = ({ screenPermissions, setScreenPermissions }) => {
  const screenData = [
    "CGL PDO", "CGL ENTRY PULPIT", "CGL PDI", "CGL PROD UPDATE", "CGL PRODUCTION RECORDING",
    "ZINC TRANSFER", "SHIFT WISE ZINC POSTING", "ZINC STORAGE", "GALV CHARGING"
  ];

  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (rowIndex, colIndex) => {
    const updatedState = screenPermissions.map((row, i) =>
      row.map((col, j) => (i === rowIndex && j === colIndex ? !col : col))
    );
    setScreenPermissions(updatedState);
  };

  const handleSelectAll = () => {
    const newState = screenPermissions.map(() => Array(5).fill(!selectAll));
    setScreenPermissions(newState);
    setSelectAll(!selectAll);
  };

  return (
    <div className="w-[80%] border shadow-md p-2">
      <div className="flex justify-between items-center p-1">
        <div className="bg-emerald-700 text-white p-1 font-bold rounded-se-xl w-[13%]">SCREENS</div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={handleSelectAll}
            className="bg-blue-500 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700"
          >
            {selectAll ? "Unselect All" : "Select All"}
          </button>
          <button className="bg-gray-400 text-black px-2 py-1 rounded shadow-md">Save</button>
        </div>
      </div>

      <div className="overflow-x-auto border border-black">
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th rowSpan="2" className="p-2 border border-black text-start">SCREEN NAME</th>
              <th colSpan="5" className="p-2 border border-black text-center">AUTHENTICATION FOR SCREEN</th>
            </tr>
            <tr className="bg-teal-600 text-white">
              {["ASSIGN", "INSERT", "UPDATE", "SELECT", "DELETE"].map((text, i) => (
                <th key={i} className="p-1 border border-black text-start">{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {screenData.map((screen, rowIndex) => (
              <tr key={rowIndex} className= "bg-white border border-black">
                <td className="p-1 border border-black">{screen}</td>
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="p-2 border border-black text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={screenPermissions[rowIndex][colIndex]}
                      onChange={() => handleCheckboxChange(rowIndex, colIndex)}
                    />
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

const RoleScreenComponent = () => {
  // Default permissions (Initially false for all)
  const [screenPermissions, setScreenPermissions] = useState(
    Array(9).fill().map(() => Array(5).fill(false))
  );

  // State for selected module to highlight row
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className=" w-full h-full p-4 overflow-hidden flex flex-col">
      <RoleScreen />
      <div className="flex flex-wrap mt-2 w-full h-[90%] overflow-hidden">
        <Modules setScreenPermissions={setScreenPermissions} selectedModule={selectedModule} setSelectedModule={setSelectedModule} />
        <Screens screenPermissions={screenPermissions} setScreenPermissions={setScreenPermissions} />
      </div>
    </div>
  );
};

Modules.propTypes = {
  setScreenPermissions: PropTypes.object.isRequired, // Adjust based on actual data type
  selectedModule: PropTypes.object.isRequired,
  setSelectedModule: PropTypes.object.isRequired,
};

Screens.propTypes = {
  setScreenPermissions: PropTypes.func.isRequired, // Function to update permissions
  screenPermissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Adjust based on your actual data structure
      name: PropTypes.string.isRequired, // Example fields
      permissions: PropTypes.object, // Adjust if permissions have a specific structure
    })
  ).isRequired,
};


export default RoleScreenComponent;
