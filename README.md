# Pictocart Editor test

- Test by Hasan Wajahat.
- For frontend position.

## Folder Structure

In order to simulate a real SPA I have moved the backend resources into its own folder and created a new folder for the frontend part. Some of the assets like bootstrap.css have been moved from the backend folder to frontend.
The crux of the app can be found in the src folder in the frontend folder.
The app was created using vue-cli so it follows its convention and file extensions.

In components the HomePage is the main component that imports all others.

## Features

Following features have been implemented in the app

- Image Upload and preview.
- Ability to add image and text to the canvas.
- Ability to move the different assets on the canvas.
- The ability to delete assets from the canvas.
- The ability to add multiple assets.
- Ability to save your canvas in to your session, so that asset is reloaded on when 
page is refreshed.
- Considerable test coverage

## Possible Improvements

Due to time constraints the following improvements can still be made on the app:

- Improved styling, specially the file input needs to be custom instead of standard html one.
- The drag and drop can be jittery at times, it needs more fine tuning.
- Better test coverage, I was not able to mock api's due to some issue with file load in jest, so we don't have 100% test coverage.
- Instead of v-on: syntax the emitters should have used @ syntax.
- App is not fully responsive.

## How to run project

- Go to backend root folder and run server after npm install.
- Go to frontend folder and then run server after npm install.
- Instructions for running tests and servers are present their respective readme files.
- Keep in mind, the proxy for backend is hardcoded so if the port is changed, the proxy needs to be updated.