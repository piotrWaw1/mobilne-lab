import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { Button, Pressable, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { InferType, object, string } from "yup";
import { useState } from "react";

const schema = object({
  login: string().email().required(),
  password: string().required(),
})

type RegisterRequest = InferType<typeof schema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string>()

  const form = useForm<RegisterRequest>({
    resolver: yupResolver(schema),
    defaultValues: { login: "", password: "" },
    mode: "onTouched",
  })

  const onSubmit = async (request: RegisterRequest) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/register", request);
      setMessage(data.message)
      form.reset()
    } catch (error) {
      if(axios.isAxiosError(error)){
        setMessage(error.message)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemedSaveAreaView>
      <View className="flex justify-center" style={{ marginBottom: 10 }}>
        <ThemedText className="text-center" type="title">Register</ThemedText>
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
      <Button disabled={isLoading} onPress={form.handleSubmit(onSubmit)} title={"Register"}/>
      <Pressable className="bg-blue-300 p-2" style={{ marginTop: 10 }}>
        <Link className="text-center" href="/">Login</Link>
      </Pressable>
      {
        message && <ThemedText>{message}</ThemedText>
      }
    </ThemedSaveAreaView>
  )
}