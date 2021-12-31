import React from "react";

import { SearchBox } from "@ahaui/react";
import styled from "styled-components";
export default function Banner() {
  return (
    <StyledBanner>
      <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8G3GSc8q--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vahl9yw6xgo1a2fedl0u.jpg"></img>
      <StyledSearchBox
        placeholder="Search..."
        buttonText="Search"
        buttonIcon={null}
      />
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  position: relative;
  img {
    display: block;
    width: 100%;
    object-fit: cover;
    max-height: 250px;
    object-position: bottom;
  }
`;

const StyledSearchBox = styled(SearchBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
`;
