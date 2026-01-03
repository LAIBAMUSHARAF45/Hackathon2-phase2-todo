---
id: 1
title: Frontend UI Implementation Plan
stage: plan
date_iso: 2026-01-02
surface: agent
model: Qwen
feature: frontend-ui
branch: 1-frontend-ui
user: user
command: /sp.plan
labels:
  - frontend
  - ui
  - plan
  - nextjs
files_yaml:
  - specs/1-frontend-ui/plan.md
  - specs/1-frontend-ui/research.md
  - specs/1-frontend-ui/data-model.md
  - specs/1-frontend-ui/quickstart.md
  - specs/1-frontend-ui/contracts/task-api-contracts.md
  - QWEN.md
tests_yaml: []
links:
  spec: specs/1-frontend-ui/spec.md
  ticket: null
  adr: null
  pr: null
---

# Frontend UI Implementation Plan

## Prompt Text

```
Frontend Implementation Plan - Phase II Todo Full-Stack Web App (Stunning Unique UI)

Project: Todo
Phase: II - Basic Level
Focus: Complete Next.js Frontend with premium glassmorphism + neon UI
Estimated effort: 8–14 hours (due to animations & polish)

Goal: Build a luxurious, modern, unique frontend that feels high-end and stands out

Implementation Order (recommended sequence):

1. Project Setup & Styling Base (1–2h)
   - Initialize Next.js 16+ App Router with TypeScript
   - Install dependencies: tailwindcss, framer-motion, @better-auth/nextjs (or similar), react-hot-toast
   - Configure tailwind.config.ts with custom colors (indigo-500, cyan-400, purple-600)
   - Add custom utilities for glassmorphism & neon glow
   - Set up global CSS: dark mode, fonts (Inter + Poppins/Geist), subtle particle background

2. Authentication Pages (2–3h)
   - Create /signin and /signup pages
   - Build centered glass card component (GlassCard.tsx)
   - Implement floating labels, neon focus effects, gradient buttons
   - Integrate Better Auth: signIn/signUp functions, session handling
   - Add smooth fade-in animations with Framer Motion

3. Root Layout & Auth Protection (1–1.5h)
   - app/layout.tsx: Include Navbar, auth check (redirect if not logged in)
   - Create Navbar.tsx: Fixed glass bar, gradient logo, avatar + logout
   - Use middleware or layout-level auth guard

4. Dashboard Page (/dashboard or /) (2–3h)
   - Hero: "Your Tasks" with glow & gradient underline
   - Floating + Add Button (bottom-right, circular, neon pulse)
   - Task grid: Responsive (1-col mobile, 2-3 desktop)
   - Fetch tasks on mount using /lib/api.ts

5. Task Card & Interactions (2–3h)
   - TaskCard.tsx: Glassmorphism + hover lift/scale/neon glow
   - Custom checkbox animation (scale + cyan change)
   - Completed style: strike-through + green tint
   - Edit/Delete icons with hover effects
   - Use Framer Motion for all hover/lift animations

6. Add/Edit Modal & Form (1.5–2h)
   - TaskForm.tsx: Reusable form for add/edit
   - Modal with glass overlay, neon border, floating labels
   - Gradient submit button + loading spinner
   - Optional: confetti on success

7. API Client & Polish (1–2h)
   - lib/api.ts: Centralized fetch with auto JWT from Better Auth
   - Add loading skeletons (shimmer glass effect)
   - Error/success toasts with neon borders (react-hot-toast)
   - Gentle shake on invalid inputs
   - Responsive testing + mobile menu

8. Final Testing & Optimization (1h)
   - Test full flow: signup → login → add tasks → edit/toggle/delete
   - Check animations smoothness (no jank)
   - Verify auth protection & JWT handling
   - Update README: frontend setup + screenshots

Constraints & Notes:
- Use server components by default, client components only for interactivity
- No heavy UI libraries — pure Tailwind + Framer Motion
- Keep bundle size low (optimize images/particles)
- Strict TypeScript, no any

Success Checklist:
☐ UI feels premium (glass, neon, animations everywhere)
☐ Signup/login smooth & beautiful
☐ Dashboard with floating cards + subtle particles
☐ Task hover: 3D lift + neon glow
☐ All CRUD actions delightful (feedback + animations)
☐ Mobile responsive, no errors in console
```

## Response Text

Created a comprehensive implementation plan for the Frontend UI feature, including technical context, project structure, research findings, data models, API contracts, and quickstart guide. The plan details the technologies to be used (Next.js 16+, TypeScript, Tailwind CSS, Framer Motion, Better Auth) and the implementation approach for creating a premium glassmorphism UI with neon effects.

## Outcome

Successfully created the implementation plan with all required components:
- Implementation plan document (plan.md)
- Research findings (research.md)
- Data models (data-model.md)
- API contracts (contracts/task-api-contracts.md)
- Quickstart guide (quickstart.md)
- Updated agent context (QWEN.md)

## Evaluation

The implementation plan aligns with the feature specification and project constitution, focusing on creating a luxurious, modern frontend with Next.js and premium UI effects. All technical requirements from the feature specification have been incorporated into the plan.