import { useState } from "react"
import styles from "./Animate.module.css"

export const Animate = <P extends object>(BaseComponent: React.ComponentType<P>) => {
  const animatedComponent = (props: P) => {
    const WithStateComponent = () => {
      const [className, setClassName] = useState("")

      const addAnimation = () => {
        setClassName(styles.tadaAnimation)
      }

      const removeAnimation = () => {
        setClassName("")
      }

      return (
        <div className={className} onMouseEnter={addAnimation} onMouseLeave={removeAnimation}>
          {<BaseComponent {...props} />}
        </div>
      )
    }
    return <WithStateComponent />
  }
  animatedComponent.displayName = `Animated ${BaseComponent.displayName}`
  return animatedComponent
}
