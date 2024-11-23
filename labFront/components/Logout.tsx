import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logout(){
  const logout = async ()=>{
    await AsyncStorage.removeItem('@jwt_token');
  }

  return(
    <Button onPress={logout} color={"red"} title={"Logout"}/>
  )
}