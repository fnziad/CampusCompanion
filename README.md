# CampusCompanion

CampusCompanion is a modern web application designed to empower BRAC University students by connecting academics, career building, and peer collaboration into a single clean platform. This project is built as a Software Engineering course project, focusing on practical features, clean code, and a soothing user experience.

## Tech Stack

- **Frontend:** React (with Vite), TypeScript, Tailwind CSS, Lucide Icons, React Router
- **State/Context:** React Context API
- **Styling:** Tailwind CSS, custom themes (light & dark mode)
- **Build Tool:** Vite

## Features

- **Course Hub:** Browse and search for course resources (notes, slides, quizzes, practice materials)
- **Resume Builder:** Create and preview professional resumes (LaTeX-style templates coming soon)
- **Job & Research Opportunities:** Browse, save, and apply for internships, jobs, and research positions
- **Student Collaboration Hub:** Form thesis groups, study circles, research teams, or post small freelance tasks
- **Role-based Access:** General users, contributors, moderators, and a super admin (simulated roles)
- **Modern UI:** Responsive, accessible, and visually appealing with light and dark modes

## Project Structure & MVC Pattern

CampusCompanion follows a clear separation of concerns inspired by the MVC (Model-View-Controller) architecture:

- **Models (`src/models/`):** Define TypeScript types and interfaces for core entities (e.g., Course, Opportunity, Resource, Wishlist).
- **Views (`src/components/`, `src/pages/`):** Contain all UI components and route-based pages, responsible for rendering the user interface and handling user interactions.
- **Controllers (`src/controllers/`):** Encapsulate business logic and data manipulation, acting as the bridge between models and views.
- **Contexts & Hooks (`src/contexts/`, `src/hooks/`):** Manage global state and reusable logic, supporting the MVC separation.

This structure ensures maintainability, scalability, and a clean codebase.

## Project Structure

```
src/
  components/      # Reusable UI and feature components (Views)
  contexts/        # React context providers (state management)
  controllers/     # Logic for data manipulation (Controllers)
  data/            # Static data files
  hooks/           # Custom React hooks
  lib/             # Utility libraries
  models/          # TypeScript models/types (Models)
  pages/           # Route-based pages (Views)
  utils/           # Utility functions
public/            # Static assets (logos, icons, etc.)
```

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal)

## Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is for educational purposes only.

---

> CampusCompanion is about building the student ecosystem — organized, effortless, and a little futuristic. Clean code, clean design, and a platform that feels like a lounge where knowledge flows smoothly.
