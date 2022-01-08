import React, { useCallback, useState } from "react";

import { SearchBox, Icon } from "@ahaui/react";
import styled from "styled-components";
import { device } from "../../utils/mediaQuery";
import debounce from "lodash.debounce";
import { useRef } from "react";
import { getPostsAction } from "../../store/reducers/postsReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Banner() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const { page, items_per_page } = useSelector((state) => state.posts);
  console.log("trc khi goi", { page, items_per_page });
  const debouncedCallApi = useRef(
    debounce(
      (nextValue) =>
        dispatch(
          getPostsAction({ page: 1, items_per_page, search: nextValue })
        ),
      400
    )
  ).current;

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    debouncedCallApi(value);
  };

  return (
    <StyledBanner>
      <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--8G3GSc8q--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vahl9yw6xgo1a2fedl0u.jpg"></img>
      <StyledSearchBox
        placeholder="Search..."
        buttonText={<Icon size="medium" name="search" />}
        buttonIcon={null}
        value={searchText}
        onChange={handleChange}
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
  @media ${device.mobileL} {
    min-width: 220px;
  }
  .Button {
    padding: 0px;
  }
`;
