import { useAuth0 } from "@auth0/auth0-react";
import { LuLogIn } from "react-icons/lu";

function LoginButton() {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className="relative z-[110] px-3 py-2 bg-black rounded-lg hover:bg-orange-600 text-slate-100 flex justify-center items-center"
      onClick={() => loginWithPopup()}
    >
      Log In <LuLogIn className="ml-1 " />
    </button>
  );
}

export default LoginButton;
