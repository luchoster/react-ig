import React from 'react'

import InstagramPosts from './component-ig/InstagramPosts'

import './styles/main.scss'

export default () => (
  <div className="container">
    <header className="header">Username: vegas</header>
    <InstagramPosts username="vegas" />
  </div>
)
