/* CS465 Lab2 Javascript file */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App, Map} from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  {/* <Map /> */}
  </StrictMode>,
)