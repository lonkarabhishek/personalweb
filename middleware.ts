import { rewrite, next } from '@vercel/edge';

// Runs on the edge BEFORE static files are served, so it can serve a different
// HTML document (with its own metadata) for the studio subdomain. A vercel.json
// rewrite cannot do this: "/" matches index.html on the filesystem first.
export const config = {
  matcher: '/',
};

export default function middleware(request: Request) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  if (host === 'studio.workwithabhi.online') {
    return rewrite(new URL('/studio.html', request.url));
  }
  return next();
}
