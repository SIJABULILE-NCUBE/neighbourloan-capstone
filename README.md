# NeighbourLoan

A modern frontend marketplace application that enables neighbours to lend and borrow tools and equipment within their local community.

NeighbourLoan was designed as a **Minimum Viable Product (MVP)** that prioritises the core borrowing experience while demonstrating sound engineering judgement, clean React architecture, strong TypeScript practices, responsive design, accessibility, and maintainable code.

Rather than implementing every requested feature, the project focuses on building the right features well, documenting engineering trade-offs, and delivering a polished user experience.

---

## Live Demo

### Application

https://neighbourloan.netlify.app/

---

## GitHub Repository

https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone

---

## Loom Walkthrough

**Add your Loom presentation link here.**

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
- Engineering Principles
- Acknowledgements
- Author

---

# Project Overview

NeighbourLoan is a community marketplace that allows neighbours to lend and borrow tools instead of purchasing equipment that may only be needed occasionally.

The application demonstrates how a well-scoped MVP can solve a real-world problem while maintaining a clean user experience and scalable frontend architecture.

Throughout development, the focus was placed on:

- Building only high-value functionality
- Creating reusable React components
- Maintaining strict TypeScript typing
- Writing clean, maintainable code
- Designing for future scalability
- Delivering a responsive and accessible user experience

Rather than attempting to implement every requested feature, the application prioritises the complete borrowing journey and delivers it to a high standard.

---

# Engineering Highlights

- React 18 with Functional Components
- TypeScript (Strict Mode)
- Vite Development Environment
- Component-Based Architecture
- Strongly Typed Data Models
- Responsive Mobile-First Design
- Keyboard Accessible Interface
- Modular Business Logic
- Trust Score System
- Local Booking Persistence
- Continuous Deployment with Netlify
- Clean Separation of UI and Business Logic

---

# Objectives

NeighbourLoan was designed around a simple user journey:

1. Browse available equipment.
2. Search for tools.
3. Filter listings.
4. View detailed item information.
5. Complete a booking request.
6. Authenticate before confirming the booking.
7. Review previously confirmed bookings.

The objective was to create a simple, intuitive borrowing experience while keeping the application lightweight, maintainable, and easy to extend.

---

# Features

## Browse Marketplace

Users can:

- Browse available tools and equipment
- Search by tool name
- Filter by category using toggleable filter chips
- Filter by Free or Paid listings
- View responsive marketplace cards

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

Instead of displaying artificial urgency messages such as **"3 people are viewing this item right now"**, every listing includes a **Trust Score**.

The Trust Score is calculated using meaningful information already available within the data model, including:

- Owner tenure
- Average owner rating
- Number of completed bookings

Rather than creating fake urgency, this feature provides users with genuine information that helps build confidence before borrowing equipment.

This approach encourages transparency, trust, and informed decision-making.

---

## Booking Workflow

NeighbourLoan includes a complete multi-step booking process.

```text
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
        │
        ▼
Saved to My Bookings
```

The workflow keeps users informed throughout each stage and concludes with a clear confirmation screen.

Confirmed bookings are saved locally and remain available from the **My Bookings** screen.

---

## My Bookings

Once a booking has been confirmed, it is stored locally and can be viewed at any time from the **My Bookings** screen.

This allows users to revisit previous bookings while also demonstrating local client-side persistence.

---

## Authentication

Authentication is requested only when a user is ready to confirm a booking.

Allowing users to browse before signing in creates a smoother experience while still supporting account creation at the appropriate point in the user journey.

---
# Technologies Used

| Technology | Purpose |
|------------|---------|
| React 18 | Component-based user interface development |
| TypeScript | Static typing, safer refactoring, and improved maintainability |
| Vite | Fast development server and optimized production builds |
| CSS3 | Custom responsive styling without external UI frameworks |
| React Hooks | State management and component lifecycle |
| Browser localStorage | Client-side persistence of confirmed bookings |
| Netlify | Application hosting and Continuous Deployment |
| Git & GitHub | Version control and source code management |
| Mock Typed Data | Simulated API-ready frontend data layer |

---

# Application Architecture

NeighbourLoan follows a modular architecture that separates presentation, business logic, and data management. This approach improves maintainability, readability, and future scalability.

```text
                    User
                      │
                      ▼
            Application Screens
                      │
                      ▼
           Reusable UI Components
                      │
                      ▼
              Business Logic (lib)
                      │
                      ▼
             Typed Marketplace Data
                      │
                      ▼
               Mock Data Source
```

The application has been structured so that the mock data layer can easily be replaced with a future REST API or backend service without requiring major changes to the user interface.

---

# Folder Structure

```text
src
│
├── components/
│   ├── ItemCard.tsx          # Marketplace listing card
│   └── TrustBadge.tsx        # Displays Trust Score
│
├── data/                     # Strongly typed mock marketplace data
│
├── lib/
│   ├── booking.ts            # Booking duration and pricing calculations
│   ├── trust.ts              # Trust Score calculations
│   └── storage.ts            # Local booking persistence
│
├── screens/
│   ├── BrowseScreen.tsx
│   ├── ItemDetailScreen.tsx
│   ├── BookingScreen.tsx
│   ├── AuthScreen.tsx
│   └── MyBookingsScreen.tsx
│
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
└── styles.css                # Global application styles
```

---

# Engineering Decisions

Several deliberate engineering decisions were made throughout the development of this application.

Rather than simply implementing functionality, emphasis was placed on creating a solution that remains maintainable, scalable, and user-focused.

Some of the key decisions include:

- Prioritising the complete booking journey over secondary functionality.
- Building reusable components to reduce duplication and improve maintainability.
- Separating business logic from presentation components.
- Maintaining strict TypeScript typing throughout the application.
- Structuring mock data to closely resemble a future REST API.
- Designing for mobile responsiveness from the beginning rather than treating it as a final enhancement.
- Building accessibility into the interface by ensuring keyboard navigation and clear visual hierarchy.
- Adding local booking persistence so confirmed bookings remain available after a page refresh.
- Using meaningful Trust Scores instead of artificial urgency indicators.
- Carefully selecting and organising project folders to support future growth.

Each significant decision involved evaluating trade-offs between scope, complexity, user experience, and maintainability.

A detailed explanation of these decisions, together with the alternatives considered and the reasoning behind each choice, is available in **DECISION-LOG.md**.

---
# Installation

Clone the repository.

```bash
git clone https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone.git
```

Navigate into the project directory.

```bash
cd neighbourloan-capstone
```

Install all project dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open the local URL displayed by Vite (typically `http://localhost:5173`) in your browser.

---

# Available Scripts

Start the development server.

```bash
npm run dev
```

Creates an optimized production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

Run TypeScript type checking.

```bash
npm run typecheck
```

---

# Deployment

NeighbourLoan is deployed using **Netlify**, with the GitHub repository connected for Continuous Deployment (CD).

Every push to the `main` branch automatically:

- Installs project dependencies
- Builds the production application
- Deploys the latest version
- Publishes the updated application online

### Build Command

```text
npm run build
```

### Publish Directory

```text
dist
```

The live application can be accessed here:

**https://neighbourloan.netlify.app/**

---

# Supporting Documentation

In addition to the source code, this repository includes documentation explaining both the technical implementation and the product decisions made throughout development.

| File | Description |
|------|-------------|
| **README.md** | Project overview, setup instructions, architecture and documentation |
| **BRIEF.md** | Original project requirements |
| **FOUNDER-RESPONSE.md** | Professional response explaining which features were implemented, deferred or reshaped, together with the reasoning behind those decisions |
| **DECISION-LOG.md** | Engineering decisions, alternatives considered and trade-offs made throughout development |
| **AI-USAGE.md** | Documentation of how AI was used during development, including validation, corrections and improvements |
| **PRESENTATION-GUIDE.md** | Outline used during the project walkthrough presentation |

---

# Future Improvements

The current implementation focuses on delivering a polished MVP. The project architecture has been intentionally designed so that additional functionality can be introduced without significant restructuring.

Potential future enhancements include:

- Backend API integration
- Persistent user authentication
- User profiles
- Real-time messaging between borrowers and owners
- Ratings and reviews
- Interactive map integration
- Wishlist functionality
- Push notifications
- Offline support
- Dark mode
- Owner-uploaded images
- Payment integration
- Booking history synchronised across devices
- Client-side routing with shareable URLs
- Advanced search and filtering options
- Admin dashboard for marketplace management

The modular architecture, typed data models and reusable component structure make these enhancements straightforward to introduce in future versions.

---
# Known Limitations

NeighbourLoan represents a frontend Minimum Viable Product (MVP). The current implementation intentionally limits scope in order to deliver a polished, reliable, and maintainable core experience.

Current limitations include:

- Marketplace data is mocked and not connected to a live backend service.
- Authentication is simulated and does not include persistent user accounts.
- Booking information is stored locally using browser localStorage and is not synchronised across multiple devices.
- Real-time updates and messaging are not currently implemented.
- Images are manually sourced stock photographs rather than user-uploaded content.
- Payment processing has been intentionally excluded from this release.
- Navigation is state-based, meaning individual pages cannot currently be accessed through shareable URLs.

These limitations were accepted deliberately to prioritise usability, code quality, maintainability, and delivery of the core borrowing experience.

---

# Engineering Principles

NeighbourLoan was developed around the following software engineering principles:

- Separation of Concerns
- Component Reusability
- Clean Code
- Type Safety
- Accessibility
- Responsive Design
- Maintainability
- Scalability
- Product Thinking
- Performance Optimisation
- User-Centred Design

These principles guided both technical implementation and product decisions throughout the project.

---

# Lessons Learned

Building NeighbourLoan reinforced that successful software development extends beyond writing functional code.

Some of the key lessons from this project include:

- Scoping features effectively often delivers more value than attempting to implement everything.
- Strong TypeScript models improve maintainability and reduce runtime errors.
- Building reusable components simplifies future enhancements.
- Clear documentation is just as important as clean code.
- Product thinking and engineering judgement play an equally important role in delivering successful software.

This project also highlighted the importance of balancing user experience, technical constraints, and business goals when making engineering decisions.

---

# Acknowledgements

NeighbourLoan demonstrates that delivering value is not about implementing every feature request.

Instead, successful software is built by understanding user needs, making thoughtful engineering decisions, embracing trade-offs, and delivering a reliable solution that solves the core problem well.

Every design choice, implementation decision, and trade-off documented in this repository reflects that philosophy.

---

# Author

**Name:** Sijabulile Ncube

**Role:** Frontend Developer

**Project:** NeighbourLoan

**Created:** 3 July 2026

**GitHub Repository:** https://github.com/SIJABULILE-NCUBE/neighbourloan-capstone

**Live Application:** https://neighbourloan.netlify.app/

**Loom Walkthrough:** *(Add your Loom presentation link here.)*

---

## Final Thoughts

NeighbourLoan was built to demonstrate more than technical implementation.

The project showcases thoughtful product decision-making, clean frontend architecture, maintainable TypeScript code, responsive design, and an understanding that the success of a product depends as much on **choosing the right features** as it does on building them well.

By focusing on the core user journey and documenting every significant engineering decision, the application reflects an approach centred on quality, usability, and long-term maintainability.

---

> **"Good software isn't defined by the number of features it contains. It's defined by the quality of the decisions behind those features."**