import Input from "../src/components/common/input/index";
import Button from "../src/components/common/button/index";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../src/theme/theme";
import useLogin from "../src/components/login/useLogin";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";

export default function Page() {
  const {
    email,
    handleLogin,
    invalid,
    seePassword,
    setEmail,
    toogleSeePassword,
    password,
    setPassword,
    saveData,
    setSaveData,
  } = useLogin();

  return (
    <View style={styles.container}>
      <View style={styles.containerFields}>
        <View style={styles.logoWrapper}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
        <Text style={styles.title}>Bem vindo(a) de volta</Text>
        <Input
          label="E-mail"
          onChange={setEmail}
          value={email}
          invalid={invalid.email.invalid}
          error={invalid.email.error}
          placeholder="seuemail@email.com"
        />
        <Input
          invalid={invalid.password.invalid}
          error={invalid.password.error}
          label="Senha"
          onChange={setPassword}
          value={password}
          secure={!seePassword}
          placeholder="*************"
          icon={
            <Pressable onPress={toogleSeePassword}>
              <Ionicons
                name={seePassword ? "eye" : "eye-off"}
                size={20}
                color={colors.primary}
              />
            </Pressable>
          }
        />
        <View style={styles.actions}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Checkbox
              value={saveData}
              onValueChange={setSaveData}
              color={colors.primary}
            />
            <Text style={styles.textActions}>Salvar dados</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Link href={"/forgot-password"}>
              <Text style={[styles.textActions, { color: colors.primary }]}>
                Esqueci minha senha
              </Text>
            </Link>
          </View>
        </View>
        <Button label="Login" onClick={handleLogin} style={{ marginTop: 20 }} />
        <View style={{ width: "100%" }}>
          <Text style={[styles.textActions, { textAlign: "center" }]}>
            Ainda não possui conta?{" "}
            <Link href={"/signup"} style={{ color: colors.primary }}>
              Cadastre-se
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },

  logoWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  logo: {
    width: 120,
    height: 120,
  },

  containerFields: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 24,
  },

  title: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
    color: colors.primary,
  },

  actions: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textActions: {
    fontFamily: "Inter-Regular",
    fontSize: 12.5,
    color: colors.grey,
  },
});
