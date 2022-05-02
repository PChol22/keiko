import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Root } from "./components/Root"

import { Home } from "./pages/Home"

export const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Root>
  )
}
