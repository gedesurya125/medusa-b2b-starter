import React from "react";
import { Container } from "../../../../../../src/admin/components/common/Container";
import { Table, Text, useToggleState } from "@medusajs/ui";
import { CompanyDTO } from "src/modules/company/types/common";
import { AddCompanyModal } from "./AddCompanyModal";
import { BriefCompanyTable } from "./BriefCompanyTable";

export const AssignedCompanyContainer = ({
  companies,
}: {
  companies?: CompanyDTO[];
}) => {
  const [
    isAddCompanyModalOpen,
    openAddCompanyModal,
    closeAddCompanyModal,
    toggleOpenAddCompanyModal,
  ] = useToggleState();

  return (
    <Container
      title={`Assigned Companies`}
      onClickMenuAdd={() => openAddCompanyModal()}
    >
      <BriefCompanyTable companies={companies} />
      <AddCompanyModal
        open={isAddCompanyModalOpen}
        onOpenChange={toggleOpenAddCompanyModal}
        linkedCompanies={companies}
      />
    </Container>
  );
};
