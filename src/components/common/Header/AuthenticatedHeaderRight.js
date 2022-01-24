/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dropdown, Icon } from "@ahaui/react";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "store/authSlice";
import styled from "styled-components";
import { notifyPositive } from "utils/toast";

export default function AuthenticatedHeaderRight() {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const HeaderDropdown = (
    <div className="u-marginRightSmall">
      <Icon name="contact" size="medium" />
      {user.username}
      <Icon size="extraSmall" name="arrowDown" />
    </div>
  );

  return (
    <Wrapper>
      <div className="u-flex u-alignItemsCenter u-textRight">
        <Dropdown alignRight>
          <Dropdown.Toggle className="fu-lineHeightNone">
            {HeaderDropdown}
          </Dropdown.Toggle>
          <Dropdown.Container>
            <StyledDropdown>
              <Link to="/manage">
                <Icon name="speedometer" size="small" />
                <span className="u-marginLeftExtraSmall">Manage Posts</span>
              </Link>
            </StyledDropdown>
            <StyledDropdown
              onClick={() => {
                dispatch(logout());
                notifyPositive({ message: "Log out successfully." });
              }}
            >
              <a href="#">
                <Icon name="power" size="small" />
                <span className="u-marginLeftExtraSmall">Logout</span>{" "}
              </a>
            </StyledDropdown>
          </Dropdown.Container>
        </Dropdown>
      </div>
    </Wrapper>
  );
}

const StyledDropdown = styled(Dropdown.Item)`
  padding: 4px 16px;
  cursor: pointer;
  a {
    display: flex;
    color: black;
    text-decoration: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
