# 🎨 BoardSync - Real-time Collaborative Whiteboard

A modern, real-time collaborative whiteboard application built with Next.js, TypeScript, and Liveblocks. Create, collaborate, and design together in real-time with an intuitive interface similar to Miro.


![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Liveblocks](https://img.shields.io/badge/Liveblocks-Real--time-orange)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Collaboration** - Multiple users can work on the same board simultaneously
- **Live Cursor Tracking** - See other users' cursors and selections in real-time
- **Undo/Redo System** - Built-in history management with Liveblocks
- **Multi-layer Selection** - Select and move multiple objects at once
- **Responsive Design** - Works seamlessly on desktop and tablet devices

### 🎨 Drawing Tools
- **Rectangle Tool** - Create perfect rectangles and squares
- **Ellipse Tool** - Draw circles and ovals
- **Text Tool** - Add text with customizable font sizes (12px - 96px)
- **Note Tool** - Create sticky notes for quick annotations
- **Selection Tool** - Select, move, and resize objects

### 🎨 Color & Styling
- **18 Color Palette** - Predefined colors including reds, oranges, yellows, greens, blues, purples, pinks, and neutrals
- **Visual Selection Feedback** - Selected colors are highlighted
- **Multi-object Coloring** - Apply colors to multiple selected objects simultaneously

### 📋 Layer Management
- **Bring to Front** - Move selected objects to the top layer
- **Send to Back** - Move selected objects to the bottom layer
- **Delete Objects** - Remove selected objects with keyboard shortcuts
- **Layer Selection** - Click and drag to select multiple objects

### 🔧 Advanced Features
- **Zoom & Pan** - Navigate large boards with mouse wheel and drag
- **Selection Box** - Drag to create selection boxes for multiple objects
- **Resize Handles** - Eight resize handles for precise object sizing
- **Real-time Updates** - All changes sync instantly across all connected users

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Liveblocks account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/miroboard.git
   cd miroboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Real-time Collaboration
- **Liveblocks** - Real-time collaboration platform
- **WebSocket** - Live cursor tracking and presence
- **Conflict Resolution** - Automatic merge strategies

### State Management
- **Liveblocks Storage** - Shared state management
- **React Hooks** - Local state management
- **Custom Hooks** - Reusable logic

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── board/[boardId]/         # Board pages
│   │   └── _components/         # Board-specific components
│   ├── api/                     # API routes
│   └── layout.tsx              # Root layout
├── components/                  # Shared UI components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── types/                      # TypeScript type definitions
├── providers/                  # Context providers
└── public/                    # Static assets
```

## 🎯 Key Components

### Canvas System
- **Real-time Rendering** - SVG-based canvas with live updates
- **Event Handling** - Mouse and touch event management
- **Coordinate System** - Camera-based pan and zoom
- **Layer Management** - Z-index and stacking order

### Collaboration Features
- **Presence API** - User cursors and selections
- **Storage API** - Shared board state
- **History API** - Undo/redo functionality
- **Room Management** - Board-specific collaboration rooms

### UI Components
- **Toolbar** - Drawing tools and controls
- **Selection Tools** - Color picker, layer controls, delete
- **Color Picker** - 18 predefined colors with visual feedback
- **Font Size Dropdown** - Text size selection (12px - 96px)

## 🔧 Configuration

### Liveblocks Setup
1. Create a Liveblocks account at [liveblocks.io](https://liveblocks.io)
2. Create a new project
3. Copy your public and secret keys
4. Add them to your `.env.local` file

### Environment Variables
```env
# Liveblocks Configuration
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=pk_...
LIVEBLOCKS_SECRET_KEY=sk_...

# Optional: Custom domain
NEXT_PUBLIC_LIVEBLOCKS_URL=https://your-domain.liveblocks.io
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify** - Static site hosting
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Liveblocks** - Real-time collaboration platform
- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library

## 📞 Support

- **Issues** - [GitHub Issues](https://github.com/yourusername/miroboard/issues)
- **Discussions** - [GitHub Discussions](https://github.com/yourusername/miroboard/discussions)
- **Email** - your-email@example.com

## 🔮 Roadmap

- [ ] **Drawing Tools** - Freehand drawing and shapes
- [ ] **Image Upload** - Support for image insertion
- [ ] **Templates** - Pre-built board templates
- [ ] **Export** - PNG, PDF, and SVG export
- [ ] **Comments** - Add comments to objects
- [ ] **Version History** - Track board changes over time
- [ ] **Mobile App** - React Native mobile application
- [ ] **Offline Support** - Work offline with sync on reconnect


*Inspired by Miro's collaborative whiteboard platform*
