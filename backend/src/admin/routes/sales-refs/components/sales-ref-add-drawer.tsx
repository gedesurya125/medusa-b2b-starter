import { Button, Drawer, Input, Text, toast } from "@medusajs/ui";
import { Form } from "../../../components/common/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { useCreateSalesRef } from "../../../hooks/api/salesRefs";

export const CreateSalesRefForm = z.object({
  name: z.string().min(1),
  username: z.string(),
  password: z.string(),
  bc_sales_code: z.string(),
});

export function SalesRefAddDrawer({
  ...props
}: React.ComponentProps<typeof Drawer>) {
  const createSalesRefMutation = useCreateSalesRef();

  const form = useForm<z.infer<typeof CreateSalesRefForm>>({
    defaultValues: async () => {
      return {
        name: "",
        username: "",
        password: "",
        bc_sales_code: "",
      };
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("this is the submited data", data);
    await createSalesRefMutation.mutateAsync(
      {
        name: data.name,
        username: data.username,
        password: data.password,
        bc_sales_code: data.bc_sales_code,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Success create a sales ref", {
            position: "top-right",
          });
          props && props?.onOpenChange?.(false);
        },
      }
    );
  });

  return (
    <Drawer {...props}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Add Sales Ref</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-4">
          <Form {...form}>
            <form className="grid gap-y-3">
              <Form.Field
                control={form.control}
                name="name"
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>Name</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                    </Form.Item>
                  );
                }}
              />
              <Form.Field
                control={form.control}
                name="username"
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>Username</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                    </Form.Item>
                  );
                }}
              />
              <Form.Field
                control={form.control}
                name="password"
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>Password</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                    </Form.Item>
                  );
                }}
              />
              <Form.Field
                control={form.control}
                name="bc_sales_code"
                render={({ field: { ref, ...field } }) => {
                  return (
                    <Form.Item>
                      <Form.Label>Business central sales code</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                    </Form.Item>
                  );
                }}
              />
            </form>
          </Form>
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
      {/* <DrawerBody /> */}
    </Drawer>
  );
}

const DrawerBody = () => {
  const createSalesRefMutation = useCreateSalesRef();

  const form = useForm<z.infer<typeof CreateSalesRefForm>>({
    defaultValues: async () => {
      return {
        name: "",
        username: "",
        password: "",
        bc_sales_code: "",
      };
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    console.log("this is the submited data", data);
    await createSalesRefMutation.mutateAsync(
      {
        name: data.name,
        username: data.username,
        password: data.password,
        bc_sales_code: data.bc_sales_code,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Success create a sales ref", {
            position: "top-right",
          });
        },
      }
    );
  });

  return (
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Add Sales Ref</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body className="p-4">
        <Form {...form}>
          <form className="grid gap-y-3">
            <Form.Field
              control={form.control}
              name="name"
              render={({ field: { ref, ...field } }) => {
                return (
                  <Form.Item>
                    <Form.Label>Name</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                  </Form.Item>
                );
              }}
            />
            <Form.Field
              control={form.control}
              name="username"
              render={({ field: { ref, ...field } }) => {
                return (
                  <Form.Item>
                    <Form.Label>Username</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                  </Form.Item>
                );
              }}
            />
            <Form.Field
              control={form.control}
              name="password"
              render={({ field: { ref, ...field } }) => {
                return (
                  <Form.Item>
                    <Form.Label>Password</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                  </Form.Item>
                );
              }}
            />
            <Form.Field
              control={form.control}
              name="bc_sales_code"
              render={({ field: { ref, ...field } }) => {
                return (
                  <Form.Item>
                    <Form.Label>Business central sales code</Form.Label>
                    <Form.Control>
                      <Input {...field} />
                    </Form.Control>
                  </Form.Item>
                );
              }}
            />
          </form>
        </Form>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close asChild>
          <Button variant="secondary">Cancel</Button>
        </Drawer.Close>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </Drawer.Footer>
    </Drawer.Content>
  );
};
