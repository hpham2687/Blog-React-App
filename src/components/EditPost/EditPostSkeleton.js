import React from "react";
import { Skeleton } from "@ahaui/react";

export default function EditPostSkeleton() {
  return (
    <>
      <Skeleton width={500} height={200} />
      <div className=" u-flexGrow1 u-paddingSmall">
        <Skeleton width="60%" />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
}
