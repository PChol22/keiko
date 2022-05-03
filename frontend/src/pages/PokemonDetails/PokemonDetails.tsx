import { Loader } from "components/Loader"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styles from "./PokemonDetails.module.css"

interface PokemonDetailsInfo {
  name: string
  id: number
  height: number
  weight: number
}

const fetchPokemondetails = async (pokemonId: number): Promise<PokemonDetailsInfo> => {
  const response = await fetch(`http://localhost:8000/pokemon/${pokemonId}`, {
    headers: { accept: "Application/json" },
  })
  const pokemonData = response.json()
  // throw "We have a problem..."
  return pokemonData
}

export const PokemonDetails = () => {
  const pokemonId = useParams().pokemonId

  const [pokemonDetails, updatePokemonDeatils] = useState<PokemonDetailsInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (pokemonId && Number.isInteger(+pokemonId)) {
      setIsLoading(true)
      fetchPokemondetails(+pokemonId)
        .then((pokemonData: PokemonDetailsInfo) => {
          updatePokemonDeatils(pokemonData)
          setTimeout(() => setIsLoading(false), 500)
        })
        .catch(error => setErrorMessage(error))
    } else {
      setErrorMessage("Wrong pokemon Id")
    }
  }, [pokemonId])

  return (
    <div className={styles.intro}>
      <Link to="/" className={styles["back-link"]}>
        <p>Go back</p>
      </Link>
      {pokemonDetails && !isLoading && !errorMessage && (
        <div className={styles["pokemon-details"]}>
          <p className={styles.title}>{pokemonDetails.name}</p>
          <div className={styles["pokemon-sprites"]}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name + " Back"}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name + " Shiny"}
            />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name + " Shiny Back"}
            />
          </div>
          <p>Height: {pokemonDetails.height} cm</p>
          <p>Weight: {pokemonDetails.weight} kg</p>
          <p>Id: {pokemonDetails.id}</p>
        </div>
      )}
      {isLoading && !errorMessage && <Loader />}
      {errorMessage && <p>Error : {errorMessage}</p>}
    </div>
  )
}
