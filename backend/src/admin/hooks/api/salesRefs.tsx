import { queryKeysFactory } from "../../lib/query-key-factory";
import { sdk } from "../../lib/client";
import {
  SalesRefsResponse,
  SalesRefFilterParams,
  SalesRefResponse,
  AdminCreateSalesRef,
} from "../../../types/sales-ref";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
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

export const useCreateSalesRef = (
  options?: UseMutationOptions<
    SalesRefResponse,
    FetchError,
    AdminCreateSalesRef
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (salesRef: AdminCreateSalesRef) => {
      return await sdk.client.fetch("/admin/sales-ref", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: salesRef,
      });
    },
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({ queryKey: salesRefQueryKey.list() });
      queryClient.invalidateQueries({
        queryKey: salesRefQueryKey.detail(data.id),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useDeleteSalesRef = (
  options?: UseMutationOptions<void, FetchError>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (salesRefId: string) =>
      sdk.client.fetch(`/admin/sales-ref/${salesRefId}`, {
        method: "DELETE",
      }),
    onSuccess: (data: any, variables: any, context: any) => {
      queryClient.invalidateQueries({
        queryKey: salesRefQueryKey.list(),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
