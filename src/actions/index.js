import axios from 'axios'
import htmlToJson from 'html-to-json'

export const ROOT_URL = 'http://nicegame.tv'
// const ROOT_PROXY_URL = `https://cors.io/?${ROOT_URL}`
// const ROOT_PROXY_URL = `http://cors-proxy.htmldriven.com/?url=${ROOT_URL}`
const ROOT_PROXY_URL = `https://proxy-sauce.glitch.me/${ROOT_URL}`
export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const FETCH_BOARDS = 'FETCH_BOARDS'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_POST = 'FETCH_POST'

export function openMenu (target) {
  return {
    type: OPEN_MENU,
    payload: target
  }
}

export function closeMenu () {
  return {
    type: CLOSE_MENU
  }
}

export function fetchBoards () {
  const request = axios.get(`${ROOT_PROXY_URL}/bbs/freeboard/list`)

  return (dispatch) => {
    request.then(({ data }) => {
      retrieveBoards(data).then(({ boards }) => {
        dispatch({
          type: FETCH_BOARDS,
          payload: boards
        })
      })
    })
  }
}

export function fetchPosts (boardId, page) {
  const request = axios.get(`${ROOT_PROXY_URL}/bbs/${boardId}/list/${page}`)

  return dispatch => {
    request.then(({ data }) => {
      retrievePosts(data).then(({ posts }) => {
        dispatch({
          type: FETCH_POSTS,
          payload: {
            id: boardId,
            posts,
            page
          }
        })
      })
    })
  }
}

export function fetchPost (boardId, postId) {
  const request = axios.get(`${ROOT_PROXY_URL}/bbs/${boardId}/view/${postId}`)

  return dispatch => {
    request.then(({ data }) => {
      retrievePost(data).then(({ posts, comments }) => {
        dispatch({
          type: FETCH_POST,
          payload: {
            id: boardId,
            post: {
              id: postId,
              content: posts[0].content,
              comments: comments
            }
          }
        })
      })
    })
  }
}

function retrievePost (html) {
  return htmlToJson.batch(html, {
    posts: htmlToJson.createParser(['.content', {
      content: function ($section) {
        return $section.html()
      },
    }]),
    comments: htmlToJson.createParser(['.comment > .item', {
      writer: function ($section) {
        return $section.find('.nick').text().trim()
      },
      avatar: function ($section) {
        return $section.find('img').attr('src')
      },
      content: function ($section) {
        return $section.find('.content').text().trim()
      },
      created: function ($section) {
        return $section.find('.date').text().trim()
      },
    }]),
  })
}

function retrievePosts (html) {
  return htmlToJson.batch(html, {
    posts: htmlToJson.createParser(['#BoardList > table > tbody > tr', {
      id: function ($section) {
        const link = $section.find('td.l > p > a').attr('href')
        return link.slice(0, link.indexOf('?')).split('/')[4]
      },
      title: function ($section) {
        return $section.find('td.l > p > a').text()
      },
      numComments: function ($section) {
        const numCommentsStr = $section.find('td.l > p > a:nth-child(2)').text()
        return numCommentsStr.slice(1, numCommentsStr.length - 1)
      },
      writer: function ($section) {
        return $section.find('td.nick > p > span').text()
      },
      badge: function ($section) {
        return $section.find('td.nick > p > img').attr('src')
      },
      created: function ($section) {
        return $section.find('td:nth-child(4)').text()
      },
      views: function ($section) {
        return $section.find('td:nth-child(5)').text()
      },
      upvotes: function ($section) {
        return $section.find('td:nth-child(6)').text().trim()
      },
    }]),
  })
}

function retrieveBoards (html) {
  return htmlToJson.batch(html, {
    boards: htmlToJson.createParser(['#mainSide > div.sideMenu > dl:nth-child(2) > dd', {
      id: function ($section) {
        const link = $section.children().first().attr('href')
        return link.split('/')[2]
      },
      name: function ($section) {
        return $section.children().first().text()
      },
      link: function ($section) {
        return $section.children().first().attr('href')
      },
      hasNew: function ($section) {
        return Boolean($section.find('.is_recent').length)
      }
    }]),
  })
}
