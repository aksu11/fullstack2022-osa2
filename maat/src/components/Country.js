import React from 'react'

const Country = ({country}) => {

  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h2>Languages:</h2>
      <ul>
        {languages.map(lang => <li key={lang}>{lang} </li>)}
      </ul>
      <img src={country.flags.png} alt='flag'/>
    </div>
  )
}

export default Country