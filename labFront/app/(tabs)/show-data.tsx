import { useEffect, useState } from "react";
import { getAllItems } from "@/components/utils/AsyncStorage";
import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { Pressable, View } from "react-native";

export default function ShowData() {
  const [data, setData] = useState({});

  const init = async () => {
    const items = await getAllItems()
    setData(items)
    console.log(items)
  }

  useEffect(() => {
    init().then()
  }, [])

  const deleteItem = async (itemKey: string) => {
    try {
      await AsyncStorage.removeItem(itemKey);
      init().then()
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  return (
    <ThemedSaveAreaView className="px-2">
      <ThemedText>Data show</ThemedText>
      <View className="flex gap-2 border p-2">
        {Object.entries(data).map(([key, value]) => (
          <View key={key}>
            <ThemedText>{key}: {value}</ThemedText>
            <Pressable onPress={() => deleteItem(key)} className="p-2 bg-red-500">
              <ThemedText className="font-bold text-center" style={{ color: "white" }}>Delete</ThemedText>
            </Pressable>
          </View>

        ))}
      </View>
    </ThemedSaveAreaView>

  )
}