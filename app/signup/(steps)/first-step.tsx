import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import { styles } from "../../../src/styles/form";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.containerFields}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <View style={{ gap: 8 }}>
          <Text style={styles.title}>Seja bem vindo(a)!</Text>
          <Text style={styles.subtitle}>
            Faça seu cadastro e começe a utilizar nosso aplicativo
          </Text>
        </View>
        {/* <Input
          label="Nome"
          inputProps={{
            autoCapitalize: "words",
            textContentType: "name",
          }}
          placeholder="Seu Nome"
        />
        <Button label="Avançar" disabled style={{ marginTop: 20 }} /> */}
        <View style={{ width: "100%" }}>
          <Text style={[styles.textActions, { textAlign: "center" }]}>
            Já possui uma conta? <Link href={"/login"}>Faça login</Link>
          </Text>
        </View>
      </View>
    </View>
  );
}
