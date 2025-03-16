import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import {
  useDeleteSalesRef,
  useSalesRef,
} from "../../../../admin/hooks/api/salesRefs";
import { Text, toast, useToggleState } from "@medusajs/ui";
import { DeletePrompt } from "../components/table/delete-prompt";
import { AssignedCompanyContainer } from "./components";

const SalesRefDetail = () => {
  const { salesRefId } = useParams();
  const navigate = useNavigate();

  const deleteSalesRefMutation = useDeleteSalesRef();

  const [isPromptOpen, openPrompt, closePrompt, togglePrompt] =
    useToggleState();

  const { salesRef } = useSalesRef(salesRefId || "");

  if (!salesRef) return null;

  console.log("this is the fetched sales ref", salesRef);

  return (
    <div className="flex flex-col gap-y-3">
      <Container
        title={`Sales Detail`}
        contentCollapse
        onClickMenuDelete={openPrompt}
        onClickMenuEdit={() => {}}
      >
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
        <DeletePrompt
          open={isPromptOpen}
          onOpenChange={togglePrompt}
          handleDelete={() => {
            deleteSalesRefMutation.mutate(salesRefId, {
              onSuccess: () => {
                toast.success("Sales ref has been deleted");
                navigate("../");
              },
            });
          }}
        />
      </Container>
      <AssignedCompanyContainer
        companies={salesRef?.companies}
        salesRef={salesRef}
      />
    </div>
  );
};

export default SalesRefDetail;

const ListItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <li className="text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4 [&:not(:first-of-type)]:border-t-[1px]">
      <Text className="font-medium font-sans txt-compact-small">{label}</Text>
      <Text className="text-sm text-pretty">{value}</Text>
    </li>
  );
};
