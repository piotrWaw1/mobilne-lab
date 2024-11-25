import { Button, Pressable, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Controller, useForm } from "react-hook-form";
import { Link } from "expo-router";
import ThemedSaveAreaView from "@/components/ThemedSaveAreaView";
import { InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { setItem } from "@/components/utils/AsyncStorage";

const schema = object({
  key: string().required(),
  text: string().required(),
})

type DataRequest = InferType<typeof schema>;

export default function AddData() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const form = useForm<DataRequest>({
    resolver: yupResolver(schema),
    defaultValues: { key: "", text: "" },
    mode: "onTouched",
  })

  const onSubmit = async (request: DataRequest) => {
    try {
      const { key, text } = request
      setIsLoading(true);
      await setItem(key, text);
      setMessage(`Item {${key}: ${text}} added successfully.`);
      form.reset()
    } catch (error) {

    } finally {
      setIsLoading(false);
    }

  }

  return (
    <ThemedSaveAreaView>
      <View className="flex justify-center" style={{ marginBottom: 10 }}>
        <ThemedText className="text-center" type="title">Add data</ThemedText>
        <View className="flex gap-2">
          <View>
            <ThemedText type="defaultSemiBold">Key</ThemedText>
            <Controller
              name="key"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="border border-white text-white rounded-xl"
                  textContentType="emailAddress"
                  style={{ paddingLeft: 5, marginTop: 5 }}
                />
              )}
            />
            {form.formState.errors.key?.message && (
              <ThemedText style={{ color: "red" }}>{form.formState.errors.key?.message}</ThemedText>
            )}
          </View>
          <View>
            <ThemedText type="defaultSemiBold">Text</ThemedText>
            <Controller
              name="text"
              control={form.control}
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="border border-white text-white rounded-xl"
                  textContentType="password"
                  style={{ paddingLeft: 5, marginTop: 5 }}
                />
              )}
            />
            {form.formState.errors.text?.message && (
              <ThemedText style={{ color: "red" }}>{form.formState.errors.text?.message}</ThemedText>
            )}
          </View>
        </View>
      </View>
      <Button disabled={isLoading} onPress={form.handleSubmit(onSubmit)} title={"Add data"}/>
      <Pressable className="bg-pink-400 p-2" style={{ marginTop: 10 }}>
        <Link className="text-center" href="/show-data">Show data</Link>
      </Pressable>

      <ThemedText>{message}</ThemedText>
    </ThemedSaveAreaView>
  )
}