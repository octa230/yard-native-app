import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { View, ScrollView, Text } from 'react-native'

const CategoriesBar = ({categories, navigation}) => {

    const [subcategories, setSubcategories] = useState([])
    const [selectedCategory, setselectedCategory] = useState('')

    const showSubcategories = (category)=> {
        if(category){
          setselectedCategory(category._id)
          setSubcategories(category.subcategories || [])
        }
    }
  return (
<View style={{backgroundColor:"white"}}>
    <ScrollView horizontal style={{ padding: 5, backgroundColor: "white" }}>
        {categories.map((category) => (
            <Button onPress={() => showSubcategories(category)} key={category._id} mode='elevated' 
                style={{ marginHorizontal: 3, backgroundColor:"#f0f0f0"}}
                elevation={0}
            >
                <Text style={{fontWeight: 700, fontSize: 18, color:"#004d25"}}>{category.name}</Text>
            </Button>
        ))}
    </ScrollView>
    <ScrollView horizontal style={{ padding: 6}}>
        {subcategories.map((item, index) => (
            <Button key={index} textColor='#004d25' onPress={() => {
                navigation.navigate('Filter', {
                    //category: selectedCategory._id,
                    subcategory: item
                });
            }}>
            <Text style={{fontSize: 15, fontWeight: 500}}>{item}</Text>
            </Button>
        ))}
    </ScrollView>
</View>
  )
}

export default CategoriesBar
