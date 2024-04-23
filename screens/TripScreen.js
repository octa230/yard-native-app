import React, { useEffect, useState } from 'react'
import { View, FlatList} from 'react-native'
import axios from 'axios'
import { url } from '../utils'
import LoadingBox from '../components/LoadingBox'
import Trip from '../components/Trip'


const TripScreen = () => {
  const [trips, setTrips] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  

  useEffect(()=> {
    try{
      setIsLoading(true)
      const getData = async()=> {
        const {data} = await axios.get(`${url}/trips`)
        setTrips(data)
      }
      getData()
      setIsLoading(false)

    }catch(error){
      console.error(error)
    }
  }, [])

  //console.log(trips)
  return isLoading ? (<LoadingBox/>) : 
  (
        <View>
        <FlatList data={trips}
          renderItem={({item})=> <Trip trip={item}/>}
          keyExtractor={(item)=> item._id}
        />
        </View>
  )
}

export default TripScreen
