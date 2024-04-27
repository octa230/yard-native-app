import { View, Text } from 'react'
import { url } from '../utils'
import { Store } from '../Store'
import { Card } from 'react-native-paper'

export default OrderCard = (props) => {
  const {order} = props

  return <Card style={{ marginVertical: 5 }}>
      <Card.Content>
        <Text style={{ fontWeight: 'bold' }}>Order ID: {order?._id}</Text>
        <Card.Title title= {order?.processed ? 'Yes' : 'No'} />
        <Text style={{ marginTop: 10, fontWeight: 'bold' }}>Products:</Text>
        {order?.products?.map(product => (
          <View style={{flexDirection:"row"}}>
            <Image source={{uri: product && product.image}} style={{height: 100, width: 100}}/>
            <Text>{product?.name} - Quantity: {product?.quantity}, Price: {product?.ugx || product?.price}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  
}

//export default OrderCard
