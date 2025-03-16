import { Button, FocusModal, Heading, Input, Label, Text } from "@medusajs/ui";
import { useCompanies } from "../../../../../../src/admin/hooks/api";
import { BriefCompanyTable, BriefCompanyTableProps } from "./BriefCompanyTable";
import { useAddCompanyToSalesRef } from "../../../../../../src/admin/hooks/api/salesRefs";
import { ModuleSalesRef, SalesRefWithLinkedCompanies } from "@starter/types";

interface AddCompanyModalProps extends React.ComponentProps<typeof FocusModal> {
  salesRef: SalesRefWithLinkedCompanies;
}

export function AddCompanyModal({ salesRef, ...props }: AddCompanyModalProps) {
  const { data, isPending } = useCompanies();
  const addCompanyToSalesRef = useAddCompanyToSalesRef();

  return (
    <FocusModal {...props}>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button>Save</Button>
        </FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div className="flex w-full max-w-lg flex-col gap-y-8">
            <div className="flex flex-col gap-y-1">
              <Heading>CompanyList</Heading>
              <Text className="text-ui-fg-subtle">
                Select a company to be assigned to the sales ref
              </Text>
            </div>
          </div>
          <BriefCompanyTable
            companies={data?.companies
              .filter((companyItem) => {
                const isCurrentCompanyLinkedAlready =
                  salesRef?.companies?.length > 0
                    ? salesRef?.companies?.findIndex(
                        (linkedCompanyItem) =>
                          linkedCompanyItem.id === companyItem.id
                      ) !== -1
                    : false;

                return !isCurrentCompanyLinkedAlready;
              })
              .map((companyItem) => ({
                id: companyItem.id,
                name: companyItem.name,
                address: companyItem.address,
                email: companyItem.email,
                customer_group: companyItem.customer_group,
                currency_code: companyItem.currency_code,
                logo_url: companyItem.logo_url,
              }))}
            onClickRowAddButton={async (company) => {
              await addCompanyToSalesRef.mutateAsync({
                companyId: company.id,
                salesRefId: salesRef.id,
              });
            }}
          />
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
