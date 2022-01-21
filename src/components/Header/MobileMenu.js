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

export default function MobileMenu({ onClose, isLoggedIn }) {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(logout());
    onClose();
  };
  return (
    <MobileMenuWrapper>
      <CloseMenuIcon onClick={onClose} size="medium" name="close" />
      <ul>
        {!isLoggedIn ? (
          <>
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
              <Link to="/manage">Manage Post</Link>
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
`;

const MobileMenuWrapper = styled.div`
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: space-evenly;
    li {
      border-bottom: 1px solid #eee;
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
  }
`;
