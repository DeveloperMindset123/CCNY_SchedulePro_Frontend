
# CCNY Schedule Pro

## Description

A project that has been development as part of my senior design 2 course.
The intention of this is to replace the dependency on rate my professor.

Alongside providing features similar to Google Calendar and Discord.

Features Includes but not Limited To:

- Create Schedules
- Set notificaiton reminders
- List of classes being offered per semester
- Most recent comments regarding particular professor from Rate My Professor
- Filter Professors by Department
- Determine difficulty level of course based on sentiment analysis model
- multi-chat communication amongst various groups/departments

Following Are Links for Contact, to report Bugs/Feature Enhancements:

**Email**: [Dasa60196@gmail.com](Dasa60196@gmail.com)
**Discord**: the1sand0s

### Built With

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

- ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

- ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

- ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

- ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

- ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

- ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

- ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)

- ![SciPy](https://img.shields.io/badge/SciPy-%230C55A5.svg?style=for-the-badge&logo=scipy&logoColor=%white)

## Getting Started

If you would like to locally rn the project, please follow the instructions below

### Installation

Ensure that npm's version is up to date (Recommended : Yarn)

- npm

```sh
  npm install npm@latest -g
```

- Clone the repo

```sh
  git clone https://github.com/DeveloperMindset123/CCNY_SchedulePro.git
```

- Install the packages

```sh
  yarn install
```

- Enter the following values in `.env` (Modify as needed)
   **NOTE**: Link below provides postgres and primsa middleware setup instruction:

  [prisma+postgres_setup](https://www.prisma.io/docs/orm/overview/databases/postgresql)

  Additionally, the encryption and decryption key should remain the same.

   ```basic
   DATABASE_URL="your postgres SQL database URL"
   JWT_ACCESS_SECRET=ANY_RANOMD_SECRET_KEY_DONT_SHARE
   JWT_REFRESH_SECRET=ANY_RANDOM_REFRESH_SECRET_DONT_SHARE
   ENCRYPTION_KEY=SOME_ENRYPTION_KEY
   DECRYPTION_KEY=SOME_ENCRYPTION_KEY
   ```

- Change git remote url to avoid accidental pushes to base project

```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
```

### Screenshots (of current project)

<img src="README_Images/CCNYSchedulePro10.png" width="250" alt="Landing Image"/>

<img src="README_Images/CCNYSchedulePro9.png" width="250" alt="authentication" />

<img src="README_Images/CCNYSchedulePro8.png" width="250" alt="signup-screen"/>

<img src="README_Images/CCNYSchedulePro7.png" width="250" alt="onboarding1"/>

<img src="README_Images/CCNYSchedulePro6.png" width="250" alt="onboarding2"/>

<img src="README_Images/CCNYSchedulePro5.png" width="250" alt="onboarding3"/>

<img src="README_Images/CCNY_SchedulePro4.png" width="250" alt="home-tab-schedule"/>

<img src="README_Images/CCNYSchedulePro3.png" width="250" alt="home-tab-class-list"/>

<img src="README_Images/CCNYSchedulePro2.png" width="250" alt="teacher-list"/>
