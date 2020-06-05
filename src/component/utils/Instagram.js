import * as R from 'ramda'
import axios from 'axios'
import cheerio from 'cheerio'

import { mapIndexed, notNilOrEmpty } from './Helpers'

const parseResponse = response => {
  const $ = cheerio.load(response.data)
  const scripts = $(`html > body > script`)
  // Code smells #40 and #42
  //   // I should verify why i get the script before the body tag
  let id = 0
  if (scripts.get(0).attribs.type === `application/ld+json`) {
    id = 1
  }
  const jsonData = $(`html > body > script`)
    .get(id)
    .children[0].data.replace(/window\._sharedData\s?=\s?{/, `{`)
    .replace(/;$/g, ``)
  return JSON.parse(jsonData).entry_data
}

export async function scrapingInstagramPosts({ username, maxPosts }) {
  return axios
    .get(`https://www.instagram.com/${username}/`)
    .then(response => {
      const data = parseResponse(response)
      const photos = []

      data &&
        mapIndexed((item, index) => {
          mapIndexed((post, i) => {
            return photos.push(post.node)
          })(item[0].graphql.user.edge_owner_to_timeline_media.edges)
        })(R.values(data))

      return maxPosts ? photos.slice(0, maxPosts) : photos
    })
    .catch(err => {
      console.warn(`\nCould not fetch instagram posts. Error status ${err}`)
      return null
    })
}

export async function scrapingInstagramHashtags({
  altHash,
  hashtag,
  maxPosts
}) {
  return axios
    .get(`https://www.instagram.com/explore/tags/${hashtag}/`)
    .then(response => {
      const data = parseResponse(response)
      const photos = []
      data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges.forEach(
        edge => {
          if (edge.node) {
            notNilOrEmpty(altHash)
              ? R.contains(
                  `#${altHash}`,
                  edge.node.edge_media_to_caption.edges[0].node.text
                ) && photos.push(edge.node)
              : photos.push(edge.node)
          }
        }
      )
      return maxPosts ? photos.slice(0, maxPosts) : photos
    })
    .catch(err => {
      console.warn(
        `\nCould not fetch instagram posts from hashtag. Error status ${err}`
      )
      return null
    })
}
