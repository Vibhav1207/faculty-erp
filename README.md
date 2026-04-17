# Faculty Nexus (Academic Curator) 🎓

**Faculty Nexus** is a premium, modern, and highly-responsive web portal designed for educational institutions. It acts as an "Academic Curator," allowing professors and faculty members to effortlessly manage student attendance, track assignment submissions, view analytics, and engage with student tickets.

The platform was built with a strict adherence to a "No-Line" design philosophy—using ethereal ambient shadows, glassmorphic overlays, and tonal background shifts rather than rigid borders to create a smooth, cloud-like user experience.

---

## 🚀 Key Features

*   **Responsive Fluid Layout:** Dynamic sidebar that collapses into a hamburger menu on tablets and mobile devices, ensuring zero overlap and maximum screen economy.
*   **Analytics Overview:** Bento-box style key performance indicators (KPIs) and mockups for charting student progress and attendance trends.
*   **Ticket & Communication Hub:** A fully-fledged two-pane layout for handling student inquiries, complete with chat-bubble interactions.
*   **Assignment Management:** Interfaces for drafting new assignments with drag-and-drop zones, and tracking student submission statuses.
*   **Smart Attendance:** Configurable daily session roll-calls with bulk-action tools.

---

## 🛠️ Technology Stack

This application utilizes a modern, lightweight, and incredibly fast frontend ecosystem.

*   **Core Framework:** [React.js](https://react.dev/) via [Vite](https://vitejs.dev/)
*   **Client Routing:** [React Router DOM](https://reactrouter.com/en/main)
*   **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/)
    *   *Plugins:* `@tailwindcss/forms` for form aesthetics, `@tailwindcss/container-queries` for localized component responsiveness.
*   **Typography:** [Google Fonts](https://fonts.google.com/) (Inter & Manrope)
*   **Iconography:** Google Material Symbols (Outlined)
*   **Proposed Backend:** Firebase (Firestore NoSQL Database, Firebase Auth, and Node.js Cloud Functions). Currently, the UI is statically implemented to await backend integration.

---

## 📂 Project Structure

```text
src/
├── components/
│   └── DashboardLayout.jsx      # The primary shell (TopNav & SideNav)
├── pages/
│   ├── AnalyticsDashboard.jsx   # Data visualization & KPIs
│   ├── AssignmentCreator.jsx    # Form for publishing new work
│   ├── AssignmentOverview.jsx   # List of current assignments
│   ├── AttendanceSelection.jsx  # Context setup for a class roll
│   ├── DashboardTimetable.jsx   # The main landing tracking the day's events
│   ├── LoginScreen.jsx          # Secure entry point with glassmorphism
│   ├── ManualAttendanceSheet.jsx# The active student tracking sheet
│   ├── RaisedTicketsList.jsx    # Table of open student issues
│   └── TicketDetail.jsx         # Chat interface for resolving issues
├── App.jsx                      # Routing logic defining page endpoints
├── index.css                    # Tailwind imports and custom ambient shadow utilities
└── main.jsx                     # React DOM entry point
```

---

## ⚙️ Getting Started

Follow these steps to run the portal locally on your machine.

### Prerequisites
Make sure you have Node.js (version 16 or higher) installed.

### 1. Install Dependencies
Navigate inside the `faculty-nexus` directory and install the Node packages.
```bash
npm install
```

### 2. Start the Development Server
Launch the local Vite server. The terminal will provide a localhost URL to view the frontend in your browser.
```bash
npm run dev
```

---

## 🎨 Design System ("Academic Curator")

The app deviates from standard data-heavy dashboards by enforcing specific style mandates:
1.  **Typography**: `Manrope` for all heavily weighted headers and numerical metrics. `Inter` exclusively designed for readability in body text and data labels.
2.  **Colors**: Built upon `surface`, `surface-container-lowest`, and `primary-container` tokens mapped directly in `tailwind.config.js`. 
3.  **Shadows**: Instead of hard 1px borders, cards use a custom `.ambient-shadow` class defined in `index.css` to create elevation.
