# UI Kit -- Frontend Assignment

This project is part of my frontend assignment where I had to build a
small UI component library using **React, TypeScript, Tailwind CSS, and
Storybook**.\
The main focus was on creating **reusable and accessible components**,
documenting them properly, and showcasing different states and variants
through Storybook.

------------------------------------------------------------------------

## Tech Stack

-   React + TypeScript (with Vite setup)\
-   Tailwind CSS (for styling and dark mode support)\
-   Storybook (for documentation and testing components)

------------------------------------------------------------------------

## Components

### 1. InputField

This is a fully reusable input component that supports:\
- Variants: `outlined`, `filled`, `ghost`\
- Sizes: `sm`, `md`, `lg`\
- States: normal, invalid, disabled, loading\
- Features like labels, helper/error text, optional clear button, and
password toggle\
- Works with both light and dark mode

### 2. DataTable

A data table component with:\
- Sorting support\
- Row selection (checkboxes)\
- Loading state overlay\
- Empty state message\
- Accessibility with proper `aria` attributes\
- Dark mode styling

------------------------------------------------------------------------

## Storybook

All the components are showcased in Storybook with proper examples and
documentation.\
- Each component has a **Playground story** where props can be tested
live.\
- Additional stories show special states like `Invalid`, `Loading`, or
`Empty`.\
- A **Docs tab** has notes and best practices for using the components.

To run Storybook locally:

``` bash
npm run storybook
```

------------------------------------------------------------------------

## How to Run the Project

1.  Clone the repository

    ``` bash
    git clone https://github.com/your-username/ui-kit.git
    cd ui-kit
    ```

2.  Install dependencies

    ``` bash
    npm install
    ```

3.  Start the Vite dev server

    ``` bash
    npm run dev
    ```

4.  Run Storybook

    ``` bash
    npm run storybook
    ```

------------------------------------------------------------------------

## Dark Mode

Dark mode is enabled through Storybook's toolbar (Light/Dark toggle).\
The components automatically switch styles using Tailwind's `dark:`
classes when dark mode is active.

------------------------------------------------------------------------

## Notes

-   The project is mainly about **components and their documentation in
    Storybook**, not a full app.\
-   I have cleaned up unnecessary files and kept only what's needed.\
-   The final deliverables are:
    -   GitHub repo link\
    -   Deployed Storybook link (Chromatic / Vercel / Netlify)

------------------------------------------------
