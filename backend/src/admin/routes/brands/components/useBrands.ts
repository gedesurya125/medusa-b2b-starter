import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../../lib/sdk";
import { queryKeysFactory } from "../../../../admin/lib/query-key-factory";

export const brandQueryKey = queryKeysFactory("brand");
export type Brand = {
  id: string;
  name: string;
};
export type BrandsResponse = {
  brands: Brand[];
  count: number;
  limit: number;
  offset: number;
};
export const useBrands = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  return useQuery<BrandsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/brands`, {
        query: {
          limit,
          offset,
        },
      }),
    queryKey: brandQueryKey.list([limit, offset]),
  });
};
