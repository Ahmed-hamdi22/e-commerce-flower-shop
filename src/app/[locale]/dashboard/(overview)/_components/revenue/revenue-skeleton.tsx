import { Skeleton } from "@/components/ui/skeleton";

export default function RevenueSkeleton() {
  return (
    <div className="mt-6 space-y-6 px-4 lg:ms-4 lg:px-0">
      {/* Chart skeleton */}
      <div className="flex flex-col gap-6 xl:flex-row">
        <Skeleton className="h-[381px] w-full rounded-xl xl:w-[276px]" />

        <Skeleton className="flex-1 h-[381px] rounded-xl" />
      </div>

      {/* Table skeletons */}
      <div className="flex flex-col gap-6 xl:flex-row">
        <Skeleton className="h-[300px] w-full rounded-xl xl:w-[536px]" />

        <Skeleton className="h-[300px] w-full rounded-xl xl:w-[536px]" />
      </div>
    </div>
  );
}
