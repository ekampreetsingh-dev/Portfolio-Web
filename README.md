# Ekampreet Singh — portfolio

Static build of a React portfolio. The source lives in `src-app/`; the repository root holds the compiled output that Vercel serves.

## Rebuild

```bash
cd src-app
npm install
npm run build
cp -r dist/assets dist/images dist/index.html dist/og.jpg ..
```

Then commit the refreshed `index.html`, `assets/`, `images/` and `og.jpg` at the root.

## Stack

React 19, Vite, Tailwind CSS v4, Motion. Flagship project: [TaskSphere Workspace](https://tasksphere-workspace-web.vercel.app/).
