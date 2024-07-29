import { FC } from 'react'
import useAppContext from '../../context/context'
import Fine from '../Fine/Fine'
import Spinner from '../Spinner/Spinner'

import styles from './finesList.module.sass'

const FinesList: FC = () => {
  const data = useAppContext()

  return (
    <section className={styles.list}>
      {data.fines.length ? (
        data.fines.map((fine, index) => (
          <Fine key={fine.initiatorId + index} fine={fine} />
        ))
      ) : (
        <Spinner />
      )}
    </section>
  )
}

export default FinesList
