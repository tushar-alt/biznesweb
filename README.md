# 🌐 BizWeb

[![GitHub](https://img.shields.io/badge/GitHub-tushar--alt-blue?logo=github)](https://github.com/tushar-alt)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Connecting Ideas to Technology** — A modern, hand-drawn style business website showcasing web development, app development, desktop software, and design services.

## ✨ Features

- 🎨 **Unique Hand-Drawn Design** — Pencil/sketch aesthetic with custom cursors
- 🌗 **Dark/Light Mode** — Toggle with persistent preference
- 🎭 **Animated Doodles** — Canvas-based floating shapes
- 📱 **Responsive** — Works on all screen sizes
- ⚡ **Fast** — No frameworks, pure HTML/CSS/JS
- 🎯 **Interactive** — Hover effects, animations, parallax
- 🔍 **SEO Ready** — Semantic HTML with meta tags

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/tushar-alt/biznesweb.git
cd biznesweb

# Open in browser
# Simply open index.html in your preferred browser
# Or use a local server:

# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Deployment

This is a static website that can be deployed to any hosting service:

- **GitHub Pages** — Push to `gh-pages` branch
- **Netlify** — Drag and drop the folder
- **Vercel** — Connect your repository
- **Any web server** — Upload the files

## 📄 Pages

| Page | Description |
|------|-------------|
| `index.html` | Home page with hero section |
| `services.html` | Services overview |
| `webdev.html` | Web development services |
| `appdev.html` | App development services |
| `software.html` | Desktop software services |
| `webdesign.html` | Web design services |
| `contact.html` | Contact form |

## 🎨 Design System

### Color Palette

- **Light Mode**: Paper texture with black ink (#111)
- **Dark Mode**: Dark texture with white ink (#fafafa)

### Typography

- **Primary**: Patrick Hand (cursive)
- **Secondary**: Architects Daughter

### Effects

- Custom cursors (glowing ball)
- Hand-drawn wave underlines
- Canvas doodle animations
- Parallax background movement
- Border draw animations on hover

## 📁 Project Structure

```
biznesweb/
├── 📄 index.html          # Home page
├── 📄 services.html       # Services page
├── 📄 webdev.html         # Web development
├── 📄 appdev.html         # App development
├── 📄 software.html       # Desktop software
├── 📄 webdesign.html      # Web design
├── 📄 contact.html        # Contact form
├── 📖 README.md           # This file
├── 📜 LICENSE             # MIT License
├── 🚫 .gitignore          # Git ignore rules
└── 📂 src/
    ├── 🎨 style.css       # Main stylesheet
    └── ⚙️ main.js         # Main JavaScript
```

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `src/style.css`:

```css
:root {
  --bg-light: #f8f6f2;
  --bg-dark: #1c1c1c;
  --text-light: #111;
  --text-dark: #fafafa;
}
```

### Adding Pages

1. Copy an existing HTML file
2. Update the content
3. Add navigation links
4. Update the footer

### Modifying Animations

The doodle animations are in the JavaScript section of each HTML file. Key functions:

- `randomShape()` — Creates random shapes
- `drawShape(s)` — Draws a shape on canvas
- `animate()` — Animation loop
- `showDoodles(config)` — Shows doodle effect

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Tushar** — [@tushar-alt](https://github.com/tushar-alt)

---

<p align="center">
  Made with ❤️ and creativity
</p>
