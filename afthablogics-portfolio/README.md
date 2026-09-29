# Afthab Logics Analytics Portfolio

Source code for the Afthab Logics data analytics portfolio built with React, Vite, TypeScript, Tailwind CSS, and Lucide icons.

## Included

- Animated dashboard hero with donut chart, bar chart, KPI tiles, and live status header
- Responsive layouts for phone, tablet, laptop, and wide desktop screens
- Permanent Projects section with five project cards
- Uploaded Power BI dashboard previews for Sales Prediction and Customer Orders projects
- Python, Excel, SQL, and Power BI portfolio content
- Gmail, GitHub, LinkedIn, and existing portfolio links
- SEO metadata, robots.txt, and Person structured data

## Run locally

Requirements: Node.js and pnpm.

```bash
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/afthablogics-portfolio run dev
```

Open `http://localhost:5173`.

## Edit profile links

Update the `CONTACTS` object near the top of:

`artifacts/afthablogics-portfolio/src/App.tsx`
