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
**Usage:**
- Always provide a \`label\` for accessibility.
- Use \`helperText\` for hints and \`errorMessage\` for validation issues.
- For passwords, set \`type="password"\` and enable \`togglePassword\`.
- Use \`variant\` and \`size\` props for consistent UI.

**Best Practices:**
- Keep labels short and clear.
- Don’t overload helper text with long paragraphs.
- Show error messages only when validation fails.
- Prefer outlined or filled variants for forms; ghost for minimal UI.
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
