import useAuth0GetData from "../../../hooks/custom/auth0getinData";
import LogoutButton from "../../Auth0Buttons/LogoutButton";
import LoginButton from "../../Auth0Buttons/LoginButton";
import useOpenClose from "../../../hooks/custom/OpenCloseMenu";
import AlertComponent from "./alertComponent";
import LogedMenu from "./logedMenu";
import { useEffect } from "react";
import RenderCard from "./renderCard";
import { useSelector } from "react-redux";
import { FaMoneyBillTrendUp } from "react-icons/fa6";


function LoginPanel() {
  const { controledUser, isAuthenticated, loginOrRegisterUser } = useAuth0GetData();
  const { openStatus, toogleOpen } = useOpenClose();
  const exchange = useSelector(store => store.user.exchange)

  useEffect(() => {
    const registerUser = () => {
      try {
        if (isAuthenticated && controledUser.email) {
          loginOrRegisterUser(controledUser);
        }
      } catch (error) {
        console.error(error);
      }
    };

    registerUser();
  }, [isAuthenticated, controledUser]);

  return (
    <div className="relative flex  items-center gap-3">
      <div className="text-center text-[18px] h-[45px] p-1 bg-white flex flex-col text-xs justify-center items-center font-quicksand text-gray-500 border border-dashed border-green-500 rounded-lg ">
        <span className="text-[10px] " >COP-USD: </span>
        <div className="flex gap-1 ">
          <FaMoneyBillTrendUp className="animate-bounce text-orange-500" />
          <span className="text-[10px]">{exchange && exchange.value}</span>
        </div>
      </div>
      <div className="flex md:px-0 text-sm">
        {isAuthenticated ? (
          <LogedMenu toogleOpen={toogleOpen} openStatus={openStatus} />
        ) : (
          <LoginButton />
        )}
      </div>
      {openStatus && (
        <div className="absolute  z-[100] right-0 top-full mt-2 bg-white shadow-lg rounded-lg ">
          {isAuthenticated ? (
            <>
              <div className=" ">
                {/* <LogoutButton
                  onClick={toogleOpen}
                  className="focus:outline-none text-red-500"
                /> */}
                <RenderCard />
              </div>
              {controledUser.email_verified ? null : (
                <AlertComponent />
              )}
            </>
          ) : null}
        </div>
      )}

    </div>
  );
}

export default LoginPanel;
