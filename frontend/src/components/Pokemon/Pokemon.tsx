import styles from "./Pokemon.module.css"

interface Props {
  name: string
  id: number
  height: number
  weight: number
}

export const Pokemon = ({ name, id, weight, height }: Props) => {
  return (
    <div className={styles.pokemon}>
      <p>{name}</p>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt="Carapuce" />
      <p>Id: {id}</p>
      <p>Weight: {weight} kg</p>
      <p>Height: {height} cm</p>
    </div>
  )
}
