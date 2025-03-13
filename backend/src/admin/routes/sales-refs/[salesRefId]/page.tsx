import { useParams } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { useSalesRef } from "../../../../admin/hooks/api/salesRefs";
import { Text } from "@medusajs/ui";

const SalesRefDetail = () => {
  const { salesRefId } = useParams();

  const { salesRef } = useSalesRef(salesRefId || "");

  console.log("this is the single sales ref", salesRef);

  return (
    <div className="flex flex-col gap-y-3">
      <Container title={`Sales Detail`} contentCollapse>
        <ul className="list-none">
          <ListItem label="#id" value={salesRef?.id || ""} />
          <ListItem label="name" value={salesRef?.name || ""} />
          <ListItem label="username" value={salesRef?.username || ""} />
          <ListItem label="password" value={salesRef?.password || ""} />
          <ListItem
            label="Business Central Code"
            value={salesRef?.bc_sales_code || ""}
          />
        </ul>
      </Container>
      <Container title={`Assigned Companies`}></Container>
    </div>
  );
};

export default SalesRefDetail;

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <li className="text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4 [&:not(:first-of-type)]:border-t-2">
      <Text className="font-medium font-sans txt-compact-small">{label}</Text>
      <Text className="text-sm text-pretty">{value}</Text>
    </li>
  );
};
