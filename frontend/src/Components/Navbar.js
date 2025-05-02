import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav
        className="navbar  bg-dark border-bottom navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Bibliotek
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* WEBSITE COMPONENTS */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 middle">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/books">
                  Books
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/faq">
                  Help
                </a>
              </li>
            </ul>
            {/* Profile */}
            <div className='profile' >
              <ul className="navbar-nav me-auto mb-1 mb-lg-0">
                <li className="nav-item dropdown">
                <button
                  type="button"
                  className="user-menu-button nav-link dropdown-toggle"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                >
                  <span className="focus-overlay"></span>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
                  <ul className="dropdown-menu small">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Account Info
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="/logout">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
