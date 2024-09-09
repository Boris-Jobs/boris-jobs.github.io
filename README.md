# UbuntuOS-inspired Theme Personal Webpage

## Source Code

**The original template is from https://github.com/vivek9patel/vivek9patel.github.io**

## Instructions

本地部署出现` listen EADDRINUSE: address already in use :::3000 `的问题, 解决方案: ` netstat -aon | findstr :3000 `, 随后` taskkill /PID [PID结果] /F `.

This is a personal portfolio website of theme Ubuntu 20.04, made using Next.js & tailwind CSS.
If you want to edit this. Clone this project and edit the files in `/src/components`.

To run this on localhost
type `npm start` and when u are done coding type `npm run build` to build your app.

_NOTE: if you have yarn just replace `npm start` and `npm run build` with `yarn start` and `yarn build`._

要是使用了` New Folder `, 暂时还没开发删文件夹的function, 可以` F12 `然后到Console:
```
var folders = JSON.parse(localStorage.getItem('new_folders'));
var updatedFolders = folders.filter(folder => folder.id !== 'new-folder-1');
localStorage.setItem('new_folders', JSON.stringify(updatedFolders));
```

### To make the contact form work

- Create a account in [emailjs](https://www.emailjs.com/) create also new Outlook or Gmail account to be able
  to send email.
- Create a new service, select and log in to your newly created outlook or gmail account on EmailJS.
- Go back to the dashboard and get the Service ID copy it.
- Create a .env file in your root folder and put

```

NEXT_PUBLIC_USER_ID = 'YOUR_USER_ID'
NEXT_PUBLIC_TEMPLATE_ID = 'template_fqqqb9g'
NEXT_PUBLIC_SERVICE_ID = 'YOUR_SERVICE_ID'

```

into it. Replace \*your user id and your service ID with your values in your EmailJS service.




## This project was made using Create Next App!

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

记得先更新package.json, 随后deploy即可.

<!-- ## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributiors who wants to make this website better can make contribution,which will be **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->
