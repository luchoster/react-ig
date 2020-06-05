React-Ig
===
![npm](https://img.shields.io/npm/v/@luchoster/react-ig?style=for-the-badge)


This React Component will allow you to scrape Instagram posts and dislay a grid of images with an overlay (on hover) of number of likes and comments, each image links (opens in a new tab) to it's IG post url.

Based, inspired and ported from [Gatsby Source Instagram](https://github.com/oorestisime/gatsby-source-instagram).

Development
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


Install
---

**npm**

`npm install @luchoster/react-ig --save`

**yarn**

`yarn add @luchoster/react-ig`

Available Props
---

```
  username
  hashtag
  altHash
  maxPosts
```

How to use
---

`import InstagramPosts from '@luchoster/react-ig'`

`<InstagramPosts username="vegas" />`

when using the `username` prop, it will only return the most recent 12 posts from that account, but you can use `maxPosts` if you want to display than 12 posts

or you can get scrape a `hashtag` and define a number of `maxPosts` (recommended) to display

`<InstagramPosts hashtag="vegas" maxPosts="24" />`


![](https://i.imgur.com/UJbkyd0.png)



###### tags: `React` `Instagram` `instafeed`

