import { queryKeysFactory } from "../../lib/query-key-factory";
import { sdk } from "../../lib/client";
import {
  SalesRefsResponse,
  SalesRefFilterParams,
  SalesRefResponse,
} from "../../../types/sales-ref";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ClientHeaders, FetchError } from "@medusajs/js-sdk";
import { quoteQueryKey } from "./quotes";

export const salesRefQueryKey = queryKeysFactory("sales_ref");

// TODO: don't use any type
export const useSalesRefs = (
  query: SalesRefFilterParams,
  options?: UseQueryOptions<
    SalesRefsResponse,
    FetchError,
    SalesRefsResponse,
    QueryKey
  >
) => {
  const fetchSalesRefs = (
    query: SalesRefFilterParams,
    headers?: ClientHeaders
  ) => {
    return sdk.client.fetch<SalesRefsResponse>(`/admin/sales-ref`, {
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

export const useSalesRef = (
  id: string,
  query?: SalesRefFilterParams,
  options?: UseQueryOptions<
    SalesRefResponse,
    FetchError,
    SalesRefResponse,
    QueryKey
  >
) => {
  const fetchSalesRef = (
    id: string,
    query?: SalesRefFilterParams,
    headers?: ClientHeaders
  ) => {
    return sdk.client.fetch<SalesRefResponse>(`/admin/sales-ref/${id}`, {
      query,
      headers,
    });
  };

  const { data, ...rest } = useQuery({
    queryFn: () => fetchSalesRef(id, query),
    queryKey: quoteQueryKey.detail(id),
    ...options,
  });

  return { ...data, rest };
};
