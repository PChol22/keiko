import { Animate } from "components/Animate"

const LogoComponent = () => (
  <img
    height={40}
    src="https://fontmeme.com/permalink/190314/03655fc9c0c5ef371245622978eaa0a7.png"
    alt="pokemon-go-font"
  />
)

export const Logo = Animate("wobble")(LogoComponent)
