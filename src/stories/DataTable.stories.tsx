import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";

type User = { id: string; name: string; email: string; age: number };

const data: User[] = [
  { id: "u1", name: "Mohit Kumar", email: "mohit@demo.com", age: 21 },
  { id: "u2", name: "Bhavesh Kumar", email: "bhavesh@demo.com", age: 31 },
  { id: "u3", name: "Chaman", email: "chaman@demo.com", age: 23 },
];

const columns: Column<User>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "email", header: "Email", accessor: "email" },
  { id: "age", header: "Age", accessor: "age", sortable: true, width: "80px" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Data Display/DataTable",
  component: DataTable<User>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Usage:**
- Pass an array of data objects via \`data\`.
- Define columns with \`header\` and \`accessor\`.
- Enable \`sortable\` on columns where sorting is required.
- Use \`selectable\` and \`onRowSelect\` for multi-row selection.
- Show loading with \`loading={true}\` while fetching data.

**Best Practices:**
- Always provide a unique row ID via \`getRowId\` for stable selection.
- Limit the number of columns for better readability on small screens.
- Avoid overloading tables with too much data; paginate or virtualize if needed.
- Use concise headers and keep cell content short.
- Provide an informative \`emptyMessage\` for empty states.
        `,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = { args: { data, columns } };

export const Sortable: Story = { args: { data, columns } };

export const Selectable: Story = {
  args: {
    data,
    columns,
    selectable: true,
    getRowId: (r) => r.id,
  },
};

export const Loading: Story = { args: { data, columns, loading: true } };

export const Empty: Story = { args: { data: [], columns } };
