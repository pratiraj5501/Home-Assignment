import React from 'react'
import InputForm from '../components/InputForm'
import LinkTable from '../components/LinkTable'
import { useState } from 'react'

const Home = () => {
  const [fetchAgain,setFetchAgain]=useState(false)

  return (
  <div>
  <InputForm setFetchAgain={setFetchAgain} />

  <div className="w-full h-full">
    <LinkTable fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </div>
</div>

  )
}

export default Home
