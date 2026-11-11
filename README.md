# EATnaked Clone

A responsive frontend recreation of [EATnaked](https://eatnaked.co/), built with React, Vite, React Router, and Tailwind CSS. It includes the meal and juice catalogs, scroll animations on the home page, and pages for the community, FAQs, contact, and account forms.

The contact, login, registration, and password reset forms demonstrate client-side validation. The project has no backend, so the forms do not send messages, create accounts, or deliver password reset emails. The Bowl Builder route is a placeholder.

## Run locally

Use Node.js 22.13 or a newer LTS release and npm.

```sh
git clone https://github.com/Hassanstarr/eatnakedClone.git
cd eatnakedClone
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) or use the URL Vite prints in the terminal.

To build and preview the production bundle locally:

```sh
npm run build
npm run preview
```

Vite writes the build to `dist/`. If you host it on a static server, configure it to serve `index.html` for routes such as `/our-menu` so direct links and refreshes work.

## Project structure

| Path | Contents |
| --- | --- |
| `src/App.jsx` | Route definitions |
| `src/pages/` | Page components |
| `src/components/` | Shared layout, navigation, forms, and controls |
| `src/styles/global.css` | Tailwind theme, fonts, and global styles |
| `src/hooks/` | Scroll and reveal behavior |
| `src/data/` | Menu and testimonial data |
| `public/assets/` | Images, fonts, media, and home animation frames |

## Branch workflow

Start new work from the latest `production` branch. On GitHub, open a pull request from your branch into `production`. When the changes are ready to release, open a pull request from `production` into `main`.
