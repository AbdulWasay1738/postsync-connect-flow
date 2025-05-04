![Image Not Accessible](logo.png)

# PostSync - Social Media Management Application

## Overview

PostSync is a web-based application designed to streamline social media management by allowing users to create, schedule, and post content across multiple platforms (Instagram, Facebook, and LinkedIn) from a single dashboard. This project includes a client-side interface built with React.js and a server-side backend implemented with Node.js/Express.js, integrated with a MongoDB Atlas database and a separately deployed Gemini API for image caption generation.

## Prerequisites





1. Node.js (latest stable version recommended)



2. npm (Node Package Manager)



3. Git (for cloning the repository)



4. A code editor (e.g., VS Code)



5. MongoDB Atlas account (for database setup)



6. Internet connection (for API calls and deployment)

## Installation and Setup

**Step 1:** Clone the Repository





Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/AbdulWasay1738/PostSync.git
```


Navigate to the project directory:
```bash
cd PostSync
```
**Step 2:** Install Dependencies





Open two separate command-line interfaces (e.g., Command Prompt, PowerShell, or Terminal).



In the first command-line interface, navigate to the client directory: 

```bash
cd client
```
Then install the client dependencies:
```bash
npm install
```


In the second command-line interface, navigate to the server directory:
```bash
cd server
```
Then install the server dependencies:
```bash
npm install
```


Wait for the installation to complete in both command-line interfaces.

**Step 3:** Run the Application





In the server command-line interface, start the server by running:
```bash
npm run dev
```


Once the server is running, in the client command-line interface, start the client by running:
```bash
npm run dev
```


The client interface will display a local host address (e.g., http://localhost:3000). Copy this address and paste it into your preferred web browser to access the application.

**Step 4:** Usage





- Log or Sign up in using email credentials.



- Use the dashboard to compose posts, schedule them, and post to Instagram, Facebook, or LinkedIn.



- Upload images to generate captions via the integrated Gemini API.



- Manage profiles, drafts, and settings as per the user interface.

**Development Notes**





- The application follows the SCRUM methodology with three sprints



- Trello boards and GitHub commits track progress.



- The project is deployed on Hostinger; for production, update the .env file with production API keys and database URLs.

**Contributing**

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with detailed changes. Ensure all tests pass before submission.
