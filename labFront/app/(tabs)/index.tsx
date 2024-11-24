import { ThemedText } from "@/components/ThemedText";
import { Button, Pressable, TextInput, View } from "react-native";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { object, string, InferType } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";
import axios from "axios";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const schema = object({
  login: string().email().required(),
  password: string().required(),
})

type LoginRequest = InferType<typeof schema>;

export default function MainScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  const form = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: { login: "", password: "" },
    mode: "onTouched",
  })

  const onSubmit = async (request: LoginRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/login", request);
      console.log(data)
      if (data.access_token) {
        await AsyncStorage.setItem('@jwt_token', data.access_token);
      }
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        setMessage(error.message)
      }
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <ThemedSaveAreaView>
      <View className="flex justify-center" style={{ marginBottom: 10 }}>
        <ThemedText className="text-center" type="title">Login</ThemedText>
        <View className="flex gap-2">
          <View>
            <ThemedText type="defaultSemiBold">Login</ThemedText>
            <Controller
              name="login"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="border rounded-xl pl-2"
                  textContentType="emailAddress"
                  style={{ paddingLeft: 5, marginTop: 5 }}
                />
              )}
            />
            {form.formState.errors.login?.message && (
              <ThemedText style={{ color: "red" }}>{form.formState.errors.login?.message}</ThemedText>
            )}
          </View>
          <View>
            <ThemedText type="defaultSemiBold">Password</ThemedText>
            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="border rounded-xl"
                  textContentType="password"
                  style={{ paddingLeft: 5, marginTop: 5 }}
                />
              )}
            />
            {form.formState.errors.password?.message && (
              <ThemedText style={{ color: "red" }}>{form.formState.errors.password?.message}</ThemedText>
            )}
          </View>
        </View>
      </View>
      <Button disabled={isLoading} onPress={form.handleSubmit(onSubmit)} title={"Login"}/>
      <Pressable className="bg-blue-400 p-2" style={{ marginTop: 10 }}>
        <Link className="text-center" href="/register">Register</Link>
      </Pressable>
      <Pressable className="bg-orange-400 p-2" style={{ marginTop: 10 }}>
        <Link className="text-center" href="/profile">Profile</Link>
      </Pressable>
      <Pressable className="bg-pink-400 p-2" style={{ marginTop: 10 }}>
        <Link className="text-center" href="/add-data">Data</Link>
      </Pressable>
      {
        message && <ThemedText>{message}</ThemedText>
      }
    </ThemedSaveAreaView>
  )
}
