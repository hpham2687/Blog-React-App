import { SearchBox } from "@ahaui/react";
import debounce from "lodash.debounce";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPostsAction } from "store/postsSlice";
import { device } from "utils/mediaQuery";

export default function Banner() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { items_per_page } = useSelector((state) => state.posts);

  const debouncedCallApi = useRef(
    debounce(
      (searchValue) =>
        dispatch(
          getPostsAction({ page: 1, items_per_page, search: searchValue })
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
      <img alt="banner" src="/assets/images/banner.jpeg"></img>
      <StyledSearchBox
        placeholder="Search..."
        value={searchText}
        sizeControl="large"
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
  input {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .Button {
    padding: 0px 6px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;
