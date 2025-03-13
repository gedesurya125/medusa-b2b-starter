import { useQueryParams } from "../../../../hooks/use-query-params";

export const useSalesRefTableQuery = ({
  pageSize = 50,
  prefix,
}: {
  pageSize?: number;
  prefix?: string;
}) => {
  const raw = useQueryParams(["q", "offset"], prefix);

  const { offset, ...rest } = raw;
  const searchParams = {
    ...rest,
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
  };

  return { searchParams, raw };
};
