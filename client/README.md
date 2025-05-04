
# Postsync – Modern Minimalist Social Media Management SaaS

Postsync is a comprehensive social media management platform that helps users schedule, publish, and analyze content across multiple platforms from a single dashboard.

## Features

- **Multi-platform Publishing:** Schedule and publish content across all your social media accounts from a single dashboard.
- **Performance Analytics:** Track engagement, growth, and content performance with detailed analytics and reports.
- **Content Calendar:** Plan your content strategy with an intuitive drag-and-drop visual calendar.
- **AI-Generated Content:** Create captions, hashtags, and content ideas with our advanced AI tools.
- **Bulk Scheduling:** Save time by scheduling multiple posts across different platforms at once.
- **Team Collaboration:** Work seamlessly with your team with approval workflows and shared calendars.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Routing:** react-router-dom v6
- **State Management:** React Context + hooks
- **Charts:** recharts
- **Icons:** lucide-react
- **Form Handling:** react-hook-form
- **Date Handling:** date-fns

## Backend Integration Points

The following locations have been marked with `// 🔌 BACKEND_HOOK: [functionName]` to indicate where backend integration will be needed:

### Authentication
- `src/context/AuthContext.tsx` - User authentication operations
  - `authenticateUser(email, password)`
  - `registerUser(name, email, password)`
  - `logoutUser()`
  - `socialLogin(provider)`

### Dashboard
- `src/pages/Dashboard/index.tsx`
  - `fetchFollowersAggregate()`
  - `fetchPlatformSummary(platformId)`

### Analytics
- `src/pages/Analytics/index.tsx`
  - `fetchAnalytics(platformId, dateRange)`
  - `exportAnalytics(platform, dateRange)`

### Calendar
- `src/pages/Calendar/index.tsx`
  - `fetchCalendarEvents()`
  - `updateEvent()`
  - `deleteEvent()`

### Create Post
- `src/pages/CreatePost/index.tsx`
  - `submitPost(data, selectedPlatforms, uploadedFiles)`
  - `generateHashtags(content, uploadedFiles)`

### AI Captions
- `src/pages/AICaptions/index.tsx`
  - `generateCaption(uploadedImage, customPrompt)`
  - `setCreatePostData(finalCaption, uploadedImage)`

### Settings
- `src/pages/Settings/index.tsx`
  - `saveSettings(section, data)`
  - `connectAccount(accountId)`
  - `disconnectAccount(accountId)`
  - `inviteTeamMember(email, role)`
  - `removeTeamMember(memberId)`

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

## License

This project is private and confidential.

## Future Development

- Backend API integration
- Authentication with JWT
- MongoDB database integration
- Real-time notifications
- Enhanced analytics reporting
- Dark mode toggle
- PWA capabilities
