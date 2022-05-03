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

const BASE_IMAGE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"

const fetchPokemondetails = async (pokemonId: number): Promise<PokemonDetailsInfo> => {
  const response = await fetch(`http://localhost:8000/pokemon/${pokemonId}`, {
    headers: { accept: "Application/json" },
  })
  const pokemonData = response.json()
  // throw { test: "We have a problem..." }
  return pokemonData
}

export const PokemonDetails = () => {
  const pokemonId = useParams().pokemonId

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonId && Number.isInteger(+pokemonId)) {
        setIsLoading(true)
        try {
          const pokemonData = await fetchPokemondetails(+pokemonId)
          setPokemonDetails(pokemonData)
          setIsLoading(false)
        } catch {
          setErrorMessage("Error while fetching pokemon")
        }
      } else {
        setErrorMessage("Bad pokemon id")
      }
    }
    fetchData()
  }, [pokemonId])

  return (
    <div className={styles.intro}>
      <Link to="/" className={styles["back-link"]}>
        <p>Go back</p>
      </Link>
      {pokemonDetails && !isLoading && errorMessage === null && (
        <div className={styles["pokemon-details"]}>
          <p className={styles.title}>{pokemonDetails.name}</p>
          <div className={styles["pokemon-sprites"]}>
            <img src={`${BASE_IMAGE_URL}/${pokemonDetails.id}.png`} alt={pokemonDetails.name} />
            <img src={`${BASE_IMAGE_URL}/back/${pokemonDetails.id}.png`} alt={pokemonDetails.name + " Back"} />
            <img src={`${BASE_IMAGE_URL}/shiny/${pokemonDetails.id}.png`} alt={pokemonDetails.name + " Shiny"} />
            <img
              src={`${BASE_IMAGE_URL}/back/shiny/${pokemonDetails.id}.png`}
              alt={pokemonDetails.name + " Shiny Back"}
            />
          </div>
          <p>Height: {pokemonDetails.height} cm</p>
          <p>Weight: {pokemonDetails.weight} kg</p>
          <p>Id: {pokemonDetails.id}</p>
        </div>
      )}
      {isLoading && errorMessage === null && <Loader />}
      {errorMessage !== null && <p>Error : {errorMessage}</p>}
    </div>
  )
}
