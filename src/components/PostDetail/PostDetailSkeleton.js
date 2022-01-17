import React from "react";
import { Skeleton } from "@ahaui/react";

export default function PostDetailSkeleton() {
  return (
    <div aria-label="loading" data-testid="Loading">
      <Skeleton width={700} height={200} />
      <div className=" u-flexGrow1 u-paddingSmall">
        <Skeleton width="60%" />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
