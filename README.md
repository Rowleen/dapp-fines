This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Dapp penalty

## Run the development server:

```bash
npm run install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Launch test suits

```
npm run test
```

## JSON server
This app is connected a online fake JSON server. In the next line you can explore the entire DB or one by one object.

https://my-json-server.typicode.com/Rowleen/dapp

In the moment of trigger user actions like update (approve or reject) a fine or create one, you would see the calls to the endpoints in the network tab in your DevTools of your browser.

## How login
The app haven't a validation of login, so you can login with any user known in the app with a random password. Any password will works.

The only validation in the login is that you have to use one of these user names:

- Jhon
- Susan
- Jack
