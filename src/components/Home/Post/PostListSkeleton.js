import React from "react";
import { Skeleton } from "@ahaui/react";

export default function PostListSkeleton({ num }) {
  return (
    <div className="u-flex u-flexWrap u-justifyContentAround">
      {[...Array(10).keys()].map(() => (
        <div className="u-paddingSmall">
          <Skeleton width={250} height={200} />
          <div className="u-marginLeftSmall u-flexGrow1">
            <Skeleton width="60%" />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      ))}
    </div>
  );
}
