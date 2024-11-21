
<div>
  <!--<a href="https://github.com/github_username/repo_name">
    <!--add the link to the image here
    <img src="github-image-readme.jpg" alt="Logo" width="200" height="200">
  </a> -->

<h1>CCNY Schedule Pro</h1>

  <h3>
    <b>Description</b><br />
  </h3>
<p>A project that has been development as part of my senior design 2 course. The intention of this is to replace the dependency on rate my professor, as well as provide features similar to discord as well as Google Calendar. While students can not only create their schedule, set reminders, notification alerting system, but they can also see up-to-date information regarding the classes being offered in each particular semester, filtered by depaertments that they are affiliated with, list of teachers as well as classes filtered based on the teachers specifically. Additionally, students can also see the most recent comments from Rate my Professor regarding a particular professor, allowing them to gain a better understanding of the teaching style of the professor, the class difficulty, to enable improved decision making as to whether or not they should move forward with the plan of taking this class.</p><br/>
  Students can also communicate within department groupchats, communicate privately amongst one another, share resoruces with one another. Unfortunately, the project is still early in development and is currently we are behind the expected schedule due to being overhwhelmed with classes, job search, and other obligations, leaving very little time to work on it, however, as the owner of this project, I will continue working on it during whichever free time I can set aside and ensure that this project can be pushed into production, it may take 1-2 additional years to clean things up and ensure I am able to provide satisfactory results, but the hope is that this is a potential app that can be marketed for CCNY students, this is my way of giving back to the college that has provided me with the education I needed for the career I wished to pursue.
    <br /><br />
    <b>
    <p>Following Are Links for Contact, to report Bugs and if you would like a new feature or Contribute:</p></b>
    <p><b>Email:</b> Dasa60196@gmail.com</p>
    <p><b>Discord:</b> the1sand0s</p>
  </p>
</div>


### Built With
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
* ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
* ![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
* ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
* ![SciPy](https://img.shields.io/badge/SciPy-%230C55A5.svg?style=for-the-badge&logo=scipy&logoColor=%white)

## Getting Started
If you would like to locally rn the project, please follow the instructions below

### Prerequisites
Ensure that npm's version is up to date (**NOTE** : Your not limited to npm only (**Recommended** : Yarn))
* npm 
  ```sh
  npm install npm@latest -g 
  ```

  ### Installation

1. Setup your bot and retrieve it's token following the guide and add the server to a server for testing [Setup Instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
2. Clone the repo
   ```sh
   git clone https://github.com/DeveloperMindset123/CCNY_SchedulePro.git
   ```
3. Install the packages
   ```sh
   yarn install
   ```
4. Enter the following values in `.env` (Modify as needed)
   <b>NOTE</b>: If you need help regarding setting up postgres, please refer to the following link, prisma is the middleware that connects the React-Native project with the Postgres Database (<i>Reference</i> : [prisma+postgres_setup](https://www.prisma.io/docs/orm/overview/databases/postgresql)), also, the encryption and decryption key should remain the same, otherwise, it will not work.
   ```basic
   DATABASE_URL="your postgres SQL database URL"
   JWT_ACCESS_SECRET=ANY_RANOMD_SECRET_KEY_DONT_SHARE
   JWT_REFRESH_SECRET=ANY_RANDOM_REFRESH_SECRET_DONT_SHARE
   ENCRYPTION_KEY=SOME_ENRYPTION_KEY
   DECRYPTION_KEY=SOME_ENCRYPTION_KEY
   ```
6. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```
   

### Screenshots (of current project)
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
<img src="" width="250"/>
