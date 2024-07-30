import { FC, useEffect, useState } from 'react'
import useAppContext from '../../context/context'
import Fine from '../Fine/Fine'
import Spinner from '../Spinner/Spinner'
import Button from '../Button/Button'

import type { Fine as FineType } from '../../core/domain/entities/Fine'

import styles from './finesList.module.sass'

const FinesList: FC = () => {
  const data = useAppContext()
  const [filteredFines, setFilterFines] = useState<FineType[]>([])

  useEffect(() => setFilterFines(data.fines), [data])

  const filterList = (e: React.MouseEvent) => {
    const { value } = e.target as HTMLButtonElement

    if (value === 'all') {
      return setFilterFines(data.fines)
    }

    const fines = data.fines.filter(fine => fine.status === value)
    setFilterFines(fines)
  }

  return (
    <section className={styles.list}>
      {data.fines.length ? (
        <>
          <section className={styles.filterPillsWrapper}>
            <Button
              text='All'
              value='all'
              shape='pill'
              type='button'
              onClick={filterList}
            />
            <Button
              text='Pending'
              value='pending'
              shape='pill'
              type='button'
              onClick={filterList}
            />
            <Button
              text='Approved'
              value='approved'
              shape='pill'
              type='button'
              onClick={filterList}
            />
            <Button
              text='Rejected'
              value='rejected'
              shape='pill'
              type='button'
              onClick={filterList}
            />
          </section>

          {filteredFines.length
            ? filteredFines
                .toReversed()
                .map((fine, index) => (
                  <Fine key={fine.initiatorId + index} fine={fine} />
                ))
            : "Ops! the're no fines to show you 😓"}
        </>
      ) : (
        <Spinner />
      )}
    </section>
  )
}

export default FinesList
