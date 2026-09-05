import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link
          to={isAuthenticated ? "/analyzer" : "/login"}
          className="nav-logo"
          title="ResumeAI"
        >
          <span className="logo-icon">✦</span>
          <span className="logo-text">ResumeAI</span>
        </Link>

        {/* Navigation Links / Actions */}
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link
                to="/analyzer"
                className={`nav-link ${isActive("/analyzer") ? "active" : ""}`}
              >
                Dashboard
              </Link>

              {user?.email && (
                <div className="nav-user-badge" title={user.email}>
                  <span className="user-dot"></span>
                  <span className="user-name">{user.name || user.email}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="nav-btn nav-btn-outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-btn nav-btn-ghost ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`nav-btn nav-btn-primary ${isActive("/signup") ? "active" : ""}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;