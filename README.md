<h1 align="center">
  Spotify Remote
</h1>

<p align="center">
    <a style="text-decoration: none" href="https://nextjs.org/" alt="Next.js">
        <img src="https://img.shields.io/badge/framework-Next.js-61dbfb" />
    </a>
    <a style="text-decoration: none" href="https://www.typescriptlang.org/" alt="TypeScript">
        <img src="https://img.shields.io/badge/language-TypeScript-3178c6" />
    </a>
    <a style="text-decoration: none" href="https://tailwindcss.com/" alt="Tailwind CSS">
        <img src="https://img.shields.io/badge/styling-Tailwind_CSS-38bdf8" />
    </a>
    <a style="text-decoration: none" href="https://recoiljs.org/" alt="Recoil">
        <img src="https://img.shields.io/badge/state_management-Recoil-3578e5" />
    </a>
    <a style="text-decoration: none" href="https://eslint.org/" alt="Eslint">
        <img src="https://img.shields.io/badge/linter-ESLint-4a31c3" />
    </a>
    <a style="text-decoration: none" href="https://prettier.io/" alt="Prettier">
        <img src="https://img.shields.io/badge/code_style-Prettier-ff69b4" />
    </a>
</p>


A small *Spotify* clone, implementing the Spotify authentication, playlists and music playback.

*Note:* Due to the limitations of the spotify API


## 🚀 Getting started

If you want to play around with the code yourself - feel free to do so 🧑🏻‍💻. First clone the project using
```shell script
git clone https://github.com/florianbuehler/spotify-remote.git
```
(or alternatively using SSH and `git@github.com:florianbuehler/spotify-remote.git`) and then navigate into the root folder of the project and run
```shell script
npm install
```
to install the required packages into the `node_modules` folder.


## 🔧 Development

To start the development server with hot reload configured, run
```shell script
npm run dev
```
and then navigate to `http://localhost:3000` in your Browser.

To help ensuring some basic formatting and code quality standards, the project has prettier and eslint configured. So you can simply use
```shell script
npm run eslint
```
to see if the code matches the standards and run
```shell script
npm run fix-eslint
```
to let eslint fix it automatically where possible.


## 💫 Deployment
