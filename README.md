<a id="readme-top"></a>

<h1 align="center">👊🏻 DumHai! - Online Quiz Platform 🧠</h3>

<div align="center">
<img src="https://img.shields.io/badge/Repository%20Status-Active-dark%20green.svg" alt="repository_status">
<img src="https://img.shields.io/badge/Website%20Status-Online-green" alt="website_status">
<img src="https://img.shields.io/badge/Author-Rahul%20Behera-blue.svg" alt="author">
<img src="https://img.shields.io/badge/Last%20Updated-5%20August%202025-yellow.svg" alt="last_updated">

</div>
<br />

<p align='center'>
  <img src = "https://github.com/user-attachments/assets/b5b4c8ec-b199-4dc4-94e7-c9a3d6e6dea3" width="700">
<p>

DumHai is an  online examination platform built with Next.js, MongoDB, and Tailwind CSS. This scalable application offers real-time quiz functionality, including automated scoring, progress tracking, and detailed performance analytics.

**✨ Key Features:**

- **Real-Time Quiz Experience:** 30-minute timed quizzes with auto-submission functionality.
- **Dynamic Question Loading:** Fetches trivia questions from the OpenTDB API with HTML entity decoding.
- **Progress Tracking:** Save and restore quiz progress with question marking and navigation.
- **Comprehensive Results:** Detailed question-by-question analysis with color-coded feedback.
- **User Management:** Email-based session management with MongoDB persistence.
- **Responsive Design:** Optimized interface for both desktop and mobile devices.


<br>
<h3 align="center">🛠️ Built With</h3>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/-Mongodb-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb">
<img src="https://img.shields.io/badge/Framer_Motion-FF4785?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
</div>
<br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Getting Started

Follow these steps to get a local copy of the project running.

**Prerequisites**

Make sure you have the following tools installed:

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

**Environment Variables**

Create a `.env` file in the root of your project and add the following variables:

```env
MONGODB_URI=<your_mongodb_uri>
```

Replace `<your_mongodb_uri>` with your specific credentials.

**Installation**

1. Clone the repository:
   ```sh
   git clone https://github.com/rahulxyzten/dum-hai.git
   cd dum-hai
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🏗️ Project Structure

```bash
dum-hai/
├── app/
│   ├── api/
│   │   ├── questions/
│   │   │   └── route.js          # User/session creation & store quiz questions
│   │   ├── quiz/
│   │   │   └── route.js          # Quiz management and navigation API
│   │   └── session/
│   │       └── [id]/
│   │           └── route.js      # Session-specific data retrieval
│   ├── quiz/
│   │   └── page.js               # Main quiz interface page
│   ├── report/
│   │   └── page.js               # Results and performance analytics page
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global CSS styles and Tailwind imports
│   ├── layout.js                 # Root application layout wrapper
│   └── page.js                   # Homepage with email input and quiz start
├── components/
│   ├── Header.js                 # Navigation header component
│   ├── LoadingSpinner.js         # Reusable loading indicator component
│   ├── ProgressIndicators.js     # Quiz progress visualization component
│   ├── Question.js               # Individual question display component
│   ├── QuestionNavigation.js     # Question number navigation grid
│   └── Timer.js                  # Countdown timer component
├── lib/
│   ├── models/
│   │   ├── QuizSession.js        # Mongoose schema for quiz sessions
│   │   └── User.js               # Mongoose schema for user data
│   └── mongodb.js                # Database connection configuration
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 Usage

- **Start Quiz:** Enter your email address on the homepage to begin
- **Take Quiz:** Answer 15 trivia questions within the 30-minute time limit
- **Navigate:** Use question numbers to jump between questions
- **Mark Questions:** Flag questions for review using the mark feature
- **Submit:** Complete and submit your quiz for detailed results
- **View Results** Analyze your performance with comprehensive feedback

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🖼️ Screenshots

<h3 align="center">Desktop View</h3>
<br>
<div align='center'>
  <p align="center">
    <img width="45%" src="https://github.com/user-attachments/assets/7165c192-295f-4561-9ddd-2f978d54727d">
    <img width="45%"src="https://github.com/user-attachments/assets/136c193f-7d75-43c6-b6ce-d1fb1cdcf6ae">
    <br/>
    <br/>
    <br/>
    <img width="45%" src="https://github.com/user-attachments/assets/4b2a48f3-6da1-48c5-903c-1e7119cade86">
    <img width="45%" src="https://github.com/user-attachments/assets/79560f83-e9fb-4342-ba98-05c190ed60d7">
  </p>
</div>
 <br/>
 <br/>

<h3 align="center">Tablet View</h3>
<br>
<div align='center'>
  <p align="center">
    <img width="45%"src="https://github.com/user-attachments/assets/e338e523-3945-4a72-b329-ed4e34a2abfb">
    <img width="45%"src="https://github.com/user-attachments/assets/37f21557-c14e-4fdd-9256-cd815b8056d4">
    <br/>
    <br/>
    <br/>
    <img width="45%"src="https://github.com/user-attachments/assets/a0b93708-f18c-4264-b936-6363fe6ff5c6">
    <img width="45%"src="https://github.com/user-attachments/assets/7fdd267f-c505-4c8b-bdf3-3250aff0c3f0">
  </p>
</div>
 <br/>
 <br/>

 <h3 align="center">Mobile View</h3>
<br>
<div align='center'>
  <p align="center">
    <img width="45%" height="70%" src="https://github.com/user-attachments/assets/f0490f10-5d1d-420c-987b-465735b307df">
    <img width="45%" height="70%" src="https://github.com/user-attachments/assets/0c9c89f5-83a7-4ddf-89b2-74d2b9b4f66c">
    <br/>
    <br/>
    <br/>
    <img width="45% "height="70%" src="https://github.com/user-attachments/assets/63aa35ce-440c-43be-a18f-2423bc847e11">
    <img width="45%" height="70%" src="https://github.com/user-attachments/assets/304dad5e-baf1-4bd4-8821-b28d7d9d5479">
  </p>
</div>
 <br/>
 <br/>

 
<p align="center">
  <a href="#">
    <img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with Love">
  </a>
</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
