import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './componnent/login.css'
import {createStore} from "redux";
import { BrowserRouter } from 'react-router-dom'
//import productReducer from './redux/store/reducers/packeges.js'
import packageReducer from './redux/store/reducers/packeges.js'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
// const myStore= createStore(productReducer);
import {store} from '../src/store/store.js'
createRoot(document.getElementById('root')).render(
    <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </StrictMode>,
)
