import { Skeleton, SkeletonText } from "./Skeleton";

const ProductDetailSkeleton = () => (
  <div
    className="mt-10 md:flex md:space-x-10 lg:space-x-24"
    role="status"
    aria-busy="true"
    aria-label="Loading"
  >
    <Skeleton className="md:w-[50%] h-[350px] md:h-[480px] rounded-lg" />

    <div className="md:flex md:flex-col md:justify-center md:w-[50%] mt-10 md:mt-0 space-y-5 lg:space-y-7">
      <Skeleton className="h-3 w-32" />
      <div className="space-y-3">
        <Skeleton className="h-7 lg:h-10 w-3/4" />
        <Skeleton className="h-7 lg:h-10 w-1/2" />
      </div>
      <SkeletonText lines={4} />
      <Skeleton className="h-5 w-24" />
      <div className="flex space-x-4">
        <Skeleton className="h-12 w-28" />
        <Skeleton className="h-12 w-40" />
      </div>
    </div>
  </div>
);

export default ProductDetailSkeleton;
