import { queryKeysFactory } from "../../lib/query-key-factory";
import { sdk } from "../../lib/client";
import {
  SalesRefResponse,
  SalesRefFilterParams,
} from "../../../types/sales-ref";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ClientHeaders, FetchError } from "@medusajs/js-sdk";

export const salesRefQueryKey = queryKeysFactory("sales_ref");

// TODO: don't use any type
export const useSalesRefs = (
  query: SalesRefFilterParams,
  options?: UseQueryOptions<
    SalesRefResponse,
    FetchError,
    SalesRefResponse,
    QueryKey
  >
) => {
  const fetchSalesRefs = (
    query: SalesRefFilterParams,
    headers?: ClientHeaders
  ) => {
    return sdk.client.fetch<SalesRefResponse>(`/admin/sales-ref`, {
      query,
      headers,
    });
  };
  const { data, ...rest } = useQuery({
    ...options,
    queryFn: () => fetchSalesRefs(query)!,
    queryKey: salesRefQueryKey.list(),
  });
  return { ...data, ...rest };
};
