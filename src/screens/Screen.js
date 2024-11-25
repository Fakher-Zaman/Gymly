import { View, Text, Button } from 'react-native'
import React from 'react'

const Screen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Screen</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  )
}

export default Screen