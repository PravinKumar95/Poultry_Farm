import useAuth from "./hooks/useAuth";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
export default function App() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    //return <SignIn />;
  }
  return (
    <div>
      <Home />
    </div>
  );
}
