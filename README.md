<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <!--add the link to the image here-->
    <img src="github-image-readme.jpg" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Linear Algebra Discord Bot</h3>

  <p align="center">
    A discord bot capable of performing calculations ranging from Matrix arithemtics to Singular Value Decomposition. Topics covered are the topics that a student would see taking Linear Algebra as an undergraduate course. Although majority of the calculations was implemented using MathJs's API to simplify the mathematical implementation, some commands required direct mathematical logic from scaratch. Additionally implemented explanations and reference links upon both success/failure of command execution as well as logic for how to properly handle unsuccessful command execution.
    <br />
  <a href="https://discord.com/oauth2/authorize?client_id=1256271496955822112">Check It Out</a><br />
    <p>Following Are Links for Contact, to report Bugs and if you would like a new feature:</p>
    <p><b>Email:</b> Dasa60196@gmail.com</p>
    <p><b>Discord:</b> the1sand0s</p>
    
  </p>
</div>

### Built With

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![NixOS](https://img.shields.io/badge/NIXOS-5277C3.svg?style=for-the-badge&logo=NixOS&logoColor=white)
* ![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
* ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
* ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

If you would like to locally run the project, please follow the instructions below

### Prerequisites

Ensure that npm's version is up to date (NOTE : Your not limited to npm only).
* npm 
  ```sh
  npm install npm@latest -g 
  ```

### Installation

1. Setup your bot and retrieve it's token following the guide and add the server to a server for testing [Setup Instructions](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
2. Clone the repo
   ```sh
   [git clone https://github.com/github_username/repo_name.git](https://github.com/DeveloperMindset123/Linear-Algebra-Discord-Bot.git)
   ```
3. Install the packages
   ```sh
   npm install || yarn install || pnpm install || bun install
   ```
4. Enter your API in `config.json`
   ```json
   {
   "token" : "YOUR_DISCORD_BOT_TOKEN",
   "testServer" : "ID_OF_THE_SERVER_WHERE_YOU_ADDED_THE_BOT",
   "clientID" : "DISOCRD_CLIENT_ID",
   "guildId" : "SAME_AS_TEST_SERVER",
   "devs" : ["YOUR_PROFILE_ID", "ADDITIONAL_CONTRIBUTORS_ID", "..."]
   }
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Example Of How To Use Commands
<!--TODO : Add instructions for how to execute various commands here in the form of gifs using Kap-->
<!-- ROADMAP -->
## Roadmap

- [x] Matrix Addition/Subtraction
- [x] Scalar and Matrix Multiplication
- [x] Determining the determinant of a matrix
- [x] Determining the inverse of a matrix
- [x] Determining the eigenvalues and eigenvectors of a given matrix
- [x] Gaussian Elimination
- [x] Determining Linear Independence and Dependence
- [x] Determining coordinates of a x-vector given the basis matrix B
  - [x] Determining the x-vector given the coordinates of the vector and the basis Matrix B  
- [x] Orthogonal Projection, Orthonormal Bases and Gram-Schmidt
- [x] Singular values and Diagonalization of Matrix
- [x] Angle Between Two Vectors
- [x] QR Decomposition and SVD Decomposition
- [x] Deployed on Google Cloud's VM instance for 24/7 Access on-demand

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
