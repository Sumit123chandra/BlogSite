import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // requires `lucide-react` for icons

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight hover:scale-105 transition">
          BlogSite
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/create" className="hover:text-yellow-300 transition duration-300">
                Create Post
              </Link>
              <span className="text-sm font-semibold">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-yellow-300 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center text-lg bg-blue-600 py-4 rounded-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Home</Link>

          {user ? (
            <>
              <Link to="/create" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">
                Create Post
              </Link>
              <span className="text-sm">Hi, {user.username}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-white text-blue-700 px-4 py-1 rounded-full hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
