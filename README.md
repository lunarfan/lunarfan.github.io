# LunarFan Homepage

Phase 1 delivers two homepage versions:

- Temporary GitHub Pages static version (short-lived)
- Docker container version (long-term replacement)

## Local Development

```bash
npm install
npm run dev
```

## Build Static Output (for GitHub Pages)

```bash
npm run build
# static files generated in ./out
```

## Run Docker Version

```bash
docker compose up --build
# open http://localhost:8080
```

## Assets

- `public/logo.png` for header logo
- `public/home_page_illustration.png` for second-section right illustration

## Notes

- GitHub Pages is temporary and should stop receiving updates after Docker deployment is fully in place.
