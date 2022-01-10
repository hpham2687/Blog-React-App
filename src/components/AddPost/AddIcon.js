import { device } from "utils/mediaQuery";
import styled from "styled-components";

export const AddIcon = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  border: 1px solid var(--colorPrimary);
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: white;
  z-index: 2;

  transition: all 0.2s ease-out;
  &:hover {
    &:before {
      left: 0;
    }
    svg {
      color: blue;
    }
  }
  &:before {
    transition: all 0.2s ease-out;
    z-index: 1;
    content: "";
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 10px;
    right: 0;
    bottom: 0;
    background: var(--colorPrimary);
    opacity: 0.2;
  }

  @media ${device.mobileL} {
    width: 50px;
    height: 50px;
  }
`;
