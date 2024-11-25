import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Screen"
        onPress={() => navigation.navigate("Screen")}
      />
    </View>
  )
}

const styles = StyleSheet.create({})