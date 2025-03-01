import React from "react";
// ? Add Custom Field: Step 14: add the widget to the product page https://docs.medusajs.com/learn/customization/customize-admin/widget#2-add-widget-to-product-details-page

import { clx, Container as MedusaContainer, Heading } from "@medusajs/ui";

import { EllipsisHorizontal, PencilSquare, Plus, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";

interface ContainerProps extends MenuProps {
  title: string;
  children?: React.ReactNode;
}

export const Container = ({
  onClickMenuAdd,
  onClickMenuDelete,
  onClickMenuEdit,
  children,
  title,
}: ContainerProps) => {
  return (
    <MedusaContainer className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">{title}</Heading>
        </div>
        <Menu
          onClickMenuAdd={onClickMenuAdd}
          onClickMenuEdit={onClickMenuEdit}
          onClickMenuDelete={onClickMenuDelete}
        />
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        {children}
      </div>
    </MedusaContainer>
  );
};

interface MenuProps {
  onClickMenuAdd?: () => void;
  onClickMenuEdit?: () => void;
  onClickMenuDelete?: () => void;
}

export function Menu({
  onClickMenuAdd,
  onClickMenuDelete,
  onClickMenuEdit,
}: MenuProps) {
  if (!onClickMenuAdd && !onClickMenuDelete && !onClickMenuEdit) return null;
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <IconButton variant="transparent">
          <EllipsisHorizontal />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {onClickMenuAdd && (
          <DropdownMenu.Item className="gap-x-2">
            <Plus className="text-ui-fg-subtle" />
            Add
          </DropdownMenu.Item>
        )}
        {onClickMenuEdit && (
          <DropdownMenu.Item className="gap-x-2">
            <PencilSquare className="text-ui-fg-subtle" />
            Edit
          </DropdownMenu.Item>
        )}
        {onClickMenuDelete && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-x-2">
              <Trash className="text-ui-fg-subtle" />
              Delete
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
