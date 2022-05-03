import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
import { Loader } from "components/Loader"
import React from "react"
import { Link } from "react-router-dom"

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
  // throw "We have a problem..."
  return response.json()
}

export const Home = () => {
  // const [filterValue, setFilterValue] = React.useState("")
  const [pokemons, setPokemonsList] = React.useState<PokemonInfo[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  /*
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }
  */

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const pokemonList = await fetchPokemons()
        setPokemonsList(pokemonList)
        setIsLoading(false)
      } catch {
        setErrorMessage("Error while fetching pokemons")
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.intro}>
      <p className={styles.title}>Pokedex !</p>
      {/*<input className={styles.input} onChange={onInputChange} value={filterValue}></input>*/}
      {!isLoading && errorMessage === null && (
        <div className={styles["pokemon-list"]}>
          {
            /*filterPokemonsByName(pokemons, filterValue).map(({ name, id, height, weight }) => (
          <Pokemon name={name} id={id} height={height} weight={weight} key={id} />
        ))*/
            pokemons.map(({ name, id, height, weight }) => (
              <Link to={`/pokemon/${id}`} key={id} className={styles["pokemon-details-link"]}>
                <Pokemon name={name} id={id} height={height} weight={weight} />
              </Link>
            ))
          }
        </div>
      )}
      {isLoading && errorMessage === null && <Loader />}
      {errorMessage !== null && <p>Error : {errorMessage}</p>}
    </div>
  )
}
