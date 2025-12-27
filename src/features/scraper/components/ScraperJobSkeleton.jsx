import React from "react";
import Skeleton, { SkeletonParagraph } from "../../../ui/Feedback/Skeleton";

/**
 * Skeleton wrapper using Skeleton primitive
 */
export default function ScraperJobSkeleton() {
  return (
    <div className="p-4">
      <SkeletonParagraph lines={2} />
      <div className="mt-3">
        <Skeleton width="full" height="4" />
      </div>
    </div>
  );
}
