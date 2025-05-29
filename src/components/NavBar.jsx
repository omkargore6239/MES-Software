import PropTypes from "prop-types";
import profile from "../assets/profile.jpg";
const NavBar = ({ handleLogout }) => {
  return (
    <nav className="bg-violet-800 text-white shadow-md fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3">
      {/* Left Side - Heading */}
      <h1 className="text-2xl font-bold">MES Dashboard</h1>

      {/* Right Side - Profile Section & Logout Button */}
      <div className="flex items-center space-x-4">
        <span className="text-sm">Welcome, User</span>
        <img
          src={profile} // Replace with actual profile image
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

NavBar.propTypes ={
  handleLogout:PropTypes.func.isRequired,
};


export default NavBar;
