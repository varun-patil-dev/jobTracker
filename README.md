# Job Tracker

A modern React application designed to help job seekers manage and track their job applications effectively. Monitor application statuses, schedule interviews, and gain insights into your job search journey.

**[Live Demo](https://job-tracker-rust-xi.vercel.app/)**

## Features

### Core Functionality
- **Dashboard**: Overview of your job search with key statistics (total applications, interviews, offers, rejections)
- **Application Management**: Add, edit, and delete job applications with detailed information
- **Status Tracking**: Track application progress through different stages (Applied, Interview Scheduled, Offer Received, Rejected)
- **Search & Filter**: Advanced filtering by platform, location type, and application status
- **Bookmarking**: Bookmark favorite opportunities for quick access
- **Local Storage Persistence**: All data is saved locally and persists across sessions

### Analytics Features
- **Status Distribution Chart**: Visual breakdown of applications by status using pie charts
- **Monthly Trends**: Track application activity over time with bar charts
- **Real-time Statistics**: Live counters for total apps, interviews, offers, and rejections

### Application Details
- Company name and job role
- Location and location type (Remote, Onsite, Hybrid)
- Platform source (LinkedIn, Indeed, Company Site, Referral)
- Salary information
- Applied date and interview date
- Personal notes
- Application bookmarking

## Getting Started

### Prerequisites
- Node.js (v16 or higher) and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/varun-patil-dev/jobTracker.git

# Navigate to the project directory
cd jobTracker

# Install dependencies
npm install
```

### Running the App

**Development mode:**
```bash
npm run dev
```
The app will open at `http://localhost:5173`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.jsx          # Overview and statistics dashboard
│   ├── Applications.jsx        # Main applications list with filters
│   ├── AddApplication.jsx      # Form to add new applications
│   ├── EditApplication.jsx     # Form to edit existing applications
│   └── Analytics.jsx           # Advanced analytics and charts
├── components/
│   ├── Navbar.jsx             # Navigation bar
│   ├── JobCard.jsx            # Individual application card component
│   ├── SearchInput.jsx        # Search functionality
│   └── JobFilters.jsx         # Filter controls
├── context/
│   └── ApplicationContext.jsx  # Global state management
├── hooks/
│   └── useLocalStorage.js      # Custom hook for localStorage
├── services/
│   └── api.js                 # API integration and data fetching
├── utils/
│   └── helpers.js             # Utility functions
├── App.jsx                    # Main app component and routing
└── main.jsx                   # Entry point
```

## State Management

The app uses React Context API for global state management:
- **ApplicationContext**: Manages applications array, CRUD operations, and data persistence
- **useLocalStorage Hook**: Custom hook that syncs application data with browser's localStorage

## Technologies Used

- **React 18.2**: UI framework
- **Vite 5.0**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **Recharts**: Data visualization and charts
- **React Hook Form**: Form handling and validation
- **Yup**: Schema validation
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library
- **Axios**: HTTP client for API calls
- **React Toastify**: Toast notifications
- **date-fns**: Date manipulation and formatting

## How to Use

1. **View Dashboard**: Start by viewing the dashboard to see an overview of your job search
2. **Add Application**: Click "Add Application" to record a new job application
3. **Fill Details**: Enter company, role, location, salary, platform, and personal notes
4. **Manage Status**: Use the applications list to view and update application status
5. **Filter & Search**: Use search and filters to find specific applications
6. **Bookmark Favorites**: Click the bookmark icon to mark important opportunities
7. **View Analytics**: Check the analytics page for insights into your job search progress
8. **Edit Applications**: Click on any application to edit details or update status

## Features in Detail

### Dashboard
- Real-time statistics widget showing total applications, interviews, offers, and rejections
- Visual pie chart showing application distribution by status
- Monthly trend line chart tracking applications over time

### Applications Page
- Tabbed interface for different application statuses
- Advanced filtering options (platform, location type, status)
- Search functionality across company names and job roles
- Sort by applied date or salary
- Bookmark toggle for favorites

### Analytics Page
- Status distribution pie chart
- Monthly application trends bar chart
- Interactive charts with tooltips

## Browser Support

Works on all modern browsers with localStorage support:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Data

Sample job data is loaded from the DummyJSON API on first load to help you get started quickly.

## Author

[Varun Patil](https://github.com/varun-patil-dev)

## License

This project is open source and available under the MIT License.
