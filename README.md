# TikTok List

A modern web application for organizing and managing your favorite TikTok videos in custom playlists.

![TikTok List Screenshot]([https://via.placeholder.com/800x400?text=TikTok+List+Screenshot](http://localhost:3000/tiklist/static/media/tiktok-illustration.0a06d0d4fa6ca865967d.png))

## Features

- **Video Management**: Add, edit, and delete TikTok videos
- **Custom Playlists**: Create and manage playlists to organize your videos
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: All data is stored locally in your browser

## Live Demo

Check out the live demo: [TikTok List](https://vulquimar-silva.github.io/tiklist)

## Technologies Used

- React 18
- TypeScript
- Material UI 6
- React Router 7
- Local Storage API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vulquimar-silva/tiklist.git
cd tiklist
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
4. Open your browser and navigate to http://localhost:3000

## Building for Production
To create a production build:
```bash
npm run build
```

## Deployment
The project is configured for GitHub Pages deployment:
```bash
npm run deploy
```

Project Structure
```
tiklist/
├── public/
│   ├── index.html
│   └── 404.html
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── VideoCard.tsx
│   │   └── ...
│   ├── context/
│   │   └── AppContext.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PlaylistsPage.tsx
│   │   └── ...
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
└── package.json
```

## Usage
1. Adding Videos : Click the "+" button on the home page to add a new TikTok video
2. Creating Playlists : Navigate to the Playlists page and click "New Playlist"
3. Adding to Playlists : Click the menu on any video card and select "Add to Playlist"
4. Changing Theme : Go to Settings to toggle between dark and light mode

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- TikTok for the inspiration
- Material UI for the beautiful components
- All contributors who have helped improve this project

Made with ❤️ by Vulquimar Silva
