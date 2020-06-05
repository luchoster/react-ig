import React from 'react'

import {
  scrapingInstagramHashtags,
  scrapingInstagramPosts
} from './utils/Instagram'
import { mapIndexed, notNilOrEmpty } from './utils/Helpers'

import 'core-js'
import 'regenerator-runtime/runtime'

import './styles/main.css'

import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: [
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif'
  ],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['700']
    },
    {
      name: 'Merriweather',
      styles: ['400', '400i', '700', '700i']
    }
  ],

  bodyFontFamily: ['Montserrat', 'serif']
})

// Output CSS as string.
typography.toString()

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()

const Posts = props => (
  <>
    <a
      className="wrapper"
      href={`https://www.instagram.com/p/${props.shortcode}/`}
      target="_blank"
      rel="noreferrer noopener"
    >
      <div className="overlay" />
      <img src={props.thumbnail_src} alt={props.accessibility_caption} />
      <div justify="center">
        <div className="info">
          <div className="favorite">
            <i className="fa fa-heart fa-2x" />
            <div className="text" color="white">
              {props.edge_liked_by.count}
            </div>
          </div>
          <div className="chat">
            <i className="fa fa-comment fa-2x" />
            <div className="text" color="white">
              {props.edge_media_to_comment.count}
            </div>
          </div>
        </div>
      </div>
    </a>
  </>
)

const InstagramPosts = ({ altHash, hashtag, maxPosts, username }) => {
  const [igPosts, setIgPosts] = React.useState([])

  React.useEffect(() => {
    username
      ? scrapingInstagramPosts({
          username,
          maxPosts: maxPosts ? maxPosts : 12
        }).then(res => setIgPosts(res))
      : scrapingInstagramHashtags({
          hashtag: hashtag,
          altHash: altHash ? altHash : null,
          maxPosts: maxPosts ? maxPosts : 12
        }).then(res => setIgPosts(res))
  }, [])

  return (
    <div className="ig-posts">
      <div className="ig-posts__grid">
        {notNilOrEmpty(igPosts) &&
          mapIndexed((post, index) => {
            return <Posts key={index} {...post} />
          })(igPosts)}
      </div>
    </div>
  )
}

export default InstagramPosts
