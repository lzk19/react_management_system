// 引入createStore，专门用于创建redux中最为核心的store对象
// createStore已经被启用，名字改为legacy_createStore
import {legacy_createStore as createStore,applyMiddleware} from 'redux'
// 引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
// 引入用于汇总的reducer
import combineReducers from './reducers/index'

// 暴露store
export default createStore(combineReducers,applyMiddleware(thunk))