import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
import React from "react"

interface PokemonInfo {
  name: string
  id: number
  height: number
  weight: number
}

/*
const filterPokemonsByName = (pokemons: PokemonInfo[], filterValue: string): PokemonInfo[] => {
  return pokemons.filter(pokemon => pokemon.name.includes(filterValue))
}
*/

const fetchPokemons = async (): Promise<PokemonInfo[]> => {
  const response = await fetch("http://localhost:8000/pokemons", { headers: { accept: "Application/json" } })
  return response.json()
}

export const Home = () => {
  //const [filterValue, setFilterValue] = React.useState("")
  const [pokemons, updatePokemonsList] = React.useState<PokemonInfo[]>([])

  /*
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }
  */

  React.useEffect(() => {
    fetchPokemons().then((pokemons: PokemonInfo[]) => updatePokemonsList(pokemons))
  }, [])

  return (
    <div className={styles.intro}>
      <p className={styles.title}>Pokedex !</p>
      {/*<input className={styles.input} onChange={onInputChange} value={filterValue}></input>*/}
      <div className={styles["pokemon-list"]}>
        {
          /*filterPokemonsByName(pokemons, filterValue).map(({ name, id, height, weight }) => (
          <Pokemon name={name} id={id} height={height} weight={weight} key={id} />
        ))*/
          pokemons.map(({ name, id, height, weight }) => (
            <Pokemon name={name} id={id} height={height} weight={weight} key={id} />
          ))
        }
      </div>
    </div>
  )
}
