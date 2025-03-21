import React from "react";
// ? Add Custom Field: Step 14: add the widget to the product page https://docs.medusajs.com/learn/customization/customize-admin/widget#2-add-widget-to-product-details-page

import { clx, Container as MedusaContainer, Heading } from "@medusajs/ui";

import { EllipsisHorizontal, PencilSquare, Plus, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton } from "@medusajs/ui";

interface ContainerProps extends MenuProps {
  title: string;
  contentCollapse?: boolean;
  children?: React.ReactNode;
}

export const Container = ({
  onClickMenuAdd,
  onClickMenuDelete,
  onClickMenuEdit,
  children,
  title,
  contentCollapse,
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
        className={clx(`text-ui-fg-subtle items-center py-4`, {
          "px-6": !contentCollapse,
        })}
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
          <DropdownMenu.Item className="gap-x-2" onClick={onClickMenuAdd}>
            <Plus className="text-ui-fg-subtle" />
            Add
          </DropdownMenu.Item>
        )}
        {onClickMenuEdit && (
          <DropdownMenu.Item className="gap-x-2" onClick={onClickMenuEdit}>
            <PencilSquare className="text-ui-fg-subtle" />
            Edit
          </DropdownMenu.Item>
        )}
        {onClickMenuDelete && (
          <>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-x-2" onClick={onClickMenuDelete}>
              <Trash className="text-ui-fg-subtle" />
              Delete
            </DropdownMenu.Item>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
