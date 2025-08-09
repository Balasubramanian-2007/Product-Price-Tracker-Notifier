import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Logo animation
const logoGradientMove = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

const GlobalStyle = createGlobalStyle``;

const Logo = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #ff6f61, #ffd6d0, #687583, #ff6f61);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${logoGradientMove} 2.5s linear infinite;
`;

const Nav = styled.nav`
  background: #051524ff;
  color: #fff;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;
  margin: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    background: #222;
    position: absolute;
    top: 70px;
    left: 0;
    width: 90%;
    margin-left: 5%;
    border-radius: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    max-height: ${({ open }) => (open ? "300px" : "0")};
    overflow: hidden;
    gap: 1rem;
    padding: ${({ open }) => (open ? "1rem 0" : "0")};
    transition: max-height 0.3s;
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
  &:hover,
  &.active {
    background: #e72525ff;
    color: #fff;
    box-shadow: 0 4px 16px rgba(255, 111, 97, 0.2);
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 3px;
    width: 25px;
    background: #fff;
    margin: 4px 0;
    border-radius: 2px;
    transition: 0.3s;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

// Menu items
const menuItems = [
  { name: "Home", path: "/home" },
  { name: "Features", path: "/features" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <GlobalStyle />
      <Nav>
        <Logo>PriceTracker</Logo>
        <Hamburger onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu open={open}>
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              style={{ textDecoration: "none" }}
            >
              <MenuItem
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.name}
              </MenuItem>
            </Link>
          ))}

          {token ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MenuItem
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </MenuItem>
            </Link>
          )}
        </Menu>
      </Nav>
    </>
  );
};

export default Navbar;
