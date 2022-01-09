import React from "react";
import { Skeleton } from "@ahaui/react";

export default function PostListSkeleton({ num }) {
  return (
    <div className="u-flex u-flexWrap u-justifyContentAround u-paddingSmall">
      {[...Array(10).keys()].map((index) => (
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
