import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Forms/InputField",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
InputField component

A reusable input component with support for:
- Standard HTML input types (text, password, email, etc.)
- Internal state management for controlled/uncontrolled inputs
- Helper text, error messages, and accessibility attributes
- Optional icons or adornments

Props:
- id: Unique identifier for the input; auto-generated if not provided
- type: Input type, e.g., 'text', 'password', 'email'
- label: Label text displayed above the input
- placeholder: Placeholder text inside the input
- value: Current value of the input (for controlled inputs)
- onChange: Callback function triggered on input change
- helperText: Optional helper text displayed below the input
- error: Optional error message to display
- disabled: Disable input interaction if true
- required: Marks input as required
- icon: Optional icon to display inside the input

Accessibility:
- Uses \`aria-describedby\` for helper/error text
- Uses \`aria-invalid\` when input has errors

Example usage:
\`\`\`tsx
<InputField
  type="email"
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We'll never share your email."
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["filled", "outlined", "ghost"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      // <div className={globals.theme === 'dark' ? 'dark p-4 bg-neutral-900 min-h-screen' : 'p-4 bg-white min-h-screen'}>
      <div className="max-w-sm">
        <InputField
          {...args}
          value={val}
          onChange={(e) => setVal((e.target as HTMLInputElement).value)}
        />
      </div>
    );
  },
  args: {
    label: "Email",
    placeholder: "you@domain.com",
    helperText: "We will never share your email.",
    variant: "outlined",
    size: "md",
  },
};

export const Invalid: Story = {
  args: {
    label: "Username",
    placeholder: "min 6 chars",
    invalid: true,
    errorMessage: "Username is too short",
  },
};

export const Loading: Story = {
  args: { label: "Searching", loading: true, placeholder: "Type to search…" },
};

export const Password: Story = {
  args: { label: "Password", type: "password", placeholder: "••••••••" },
};
