import * as Superwall from "expo-superwall"
import { useEffect } from "react"
import { Button, Text, View } from "react-native"

import { Link } from "expo-router"

export default function App() {
  useEffect(() => {}, [])

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Superwall Expo Example XD</Text>
      <Text>Api Key: {Superwall.getApiKey()}</Text>
      <Button
        title="Configure"
        onPress={async () => {
          console.log("Configuring Superwall")
          await Superwall.configure("pk_25605698906751f5383385f9976e21f840d44aa11cd4639c")

          console.log("Superwall configured")
        }}
      />

      <Button
        title="Get Configuration Status"
        onPress={async () => {
          console.log(await Superwall.getConfigurationStatus())
        }}
      />

      <Button
        title="Register"
        onPress={async () => {
          const test = await Superwall.registerPlacement("fishing")
          console.log(test)
        }}
      />
      <Link href="/compat">Compat</Link>
    </View>
  )
}
