import React from "react";
import "../src/index.css";
import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        showName: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story, context) => {
      // apply .dark class to body or html
      if (context.globals.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return React.createElement(
        "div",
        { className: "p-6 min-h-screen bg-white dark:bg-neutral-900" },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
