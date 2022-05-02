import { Logo } from "../Logo"
import styles from "./Root.module.css"

interface RootProps {
  children: React.ReactNode
}

export const Root = ({ children }: RootProps) => (
  <div className={styles.container}>
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Logo />
      </div>
    </div>
    {children}
  </div>
)
