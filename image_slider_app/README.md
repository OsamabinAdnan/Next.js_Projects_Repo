# Next.js Image Slider

A modern, responsive image slider built with Next.js, TypeScript, and Tailwind CSS. This application fetches images from the Unsplash API and displays them in an interactive carousel with autoplay functionality.

**Image Slider Screenshot**

---

![Image Slider Screenshot](public/image%20slider.png "Image Slider Screenshot")

---

**Image Slider App [Link](https://image-slider-osama.vercel.app/)**


## Introduction

## Features

- 🖼️ Dynamic image loading from Unsplash API
- ⚡ Automatic slideshow with play/pause controls
- 🎨 Beautiful backdrop blur effects
- 🎯 Responsive design for all screen sizes
- 🌈 Interactive 3D background using Spline
- 🔄 Smooth transitions between images
- 📱 Mobile-friendly interface

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Unsplash API](https://unsplash.com/developers) - Image source
- [Spline](https://spline.design/) - 3D background effects
- [Lucide Icons](https://lucide.dev/) - UI icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Unsplash API access key

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd image_slider_app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your Unsplash API key:
```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Usage

The image slider automatically starts playing when the page loads. You can:
- Click the play/pause button to control the slideshow
- View image details including photographer name and description
- Enjoy the interactive 3D background animation

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Image_Slider.tsx
│   └── ui/
│       ├── button.tsx
│       └── carousel.tsx
├── lib/
│   └── utils.ts
└── public/
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to Unsplash for providing the image API
- Spline for the amazing 3D background capabilities
- Next.js team for the awesome framework
