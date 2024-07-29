import { FC } from 'react'
import useAppContext from '../../context/context'
import Fine from '../Fine/Fine'

import styles from './FinesList.module.sass'

const FinesList: FC = () => {
  const data = useAppContext()

  return (
    <section className={styles.list}>
      {data.fines.map((fine, index) => (
        <Fine key={fine.initiatorId + index} fine={fine} />
      ))}
    </section>
  )
}

export default FinesList
