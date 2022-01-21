import { Icon } from "@ahaui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "store/authSlice";
import PropTypes from "prop-types";

MobileMenu.propTypes = {
  onClose: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

const style = {
  left: "0px",
};
export default function MobileMenu({ onClose, isLoggedIn, isOpenMobileMenu }) {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(logout());
    onClose();
  };
  return (
    <MobileMenuWrapper style={isOpenMobileMenu ? style : null}>
      <CloseMenuIcon onClick={onClose} size="medium" name="close" />
      <ul>
        {!isLoggedIn ? (
          <>
            <li className="logo-mobile">KRISS BLOG</li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/manage">Manage Posts</Link>
            </li>
            <li>
              <span style={{ cursor: "pointer" }} onClick={handleClickLogout}>
                Log out
              </span>
            </li>
          </>
        )}
      </ul>
    </MobileMenuWrapper>
  );
}
const CloseMenuIcon = styled(Icon)`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: black;
`;

const MobileMenuWrapper = styled.div`
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 100%;
  width: 100%;
  z-index: 100;
  transition: all 0.25s linear;
  ul {
    li {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      a,
      span {
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        text-decoration: none;
        color: black;
      }
    }
    .logo-mobile {
      color: black;
      font-size: 1.4rem;
      font-weight: 400;
    }
  }
`;
