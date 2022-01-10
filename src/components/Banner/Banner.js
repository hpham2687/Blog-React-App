import { SearchBox } from "@ahaui/react";
import debounce from "lodash.debounce";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPostsAction } from "store/reducers/postsReducer";
import { device } from "utils/mediaQuery";

export default function Banner() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { items_per_page } = useSelector((state) => state.posts);

  const debouncedCallApi = useRef(
    debounce(
      (searchValute) =>
        dispatch(
          getPostsAction({ page: 1, items_per_page, search: searchValute })
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
      <img
        alt="banner"
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--8G3GSc8q--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vahl9yw6xgo1a2fedl0u.jpg"
      ></img>
      <StyledSearchBox
        placeholder="Search..."
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
