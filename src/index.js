import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'

import './index.css'
import App from './components/app'
import TitleBar from './components/title_bar'
import PostsIndex from './components/posts_index'
import PostsShow from './components/posts_show'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <TitleBar />
        <Switch>
          <Route path="/boards/:id/posts/:postId" component={PostsShow} />
          <Route path="/boards/:id" component={PostsIndex} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root')
)
