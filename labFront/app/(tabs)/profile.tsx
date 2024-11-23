import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Logout from "@/components/Logout";

export default function Profile() {
  const [data, setData] = useState<string>()
  useEffect(() => {
    const getInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('@jwt_token');
        const { data } = await axios.get("/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        setData(data.logged_in_as)
      } catch (error) {
        setData("Error")
      }
    }
    getInfo().then();
  }, [])

  return (
    <ThemedSaveAreaView>
      <ThemedText type="title">Profile</ThemedText>
      {data && <ThemedText>Logged as: {data}</ThemedText>}
      <Logout/>
    </ThemedSaveAreaView>
  )
}