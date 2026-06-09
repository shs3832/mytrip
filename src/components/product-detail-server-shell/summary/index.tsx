import { FetchTravelproductForDetailQuery } from "@/commons/graphql/graphql";

export function ProductDetailSummaryComponent({
  data,
}: {
  data: FetchTravelproductForDetailQuery;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-600 text-base font-medium">
        {data?.fetchTravelproduct?.remarks}
      </p>
      <div className="tags flex items-center gap-2">
        {data?.fetchTravelproduct?.tags?.map((tag: string) => (
          <span key={tag} className="text-blue-500 text-base font-medium">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
