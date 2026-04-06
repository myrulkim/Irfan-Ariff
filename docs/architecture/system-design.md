# 🏗️ ALCHIMISTRA System Design & Architecture Spec (v1.0)
**Status**: ACTIVE | **Version**: 1.0.0
**Architect**: ipan (Boss) | **Orchestrator**: Jargon (v3.1)

## 1. Executive Overview
ALCHIMISTRA is an elite-grade technical portfolio designed for high-fidelity performance and "The Archivist" aesthetic standards. It utilizes a **Clean Architecture (3-Layer)** pattern to ensure scalability, maintainability, and high-performance data delivery via Next.js 16 (React 19) and Supabase.

## 2. Technical Stack (The Alchimistra Engine)
- **Framework**: Next.js 16 (App Router) - Leveraging Server Components for SEO & speed.
- **Language**: TypeScript (Strict Mode) - Ensuring 100% type safety for data models.
- **Backend-as-a-Service**: Supabase (Auth, Database, Storage).
- **UI/UX Layer**: 
    - **Visual Engine**: `three.js` + `@react-three/fiber` (15k Particle Field).
    - **Styling**: Tailwind CSS 4 (Bleeding edge utility-first engine).
    - **Animations**: `framer-motion` (Micro-interactions & Silk Transitions).
    - **Design System**: Noir System (OLED Focus, Grain Overlays, 0.5px Precision).
- **Infrastructure**: 
    - **Analytics**: Custom `analytics` table for event tracking.
    - **Mailing**: `Resend` for high-deliverability contact form routing.

## 3. Architecture Pattern (3-Layer Logic)
The system enforces strict separation of concerns to prevent "logic spaghetti":

1. **Data Layer (`/lib/supabase/`)**:
   - Centralized queries (`queries.ts`).
   - Type-safe models (`types.ts`).
   - Supabase Server/Client adapters.

2. **Domain/Logic Layer (`/app/` + Server Components)**:
   - Business logic for data transformation.
   - Server-side fetching with parallel execution (`Promise.all`).
   - Revalidation policies (`export const revalidate = 60`).

3. **UI Layer (`/src/ui/` + `/components/`)**:
   - **Atomic Components**: Button, Input, CommandPalette.
   - **Sections**: `AlchemistHero`, `AlchemistProjects`, etc.
   - **Canvas**: `ParticleField` (WebGL) for immersive depth.

## 4. Data Architecture (Supabase Schema)
The portfolio is data-driven, allowing Boss to update content without touching the code.

| Table | Purpose | Priority Fields |
| :--- | :--- | :--- |
| `projects` | Case studies & codebases | `is_latest`, `display_order`, `tech_stack` |
| `experience` | Career timeline | `organization`, `date_range`, `display_order` |
| `services` | Professional offerings | `icon_name`, `display_order` |
| `analytics` | Engagement tracking | `event_name`, `count` |
| `profile` | Global contact/socials | `whatsapp_number`, `availability_status` |
| `education` | Academic background | `institution`, `degree` |
| `certificates` | Verification links | `credential_url`, `icon_tag` |

## 5. Performance Strategy (Rank S Fidelity)
- **Hybrid Rendering**: Combining static generation (ISR) with dynamic client-side interactivity (Three.js).
- **Parallel Fetching**: Minimizing waterfalls by fetching all core datasets concurrently on the root page.
- **Optimized Assets**: Next.js Image optimization for project previews and certificates.
- **WebGL Lifecycle**: Canvas disposal management to prevent memory leaks in the particle engine.

## 6. Future Strike Points
- [ ] **Fidelity Expansion**: Implementation of Silk-Shader Image Reveals.
- [ ] **SEO Hardening**: Implementation of Idris's Technical SEO Roadmap (JSON-LD, Meta-OpenGraph).
- [ ] **Client Dashboard**: A private section to manage Supabase data directly from the UI.

---
*Architected with Harness-Engineered Precision by Jargon v3.1.*
