<h1 align="center">Untitled Notes</h1>

<p align="center">A Notetaking Application with Realtime Markdown and Collaborative Features</p>
<p align="center"><img src="https://raw.githubusercontent.com/ryan-jm/untitled-notes/main/splashscreen.png" alt="Markdownify" width="200">
<br /><a href="https://untitled-notes.vercel.app/">Explore</a>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Overview](#overview)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites:](#prerequisites)
  - [Installation:](#installation)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

Untitled Notes features a realtime markdown editor with a multitude of features within; including live collaboration sessions with friends utilising WebRTC and YJS. This application was built during the last three weeks of the Northcoders bootcamp. It was built in Nextjs, with Firebase as a backend and TypeScript as the main language. We decided to use eslint, prettier, and Husky to enforce a style guide with pre-commit hooks.

## Built With

<img src="https://img.shields.io/badge/TypeScript-1D1E23?style=for-the-badge&logo=typescript&logoColor=2D79C7" alt="TypeScript"/> <img src="https://img.shields.io/badge/Next.js-FFFFFF?style=for-the-badge&logo=next%2Ejs&logoColor=000000" alt="Next.js" /> <img src="https://img.shields.io/badge/Chakra UI-319795?style=for-the-badge&logo=chakra%20ui&logoColor=FFF" alt="Chakra UI" /> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=black" alt="Firebase"> <img src="https://img.shields.io/badge/WebRTC-FFFFFF?style=for-the-badge&logo=WebRTC&logoColor=333333" alt="Firebase">

## Getting Started

The website is hosted on Vercel, if you'd like to view it [click here](https://untitled-notes.vercel.app/) to view and interact with it through your browser (Firefox recommended for the larger range of support for the WebRTC API). Alternatively, you can follow the steps below to have it operating locally on your machine.

### Prerequisites:

- Fork and clone the repository on your machine.

- Make sure you have [Node >v14.x](https://nodejs.org/en/) and the latest version of [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

- Have a [Firebase](https://firebase.google.com/) account set up with a project that has Firestore and Firebase Authentication enabled.

### Installation:

- `cd` into the cloned repo and run `npm install` to install the dependencies.
- Create a `.env.local` file in the root folder with the following structure:

  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=
  NEXT_PUBLIC_ABLY_API_KEY=
  ```

- Once all dependencies are installed, you can use the command `npm run dev` to begin hosting a local development server for the website to be hosted upon.

## License

This API is released under the terms of MIT License.

## Acknowledgements

Thanks to the whole team at [Northcoders](https://northcoders.com/) for providing such an incredible learning environment.
