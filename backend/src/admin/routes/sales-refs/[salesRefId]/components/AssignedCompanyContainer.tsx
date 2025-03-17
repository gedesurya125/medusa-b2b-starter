import React from "react";
import { Container } from "../../../../../../src/admin/components/common/Container";
import { Table, Text, useToggleState } from "@medusajs/ui";
import { CompanyDTO } from "../../../../../../src/modules/company/types/common";
import { AddCompanyModal } from "./AddCompanyModal";
import {
  BriefCompanyTable,
  RequiredCompanyFieldsOnBriefTable,
} from "./BriefCompanyTable";
import { SalesRefWithLinkedCompanies } from "@starter/types";
import { useDeleteCompanyFromSalesRef } from "../../../../../../src/admin/hooks/api/salesRefs";

export const AssignedCompanyContainer = ({
  companies,
  salesRef,
}: {
  companies?: CompanyDTO[];
  salesRef: SalesRefWithLinkedCompanies;
}) => {
  const [
    isAddCompanyModalOpen,
    openAddCompanyModal,
    closeAddCompanyModal,
    toggleOpenAddCompanyModal,
  ] = useToggleState();

  const deleteCompanyFromSalesRef = useDeleteCompanyFromSalesRef();

  const handleCompanyDelete = (company: RequiredCompanyFieldsOnBriefTable) => {
    console.log("Hi i am cliecked");

    deleteCompanyFromSalesRef.mutate({
      salesRefId: salesRef.id,
      companyId: company.id,
    });
  };

  return (
    <Container
      title={`Assigned Companies`}
      onClickMenuAdd={() => openAddCompanyModal()}
    >
      <BriefCompanyTable
        companies={companies}
        onClickRowDeleteButton={handleCompanyDelete}
      />
      <AddCompanyModal
        open={isAddCompanyModalOpen}
        onOpenChange={toggleOpenAddCompanyModal}
        salesRef={salesRef}
      />
    </Container>
  );
};
