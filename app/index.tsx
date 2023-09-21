import StartPage from "./start";

export default function IndexPage() {
  const isLogged = false;

  return isLogged ? <StartPage /> : <StartPage />;
}
