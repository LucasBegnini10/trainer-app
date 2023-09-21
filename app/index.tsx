import StartPage from "./(start)/start";

export default function IndexPage() {
  const isLogged = false;

  return isLogged ? <StartPage /> : <StartPage />;
}
