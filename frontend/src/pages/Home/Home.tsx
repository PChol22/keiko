import styles from "./Home.module.css"

export const Home = () => {
  return (
    <div className={styles.intro}>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Carapuce" />
      <p>Carapuce</p>
      <p>Numéro 7</p>
    </div>
  )
}
