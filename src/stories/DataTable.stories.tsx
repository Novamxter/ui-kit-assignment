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
DataTable component

A reusable table component for displaying structured data with features:
- Column definitions with headers, accessors, and optional sorting
- Row selection (single or multiple)
- Loading state while fetching data
- Empty state message when no data is available
- Custom column widths and formatting

Props:
- data: Array of objects representing table rows
- columns: Array of column definitions, each with:
    - id: Unique column identifier
    - header: Column header text
    - accessor: Key or function to extract cell value
    - sortable?: Enable column sorting (optional)
    - width?: Column width (optional)
- selectable: Enable row selection (default: false)
- getRowId: Function to return a unique row ID (required if selectable)
- loading: Show loading spinner (default: false)
- emptyMessage: Message to display when no rows are available

Accessibility:
- Rows and cells have proper semantic markup
- Supports keyboard navigation if selectable

Example usage:
\`\`\`tsx
<DataTable
  data={users}
  columns={[
    { id: 'name', header: 'Name', accessor: 'name', sortable: true },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'age', header: 'Age', accessor: 'age', sortable: true, width: '80px' },
  ]}
  selectable
  getRowId={(user) => user.id}
  loading={false}
  emptyMessage="No users found."
/>
\`\`\`
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
