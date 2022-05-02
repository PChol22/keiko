import React from "react"
import { render } from "react-dom"
import { App } from "./App"

import "./reset.css"
import "./index.css"

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
)
