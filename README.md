React-Ig
===
![github](https://img.shields.io/github/package-json/v/luchoster/react-ig?style=for-the-badge)


This React Component will allow you to scrape Instagram posts and dislay a grid of images with an overlay (on hover) of number of likes and comments, each image links (opens in a new tab) to it's IG post url.

Based, inspired and ported from [Gatsby Source Instagram](https://github.com/oorestisime/gatsby-source-instagram).

## Table of Contents

[TOC]

Install
---

**npm**

`npm install @luchoster/react-ig --save`

**yarn**

`yarn add @luchoster/react-ig`

How to use
---
`import InstagramPosts from '@luchoster/react-ig'`

`<InstagramPosts username="vegas" />`

when using the `username` prop, it will only return the most recent 12 posts from that account

or you can get scrape a `hashtag` and define a number of `maxPosts` (recommended) to display

`<InstagramPosts hashtag="vegas" />`


Available Props
---

```
  username
  hashtag
  altHash
  maxPosts
```

![](https://i.imgur.com/UJbkyd0.png)



###### tags: `React` `Instagram` `instafeed`

