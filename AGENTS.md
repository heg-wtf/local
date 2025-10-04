# AGENTS.md

## Project Overview

This is a Next.js 15 image gallery application showcasing local restaurants, travel destinations, and hidden gems across Korea. The project uses TypeScript, Tailwind CSS 4, and Radix UI components for a modern, responsive design.

## Setup Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Run linting: `npm run lint`

## Development Environment

- Node.js 18+ required
- Uses npm as package manager
- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Tailwind CSS 4 for styling

## Code Style

- TypeScript strict mode
- Single quotes preferred
- No semicolons
- Use functional components with hooks
- Prefer composition over inheritance
- Use Radix UI primitives for accessibility

## Build and Test Commands

- `make build` - Production build
- `make serve` - Serve built files locally
- `make test` - Run linting and type checking
- `make dev` - Start development server
- `make clean` - Clean build artifacts

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── gallery/         # Gallery-specific components
│   ├── seo/            # SEO components
│   └── ui/             # Reusable UI components
├── lib/                # Utility functions
└── types/              # TypeScript type definitions

public/
├── data/               # JSON data files
└── images/             # Image assets organized by category
```

## Data Management

- Image metadata stored in `public/data/images.json`
- Images organized by category in `public/images/`
- Use proper tagging for filtering functionality
- Maintain consistent naming conventions

## Deployment

- Static export configured for GitHub Pages
- Build output goes to `docs/` directory
- Images optimized with Sharp
- SEO optimized with structured data

## Testing Instructions

- Run `npm run lint` before committing
- Ensure TypeScript compilation passes
- Test responsive design on multiple screen sizes
- Verify image loading and filtering functionality
- Check SEO meta tags and structured data

## Security Considerations

- No sensitive data in client-side code
- Images served from public directory
- Static export eliminates server-side vulnerabilities
- Use environment variables for any API keys

## Common Tasks

- Adding new images: Place in `public/images/` and update `images.json`
- Creating components: Use shadcn/ui CLI with `npx shadcn@latest add <component>`
- Styling: Use Tailwind CSS classes, avoid custom CSS
- SEO: Update meta tags in `src/components/seo/`

## Troubleshooting

- If build fails, check TypeScript errors first
- Image loading issues: Verify file paths in `images.json`
- Styling problems: Check Tailwind CSS class names
- Performance: Use Next.js Image component for optimization

## commit/push rule 
- git commit only use English
- Always update the `tags` section in `images.json` to include all tags used in the images.
- before git push, must run `make build` 