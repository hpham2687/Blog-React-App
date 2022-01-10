import React from "react";
import { Skeleton } from "@ahaui/react";
import PropTypes from "prop-types"; // ES6

PostListSkeleton.propTypes = {
  num: PropTypes.number.isRequired,
};

export default function PostListSkeleton({ num }) {
  return (
    <div className="u-flex u-flexWrap u-justifyContentAround u-paddingSmall">
      {[...Array(num).keys()].map((index) => (
        <div key={index} className="">
          <Skeleton width={250} height={200} />
          <div className=" u-flexGrow1 u-paddingSmall">
            <Skeleton width="60%" />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  );
}
