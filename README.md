# 🎬 Movie World

A small React app for browsing movies — what's popular, what's trending, and what's out there by genre — all powered by [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

Pick a movie and you get a full details page with the overview, genres, rating, and a row of recommended titles to fall down a rabbit hole with. Built with React, Vite, Tailwind, and daisyUI, with a bit of Motion sprinkled on top for the animations.

## Features

- **Three ways to browse** — Discover (Popular / Top Rated / Upcoming), Trending (today's trending movies), and Genres (pick a genre and browse just that)
- **Movie details page** — poster, overview, genre badges, status, vote average, and original language
- **Recommendations** — every movie details page ends with a grid of similar movies to check out next
- **Infinite-ish pagination** — a "View more..." button loads the next page and quietly dedupes anything already on screen
- **Light/dark theme toggle** — flip between a dark (Dracula) and light (Corporate) daisyUI theme from the navbar
- **Responsive layout** — a sidebar on desktop, a bottom dock nav on mobile
- **Little animation touches** — cards lift on hover, nav items stagger in, courtesy of Motion

## Built With

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
- [Motion](https://motion.dev/) (formerly Framer Motion) for animations
- [Lucide React](https://lucide.dev/) for icons
- [TMDB API v3](https://developer.themoviedb.org/reference/intro/getting-started) for all the movie data

## Getting Started

### Prerequisites

- Node.js (18+ recommended)
- A free TMDB account with an **API Read Access Token** — grab one from your [TMDB account settings](https://www.themoviedb.org/settings/api) under the API section. You want the long Read Access Token (v4 auth), not the shorter v3 API key.

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/nfrx1/Movie-World.git
   cd Movie-World
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your TMDB token
   ```bash
   VITE_API_KEY=your_tmdb_read_access_token
   ```

4. Run the dev server
   ```bash
   npm run dev
   ```

5. Open the local URL Vite prints in your terminal (usually `http://localhost:5173`)

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint over the project |

## Project Structure

```
src/
├── Components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   ├── NavbarStart.jsx   # logo + brand
│   │   └── NavbarEnd.jsx     # theme toggle
│   └── Main/
│       ├── Main.jsx          # holds the active tab / selected movie state
│       ├── Aside/
│       │   └── Aside.jsx     # sidebar (desktop) / dock nav (mobile)
│       ├── Movies/
│       │   ├── Movies.jsx    # movie grid + pagination
│       │   ├── MovieCard.jsx
│       │   └── MovieHeader.jsx   # featured movie banner
│       └── MovieDetails/
│           ├── MovieDetails.jsx
│           └── MovieRecommendations.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Known Limitations

This is still early days, so a few things to be aware of:

- The **Genres** tab isn't reachable from the mobile bottom nav yet — it's a sidebar-only feature for now
- No search bar yet, so browsing is limited to Discover / Trending / Genres
- No watchlist or favorites — it's a browse-and-explore app for now, nothing is saved
- Error states are basic (a plain error message, no retry button)

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.

<img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDB logo" width="150" />
