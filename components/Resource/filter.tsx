import React, { useState } from 'react'

type FilterProps = {
  sports: string[]
  onSelectSport: (selectedSport: string) => void
}

const SportFilter = ({ sports, onSelectSport }: FilterProps) => {
  const [selectedSport, setSelectedSport] = useState('')

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(event.target.value)
    onSelectSport(event.target.value)
  }

  return (
    <div>
      <label htmlFor="sportFilter">Filtrar por Esporte:</label>
      <select
        id="sportFilter"
        onChange={handleSportChange}
        value={selectedSport}
      >
        <option value="">Todos</option>
        {sports.map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SportFilter
