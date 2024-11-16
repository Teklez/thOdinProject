# Members Only Club

## Overview
Members Only Club is a messaging app where users can sign up, log in, and create messages. The app includes role-based access:
- **Regular Users** can view messages but not authors or timestamps.
- **Members** can see authors and timestamps.
- **Admins** can delete messages.

Built using **Node.js**, **Express.js**, **Passport.js**, and **PostgreSQL**, this app focuses on user authentication and role management.

---

## Setup Instructions

### Prerequisites
- Node.js and npm
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Teklez/thOdinProject/edit/members_only
   cd members-only-club
   npm install
2. Install the dependencie
   ```bash
    npm install

3. Set up your .env file with the required environment variables
   ``` bash
    DATABASE_URL=your_postgresql_connection_string
    SECRET=your_secret_key
4. Start the server
   ``` bash
    npm run dev
Open the app in your browser at http://localhost:3000.

## Features

- **Sign Up & Login**: Users can register and log in using Passport.js for secure authentication.
- **Membership**: Users can enter a secret passcode to gain membership status.
- **Role-Based Access**:
  - **Regular users**: Can see messages but not authors or timestamps.
  - **Members**: Can see authors and timestamps.
  - **Admins**: Can delete messages.
- **Message Management**: Users can create messages with a title, timestamp, and content.
- **Admin Control**: Admin users can delete messages via a dedicated button.


Enjoy exploring the **Members Only Club**! 🎉

