import React from "react";
import { Container } from "../../../../../../src/admin/components/common/Container";
import { Table, Text } from "@medusajs/ui";
import { CompanyDTO } from "src/modules/company/types/common";

export const AssignedCompanyContainer = ({
  companies,
}: {
  companies?: CompanyDTO[];
}) => {
  return (
    <Container title={`Assigned Companies`}>
      <LinkedCompanyTable companies={companies} />
    </Container>
  );
};

const LinkedCompanyTable = ({ companies }: { companies?: CompanyDTO[] }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Logo</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Customer Group</Table.HeaderCell>
          <Table.HeaderCell className="text-right">
            Currency Code
          </Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {companies?.map((company) => {
          return (
            <Table.Row
              key={company.id}
              className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
            >
              <Table.Cell>
                <CompanyLogo src={company?.logo_url} alt={""} />
              </Table.Cell>
              <Table.Cell>{company.name}</Table.Cell>
              <Table.Cell>{company.address}</Table.Cell>
              <Table.Cell>{company.email}</Table.Cell>
              <Table.Cell>{company?.customer_group?.name}</Table.Cell>
              <Table.Cell className="text-ui-fg-muted">
                {company.currency_code?.toUpperCase()}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const CompanyLogo = ({ src, alt }) => {
  return (
    <img
      src={
        src ||
        "https://assets.codepen.io/t-1/user-default-avatar.jpg?fit=crop&format=auto&height=256&version=0&width=256"
      }
      alt=""
      className="w-10 aspect-square rounded"
    />
  );
};
