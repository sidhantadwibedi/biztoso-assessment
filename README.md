📊 Business Profiles & Marketplace

A modern Angular application with two main sections:

1. Business Profiles – Create and manage business profiles with a live chat feature.

2. Marketplace – Create, view, edit, delete listings, and filter/search for items.

🚀 Features

🧑‍🤝‍🧑 Business Profiles

1. Profile Management: Create, view, and update business profiles.

2. Live Chat: Real-time chat via /networking/chat.

🛒 Marketplace

1. Create/Edit Listings: Add new listings or edit existing ones via /marketplace/create and /marketplace/edit/:id.

2. View Listings: Display listings in a responsive grid layout.

3. CRUD Operations: Full support for Create, Read, Update, and Delete actions.

Search & Filter: Search by title and filter by price range.

🗺️ Navigation

1. Landing Page: Acts as a hub for both Business Profiles and the Marketplace.

2. Secure Access: Users must log in before accessing the landing page and its features.


🛠️ Setup Instructions

1. git clone https://github.com/sidhantadwibedi/biztoso-assessment.git
2. cd your-project-folder

Install Dependencies

1. npm install

Run the Application

1. ng serve --open

Access Routes

1. Login: /auth/login

2. Landing Page: /landing

3. Create Profile: /networking

4. Live Chat: /networking/chat

5. Create Listing: /marketplace/create

6. Edit Listing: /marketplace/edit/:id

🎨 Design Decisions

1. Component-Based Structure: Each feature is isolated for easier maintenance.

2. Reactive Forms: Utilized for better handling of complex forms and validation.

3. State Management: Simple services (e.g., ListingService, ProfileService) manage local state and sync with localStorage.

4. Modular Architecture: Lazy-loaded feature modules to improve performance and scalability.

5. Responsive Design: CSS grid for adaptive layouts on desktop and mobile devices.
