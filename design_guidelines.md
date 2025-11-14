# Design Guidelines: Multi-Channel Communication Platform

## Design Approach
**Reference-Based Approach**: Drawing from Linear, Intercom, and Notion for their exceptional handling of communication tools and productivity interfaces. This platform prioritizes clarity, efficiency, and professional polish over decorative elements.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) for UI elements and body text
- **Monospace Font**: JetBrains Mono for code/signature previews
- **Hierarchy**:
  - Hero/Page Titles: text-4xl/5xl, font-semibold
  - Section Headers: text-2xl/3xl, font-semibold
  - Component Titles: text-lg/xl, font-medium
  - Body Text: text-base, font-normal
  - Captions/Meta: text-sm, font-normal

### Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently (p-4, gap-6, m-8, etc.)
- Container: max-w-7xl mx-auto px-6
- Section Padding: py-12 to py-20
- Component Spacing: gap-4 to gap-8
- Card Padding: p-6

### Navigation Structure
**Sidebar + Top Bar Layout**:
- Left sidebar (w-64) with feature navigation: Email Signatures, Live Chat, WhatsApp, Changelogs
- Top bar with workspace selector, notifications, and user profile
- Sidebar icons from Heroicons (outline style)
- Active state with subtle background treatment

## Feature-Specific Layouts

### 1. Email Signature Generator
**Split-Screen Layout**:
- Left panel (50%): Form builder with sections for Personal Info, Company Details, Social Links, Legal Text
- Right panel (50%): Live preview with template selector at top
- Form fields: Single column, label-above-input pattern
- Template gallery: 2-column grid of preset designs
- Export options: Floating bottom bar with "Copy HTML" and "Download" buttons

### 2. Live Chat Interface
**Three-Column Layout**:
- Left: Conversation list (w-80) with search, filter tabs, and conversation cards showing avatar, name, last message, timestamp
- Center: Active conversation with message thread, timestamp separators, typing indicators
- Right: Contact sidebar (w-72) with user details, tags, notes section
- Message bubbles: Rounded corners (rounded-2xl), max-width prose, sent messages aligned right
- Input bar: Fixed bottom with attachment button, emoji picker, send button

### 3. WhatsApp Integration
**Dashboard + Message View**:
- Connection status card at top with API credentials, webhook status
- Message templates gallery: 3-column grid showing template previews
- Analytics cards: 4-column grid showing metrics (Messages Sent, Delivered, Read, Failed)
- Message composer: Full-width card with template selector, dynamic fields, preview pane

### 4. Changelog Management
**Blog-Style Layout**:
- Create/Edit: Full-width rich text editor with sidebar for metadata (version, date, category tags)
- Display: Single column (max-w-3xl) with chronological timeline design
- Changelog entries: Card format with version badge, date, categorized changes (Features, Fixes, Improvements)
- Version badge: Inline tag with rounded-full styling

## Component Library

### Core Components
- **Input Fields**: Rounded borders (rounded-lg), focus ring, label above with text-sm
- **Buttons**: Primary (solid), Secondary (outline), Ghost (text-only) - rounded-lg, px-4 py-2
- **Cards**: Rounded-xl, border treatment, subtle shadow on hover
- **Badges**: rounded-full, text-xs, uppercase tracking
- **Avatars**: rounded-full with fallback initials, sizes: sm (8), md (10), lg (12)
- **Modals**: Centered, max-w-2xl, backdrop blur

### Data Display
- **Message Bubbles**: Asymmetric design, sent vs received styling, timestamp below
- **Conversation Cards**: Flex layout with avatar left, content right, meta info (time, unread count)
- **Timeline**: Vertical line connector, circle nodes for entries
- **Tables**: Borderless with row hover states, sticky headers for long lists

### Forms
- **Signature Builder Form**: Grouped sections with dividers, consistent spacing (gap-4)
- **Chat Input**: Fixed positioning, attachment icons left, send button right
- **Template Editor**: Rich text toolbar with formatting options, character count

## Images

**Hero Section** (Homepage/Dashboard):
- **Large hero image**: Abstract geometric pattern or workspace photography (h-96)
- Image placement: Top of page, full-width with overlay for text/CTA
- Overlay: Semi-transparent dark gradient for text readability
- CTA buttons: Blurred background (backdrop-blur-sm) for visibility

**Feature Illustrations**:
- Email signature preview: Real signature example screenshots
- Chat interface: Screenshot showing conversation flow
- WhatsApp integration: Template message examples
- Placement: Within feature cards or alongside descriptions

**Empty States**:
- No conversations yet: Simple icon illustration
- No changelogs: Friendly "Start creating" illustration
- Disconnected WhatsApp: Connection status graphic

## Interaction Patterns

### Real-Time Updates
- Message arrival: Subtle fade-in animation
- Typing indicators: Animated dots
- Status changes: Toast notifications (top-right corner)

### Navigation
- Sidebar: Hover state with slight background change
- Active route: Border-left accent indicator
- Page transitions: Fade effect, no sliding

### State Management
- Loading: Skeleton screens matching content structure
- Success: Green checkmark toast
- Errors: Inline validation messages below fields
- Empty states: Centered content with illustration and CTA

## Accessibility
- Consistent focus indicators across all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation support for chat, forms, and navigation
- High contrast text throughout (WCAG AA minimum)

This design creates a professional, efficient workspace that balances powerful features with an uncluttered, focused interface suitable for business communication tools.