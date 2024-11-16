# Members Only

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
   cd members_only
   npm install
2. Install the dependencie
   ```bash
    npm install

3. Set up your .env file with the required environment variables
   ``` bash
   DB_PASSWORD=database_password
   MEMBER=false
   SESSION_SECRET=your_sercrete
4. Start the server
   ``` bash
    npm run dev
Open the app in your browser at http://localhost:3000.


Enjoy exploring the **Members Only Club**! 🎉

