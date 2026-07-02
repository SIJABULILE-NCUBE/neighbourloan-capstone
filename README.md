# NeighbourLoan

A modern frontend marketplace application that enables neighbours to lend and borrow tools and equipment within their local community.

NeighbourLoan was designed as a Minimum Viable Product (MVP) that prioritises the core borrowing experience while demonstrating sound engineering judgement, clean React architecture, strong TypeScript practices, responsive design, accessibility, and maintainable code.

Rather than implementing every requested feature, the project focuses on building the right features well, documenting trade-offs, and delivering a polished user experience.

---

## Live Demo

**Application**

https://neighbourloan.netlify.app/

---

## GitHub Repository

https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone

---

## Loom Walkthrough

*Add your Loom presentation link here.*

---

# Table of Contents

- Project Overview
- Engineering Highlights
- Objectives
- Features
- Technologies Used
- Application Architecture
- Folder Structure
- Engineering Decisions
- Installation
- Available Scripts
- Deployment
- Supporting Documentation
- Future Improvements
- Known Limitations
- Author

---

# Project Overview

NeighbourLoan is a community marketplace where neighbours can borrow and lend tools instead of purchasing equipment they may only need occasionally.

The application demonstrates how a well-scoped MVP can solve a real-world problem while maintaining a clean user experience and scalable frontend architecture.

Throughout development, emphasis was placed on:

- Building only high-value functionality
- Creating reusable React components
- Maintaining strict TypeScript typing
- Writing clean, maintainable code
- Designing for future scalability
- Delivering a responsive and accessible user experience

The project intentionally favours quality over quantity by delivering a complete borrowing workflow instead of numerous unfinished features.

---

# Engineering Highlights

- React 18 with Functional Components
- TypeScript (Strict Mode)
- Vite Development Environment
- Component-based Architecture
- Strongly Typed Data Models
- Responsive Mobile-First Design
- Keyboard Accessible Interface
- Modular Business Logic
- Trust Score System
- Continuous Deployment with Netlify
- Clean Separation of UI and Business Logic

---

# Objectives

NeighbourLoan was designed around a simple user journey:

1. Browse available equipment
2. Search for tools
3. Filter listings
4. View detailed item information
5. Complete a booking request
6. Authenticate before confirming the booking

The objective was to create a smooth, intuitive booking experience while keeping the application lightweight and easy to extend.

---

# Features

## Browse Marketplace

Users can:

- Browse available tools and equipment
- Search by tool name
- Filter by category
- Filter by Free or Paid listings
- View responsive listing cards

---

## Item Details

Each listing displays:

- Tool image
- Description
- Category
- Availability
- Owner information
- Trust Score
- Book Now action

---

## Trust Score

Instead of displaying artificial urgency messages, each listing includes a Trust Score.

The Trust Score provides users with meaningful information that helps build confidence before borrowing equipment.

This approach encourages transparency and trust rather than relying on misleading urgency indicators.

---

## Booking Workflow

NeighbourLoan includes a complete multi-step booking process.

```
Browse Marketplace
        │
        ▼
Select Tool
        │
        ▼
Choose Booking Dates
        │
        ▼
Review Booking
        │
        ▼
Booking Confirmation
```

The workflow keeps users informed throughout each stage and concludes with a clear confirmation screen.

---

## Authentication

Authentication is required only when a user is ready to confirm a booking.

Allowing users to browse before signing in provides a better user experience while still supporting account creation when it becomes necessary.

---

# Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | Component-based UI development |
| TypeScript | Static typing, maintainability and safer refactoring |
| Vite | Fast development server and optimized production builds |
| CSS3 | Custom responsive styling |
| React Hooks | State management |
| Netlify | Hosting and Continuous Deployment |
| Git & GitHub | Version control |
| Mock Typed Data | Simulated API-ready frontend data layer |

---

# Application Architecture

The application follows a modular architecture that separates presentation, business logic and data.

```
User

↓

Application Screens

↓

Reusable Components

↓

Business Logic

↓

Typed Data Layer

↓

Mock Marketplace Data
```

This structure keeps the application maintainable and makes it straightforward to replace the mock data with a real backend in future versions.

---

# Folder Structure

```text
src
│
├── components/
│   ├── ItemCard.tsx          # Marketplace listing card
│   └── TrustBadge.tsx        # Displays Trust Score
│
├── data/                     # Typed mock marketplace data
│
├── lib/
│   ├── booking.ts            # Booking logic
│   └── trust.ts              # Trust Score calculations
│
├── screens/                  # Application screens
│
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
└── styles.css                # Global styles
```

---

# Engineering Decisions

Several deliberate engineering decisions were made throughout development.

These include:

- Prioritising the complete booking journey over secondary functionality.
- Building reusable components instead of repeating UI.
- Keeping business logic separate from presentation components.
- Using strict TypeScript typing throughout the project.
- Structuring mock data to closely resemble a future REST API.
- Designing mobile responsiveness from the beginning.
- Building accessibility into the interface rather than treating it as an afterthought.

These decisions improve maintainability, readability and future scalability.

---

# Installation

Clone the repository.

```bash
git clone https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone.git
```

Navigate into the project.

```bash
cd neighbourloan-capstone
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

# Available Scripts

Start the development server.

```bash
npm run dev
```

Create a production build.

```bash
npm run build
```

Preview the production build.

```bash
npm run preview
```

Run TypeScript type checking.

```bash
npm run typecheck
```

---

# Deployment

NeighbourLoan is deployed using **Netlify**.

The GitHub repository is connected directly to Netlify, enabling Continuous Deployment.

Every push to the `main` branch automatically:

- installs dependencies
- builds the project
- deploys the latest version
- publishes the live application

### Build Command

```text
npm run build
```

### Publish Directory

```text
dist
```

---

# Supporting Documentation

This repository contains additional documentation explaining both the technical implementation and product decisions.

| File | Description |
|------|-------------|
| BRIEF.md | Original project requirements |
| FOUNDER-RESPONSE.md | Product decisions and responses to the founder |
| DECISION-LOG.md | Engineering decisions and trade-offs |
| AI-USAGE.md | Documentation of AI usage, validation and improvements |
| PRESENTATION-GUIDE.md | Guide used for the project walkthrough |

---

# Future Improvements

Future iterations of NeighbourLoan could include:

- Backend API integration
- User authentication with persistent sessions
- Real-time messaging
- Ratings and reviews
- Interactive maps
- Wishlist functionality
- Push notifications
- Offline support
- Dark mode
- Image uploads
- Payment integration

The current architecture has been designed to make these enhancements easier to introduce in future releases.

---

# Known Limitations

The current version represents an MVP and intentionally limits scope to deliver a polished core experience.

Current limitations include:

- Mock data instead of a live backend
- No persistent authentication
- No real-time updates
- Placeholder images
- No payment processing
- Booking data is not permanently stored
- Deep linking between pages is not currently supported

These limitations were accepted to prioritise quality, usability and maintainability within the project scope.

---

# Engineering Principles

NeighbourLoan was developed using the following engineering principles:

- Separation of Concerns
- Component Reusability
- Clean Code
- Type Safety
- Accessibility
- Responsive Design
- Scalability
- Maintainability
- Product Thinking
- Performance Optimisation

---

# Acknowledgements

This project demonstrates the importance of balancing technical implementation with product thinking.

A successful MVP is not measured by the number of features it contains, but by how effectively it solves a real user problem while remaining maintainable, scalable and enjoyable to use.

---

# Author

**Name:** Sijabulile Ncube

**Project:** NeighbourLoan

**Created:** 3 July 2026

**GitHub:** https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone

**Live Application:** https://neighbourloan.netlify.app/

**Loom Walkthrough:** *Add your Loom link here.*

---

> *"Good software is not built by implementing every idea. It is built by making thoughtful decisions, understanding trade-offs, and delivering the greatest value with the time available."*