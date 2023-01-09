# Update. As of 1/9/2023 this public repo will no longer be updated.

# Share Polls App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Getting Started

Prerequisite:

- MySQL local database (or Planetscale connection using PScale CLI)
- npm

Setup

1. Clone repo
1. `npm install`
1. Create `.env` file if one does not already exist ([example .env file here](https://github.com/ChloeWhen117/sharepolls-public/blob/master/.env.example))
1. Add connection URLs for both database and shadow db to .env
1. Initialize database - `npx prisma migrate dev`
1. Run dev server `npm run dev`

## Author
Chloe Nguyen
