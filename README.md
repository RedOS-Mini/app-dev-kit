# app-dev-kit
An environment to quickly develop and test RedOS Mini apps

# Usage

To get started, clone this repository and run `npm install`. 

Your app's code goes in [app.js](./app.js). You can start the development server with `npm run dev`. You have access to typing for almost all methods and objects your app will have access to in production, but Scratch objects will not work! Also, the `backend.loadImage()` function is asynchronus here, but it isn't in the actual os.

Once you're finished run `npm run build`, your app will be converted to a production ready state(i tried to get error checking for missing semicolons but i don't know regex) in [build.js](./build.js).

Copy that file and load it into a test app in the OS and you're done!