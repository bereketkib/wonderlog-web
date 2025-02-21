# Wonderlog Web

A modern blogging platform built with Next.js, where readers can discover thought-provoking articles and engage with writers.

## Related Repositories

- [Wonderlog API](https://github.com/bereketkib/wonderlog-api) - Backend API
- [Wonderlog Dashboard](https://github.com/bereketkib/wonderlog-dashboard) - Author's dashboard

## Features

- **Modern Authentication**

  - JWT-based authentication
  - Secure password handling
  - Protected routes
  - User role management

- **Rich Content Experience**

  - Rich text editor for comments
  - Markdown support
  - Image optimization
  - Dark mode support

- **Interactive UI**

  - Real-time content updates
  - Responsive design
  - Animated transitions
  - Search and filter functionality

- **User Features**
  - User profiles
  - Comment management
  - Post interactions
  - Account settings

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Authentication:** JWT
- **Editor:** TipTap
- **HTTP Client:** Axios

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/bereketkib/wonderlog-web.git
cd wonderlog-web
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Required environment variables:

```env
NEXT_PUBLIC_API_URL="your_api_url"
NEXT_PUBLIC_DASHBOARD_URL="your_dashboard_url"
```

4. Start the development server

```bash
npm run dev
```

## Project Structure

```plaintext
src/
├── app/                 # Next.js app router pages
├── components/         # Reusable React components
│   ├── ui/            # Base UI components
│   ├── post/          # Post-related components
│   └── profile/       # Profile-related components
├── context/           # React context providers
├── services/          # API service layers
└── styles/           # Global styles
```

## Key Features

### Authentication

- Secure login and registration
- Password validation
- Protected routes
- Role-based access

### Posts

- View published posts
- Search and filter posts
- Comment on posts
- Rich text editing

### User Profile

- View and edit profile
- Manage comments
- Account settings
- Dark mode preferences

## Contributing

1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Bereket Kibreab

## Visit

- [Wonderlog WebApp](https://wonderlog-web.vercel.app/)

## Acknowledgments

- Next.js team
- TailwindCSS team
- TipTap team

```plaintext

This README:
- Reflects the actual features implemented in the code
- Matches the styling of your existing API README
- Includes accurate tech stack information
- Provides clear setup instructions
- Maintains consistency with your branding
- Details the project structure
- Lists all major features
```
