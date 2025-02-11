# Omniswift

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Description

This project is built on react (Next) and uses tailwind, scss and shadcn for styling and components as well as custom animation. Efforts in place to preserve api requests.

Links to packages are listed at the bottom.

## Requirement

- Node 20+
- Npm or Yarn

## Setup

Make sure to install the dependencies first:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

## Structure

```
Root/
├── app/
│   ├── components/
│   │   ├── Form.tsx
│   │   ├── SelectField.tsx
│   │   └── Loader.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── global.scss
│   │   └── transitions.scss
│   ├── layout.tsx
│   └── page.tsx
├── components/ui/
│   └── dialog.tsx
├── lib/
│   ├── axios.ts
│   ├── store.ts
│   └── utils.ts
├── public/
│   ├── img/
│   ├── svgs/
│   └── screenshort1.jpeg
└── README.md
```

## Useful Link

Visit the <a href="https://omniswift-test.netlify.app/" target="_blank">deployment</a> for a live preview.
