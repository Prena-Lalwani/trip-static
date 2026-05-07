# Demo Site

Static read-only demo of the Raahi AI trip planner. No backend, no auth — everything loads from `/demo.json`.

## Setup

**1. Export real data from the database:**
```bash
cd ..
python export_demo_data.py
```

**2. Install dependencies:**
```bash
cd demo-site
npm install
```

**3. Run locally:**
```bash
npm run dev
```

**4. Build for production:**
```bash
npm run build
```

## Deploy on Vercel

- Push the `demo-site/` folder to a **separate** GitHub repo
- Connect that repo to Vercel
- Build command: `npm run build`
- Output directory: `dist`
- No environment variables needed

## Notes

- `public/demo.json` is the only data source — regenerate it any time by re-running the export script
- The chat input is visible but disabled (read-only demo)
- Confirm buttons on steps are disabled
- Plan card "Pick this" buttons are disabled
