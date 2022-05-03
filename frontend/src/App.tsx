import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Root } from "./components/Root"

import { Home } from "./pages/Home"
import { PokemonDetails } from "pages/PokemonDetails"

export const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/pokedex/0"></Navigate>} />
          <Route path="/pokedex/:pageNumber" element={<Home />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </Root>
  )
}
