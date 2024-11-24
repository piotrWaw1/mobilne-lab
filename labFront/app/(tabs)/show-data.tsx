import { useEffect, useState } from "react";
import { getAllItems } from "@/components/utils/AsyncStorage";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { View } from "react-native";

export default function ShowData() {
  const [data, setData] = useState({});
  useEffect(() => {
    const d = async () => {
      // const keys = await AsyncStorage.getAllKeys()
      // const items = await AsyncStorage.multiGet(keys);
      const items = await getAllItems()
      setData(items)
      console.log(items)
    }

    d().then()
  }, [])
  return (
    <ThemedSaveAreaView className="px-2">
      <ThemedText>Data show</ThemedText>
      <View className="flex gap-2 border p-2">
      {Object.entries(data).map(([key, value]) => (
        <ThemedText key={key}>{key}: {value}</ThemedText>
      ))}
      </View>
    </ThemedSaveAreaView>

  )
}