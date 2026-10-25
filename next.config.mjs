import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This app's own folder: the meta repo's lockfile above it would otherwise be taken as the root.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
