import { Prompt } from "@medusajs/ui";

export function DeletePrompt({
  handleDelete,
  ...props
}: React.ComponentProps<typeof Prompt> & {
  handleDelete: () => void;
}) {
  return (
    <Prompt {...props}>
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>Delete something</Prompt.Title>
          <Prompt.Description>
            Are you sure? This cannot be undone.
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel
            onClick={() => {
              props.open && props?.onOpenChange?.(false);
            }}
          >
            Cancel
          </Prompt.Cancel>
          <Prompt.Action onClick={handleDelete}>Delete</Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
}
