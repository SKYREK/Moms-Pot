import React from 'react'
import PopularItems from '../components/popularItems'
import Slider from '../components/popularItems/Slider'
import MaterialList from '../components/popularItems/MaterialList'

const Home = () => {
  return (
    <div className='bg-red-400'>
          <Slider/>
         <PopularItems/>  
         <MaterialList/>      
    </div>
  )
}

export default Home