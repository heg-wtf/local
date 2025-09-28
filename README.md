# HEG Gallery

A modern image gallery web application showcasing local restaurants, travel destinations, and hidden gems across Korea. Built with Next.js 15 and featuring a responsive design with advanced filtering capabilities.

## Features

- Interactive Image Gallery: Browse through curated images of local spots
- Advanced Tag Filtering: Filter images by categories like location, cuisine type, and activities
- Modal Image Viewer: Full-screen image viewing with navigation controls
- Responsive Design: Optimized for desktop, tablet, and mobile devices
- SEO Optimized: Structured data and meta tags for better search visibility
- Static Export: Ready for deployment on GitHub Pages or any static hosting

## Tech Stack

- Framework: Next.js 15 with App Router
- Language: TypeScript
- Styling: Tailwind CSS 4
- UI Components: Radix UI primitives
- Icons: Lucide React
- Image Processing: Sharp
- OCR: Tesseract.js

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

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd heg/local
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The static files will be generated in the `docs/` directory, ready for deployment.

## Data Structure

The application uses a JSON-based data structure located in `public/data/images.json`:

```typescript
interface Image {
  id: number;
  filename: string;
  title: string;
  description?: string;
  tags: string[];
}

interface GalleryData {
  images: Image[];
  tags: Tag[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalImages: number;
    totalTags: number;
  };
}
```

## Deployment

This project is configured for static export and can be deployed to:

- GitHub Pages: The build output is in the `docs/` directory
- Vercel: Automatic deployment with zero configuration
- Netlify: Drag and drop the `docs/` folder
- Any static hosting service

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Images

1. Add image files to `public/images/` directory
2. Update `public/data/images.json` with new image metadata
3. Ensure proper tagging for filtering functionality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.