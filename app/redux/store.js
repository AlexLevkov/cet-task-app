import {configureStore} from '@reduxjs/toolkit'
import tickets from './tickets.js'

export default configureStore({
  reducer:{
    tickets
  }
})