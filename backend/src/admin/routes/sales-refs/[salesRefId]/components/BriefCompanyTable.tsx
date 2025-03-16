import { Button, Table } from "@medusajs/ui";
import { CompanyDTO } from "src/modules/company/types/common";

export type RequiredCompanyFieldsOnBriefTable = {
  id: string;
  name: string;
  address: string | null;
  email: string;
  customer_group?: { name: string };
  currency_code: string | null;
  logo_url: string | null;
};

export interface BriefCompanyTableProps {
  companies?: RequiredCompanyFieldsOnBriefTable[];
  onClickRowAddButton?: (company: RequiredCompanyFieldsOnBriefTable) => void;
}

export const BriefCompanyTable = ({
  companies,
  onClickRowAddButton,
}: BriefCompanyTableProps) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {/* <Table.HeaderCell>Id</Table.HeaderCell> */}
          <Table.HeaderCell>Logo</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Address</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Customer Group</Table.HeaderCell>
          <Table.HeaderCell>Currency Code</Table.HeaderCell>
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
              {/* <Table.Cell>{company.id}</Table.Cell> */}
              <Table.Cell>
                <CompanyLogo src={company?.logo_url} alt={""} />
              </Table.Cell>
              <Table.Cell>{company.name}</Table.Cell>
              <Table.Cell>{company.address}</Table.Cell>
              <Table.Cell>{company.email}</Table.Cell>
              <Table.Cell>{company?.customer_group?.name}</Table.Cell>
              <Table.Cell>{company.currency_code?.toUpperCase()}</Table.Cell>
              {onClickRowAddButton && (
                <Table.Cell>
                  <Button onClick={() => onClickRowAddButton(company)}>
                    + Add
                  </Button>
                </Table.Cell>
              )}
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
