import { ThemedText } from "@/components/ThemedText";
import { Button, TextInput, View } from "react-native";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { object, string, InferType } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";

const schema = object({
  login: string().email().required(),
  password: string().required(),
})

type LoginRequest = InferType<typeof schema>;

export default function MainScreen() {
  const form = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: { login: "", password: "" },
    mode: "onTouched",
  })

  const onSubmit = (request: LoginRequest) => {
    console.log(request);
  }

  return (
    <ThemedSaveAreaView>
      <View className="flex items-center justify-center w-screen" style={{marginBottom:10}}>
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
              <ThemedText style={{color: "red"}}>{form.formState.errors.login?.message}</ThemedText>
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
              <ThemedText style={{color: "red"}}>{form.formState.errors.password?.message}</ThemedText>
            )}
          </View>
        </View>
      </View>
      <Button onPress={form.handleSubmit(onSubmit)} title={"Login"}/>
      <Link href="/profile">Profile</Link>
    </ThemedSaveAreaView>
  )
}
