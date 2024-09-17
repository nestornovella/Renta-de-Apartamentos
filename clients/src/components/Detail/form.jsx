import { useEffect } from "react";
import useAuth0GetData from "../../hooks/custom/auth0getinData";
import useInputQuery from "../../hooks/custom/inpurtQueryForm";
import AlertComponent from "../admin/createApartment/formComponents/alertComponent";
import RentComponent from "./rent/rentComponent";
import { GiArchiveRegister } from "react-icons/gi";
import useGenerateRent from "../../hooks/custom/rentHook";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaCalendarCheck, FaCalendarXmark, FaCarSide } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
import ServicePanel from "./transport-services/transportPanel";
import useGetAlert from "../../hooks/custom/getAlert";

const url =
  "data:image/jpeg;base64,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";

function Form({ apartmentId, availability, urbanizacion, status, rentalType }) {

  const { controledUser, isAuthenticated, role } = useAuth0GetData()
  const { handleInput, input, errors, link, submitWap, setId, validate, setUrbanizacion, handleTransport, selectService } = useInputQuery(apartmentId)
  const { generateRent, setInputRent, payment } = useGenerateRent(input, errors, validate)
  const {alertTop, alertTopPaypal} = useGetAlert()

  useEffect(() => {
    setId(apartmentId)
    setUrbanizacion(urbanizacion)
  }, [apartmentId])

  

  
  function handleQuery(){
    submitWap(status)
    alertTopPaypal('you will be redirected to whatsapp platform', null, 10000 )
  }
  function checkAvailability() {
    if (availability) {
      generateRent(rentalType)
      .then(()=> alertTop('The rent will be evaluated, check your email for confirmation.', null, 3000))
      .catch(() =>alertTop('', 'error' ) )
    } else {
      alertTop('The apartment is rented, get in touch using the inquiry form to find out availability', 'warning',3000)
    }
  }

  function transportHandler(){
  
  }

  function reserveRent() {
    if (availability) {
      payment(rentalType)
      alertTopPaypal('You will be redirected to the PayPal platform.','warning', 10000)

    } else {
      alertTop('The apartment is rented, get in touch using the inquiry form to find out availability', 'warning', 3000)
    }
  }

  return (
    <div className="px-3 font-quicksand ">
      <div className="py-4 px-3 rounded-lg shadow-light">
        <div className="flex gap-4">
          <img
            width={50}
            height={50}
            src={url}
            alt={""}
            className="border-spacing-1 border-[1px] rounded-full border-slate-400 border-solid"
          />
          <div>
            <p>Commercial Advisor</p>
            <p className="text-secondary font-semibold ">Viviana</p>
          </div>
        </div>
        {
          status && !status.includes('sale') &&
          <div>
            <span className=" text-center text-sm w-full block p-1 rounded-t-lg  bg-secondary text-white mt-10 ">
              Select date
            </span>
            <div className="mb-3 flex flex-col  gap-2 border p-2 rounded-b-lg shadow-2xl">
              <div className="flex gap-2 ">
                <GiArchiveRegister className="size-5 text-blue-400" />
                <p className="text-xs text-gray-400">
                  select the start and the end date to the rent
                </p>
              </div>

              {/* componete de fecha */}
              <RentComponent handleInput={handleInput} input={input} apartmentId={apartmentId} />
              <div className="flex flex-wrap gap-2">
                {errors.startDate && <AlertComponent errors={errors} property={'startDate'} />}
                {errors.endDate && <AlertComponent errors={errors} property={'endDate'} />}
              </div>
            </div>
          </div>
        }

        <div className="my-5">
          {/* Name Section */}
          <div className="mt-2">
            <label htmlFor="" className="text-xs font-semibold text-secondary">
              Name
            </label>
            <div className="mt-2">
              <div className="border p-2 rounded-lg">
                <p className="text-[12px] text-gray-400">{controledUser.name || 'you need to log in to consult'}</p>
              </div>
            </div>
            {errors.name && <AlertComponent errors={errors} property={'name'} />}
          </div>
          {/* Email Section */}
          <div className="mt-2">
            <label htmlFor="" className="text-xs font-semibold text-secondary">
              Email
            </label>
            <div className="mt-2">
              <div className="border p-2 rounded-lg">
                <p className="text-[12px] text-gray-400">{controledUser.email || 'login is necesary to send a consult'}</p>
              </div>
            </div>
            {errors.email && <AlertComponent errors={errors} property={'email'} />}
          </div>
          {/* Consult Section */}
          <div className="mt-2">
            <label htmlFor="" className="text-xs text-secondary font-semibold">
              Consult
            </label>
            <div className="mt-2">
              <textarea
                onChange={handleInput}
                rows={5}
                name="consult"
                placeholder="tell us your query..."
                className="p-2 w-full rounded-md border-0 py-1.5 shadow-light ring-1 ring-inset shadow-gray placeholder:text-gray-400 focus:ring-0 focus:ring-inset text-[12px]"
              />
            </div>
            {errors.consult && <AlertComponent errors={errors} property={'consult'} />}
          </div>
          {/* Buttons Section */}
          <div className="flex justify-around items-center">
            <div onClick={() => handleQuery()} className="flex gap-2 items-center hover:bg-black hover:text-green-500  bg-secondary cursor-pointer transition-all delay-200 py-2 px-3 hover:black text-white rounded-xl mt-2">
              <span className="text-white font-semibold text-[15px]">Query</span>
              <FaFacebookMessenger />
            </div>
            {
              status && status.includes('rent') &&
              <div onClick={checkAvailability} className={`flex text-white gap-2 font-semibold cursor-pointer ${availability ? 'hover:text-green-500' : 'hover:text-red-500'} transition-all delay-200 hover:bg-black  bg-secondary py-2 px-3 hover:black rounded-xl mt-2`}>
                {availability ? <span className="text-[15px] text-white text-semibold ">Rent</span> : <span className="text-[15px] text-white text-semibold ">Not Availability</span>}
                {availability ? <FaCalendarCheck className="hover:text-green-500" /> : <FaCalendarXmark />}
              </div>
            }

          </div>
          { status && !status.includes('sale') && 
          <>  
            <ServicePanel handler={handleTransport} selectService={selectService}/>
          </>}

          {
            status && status.includes('rent') &&
            <div className="shadow-2xl border rounded-lg my-2 p-2">
              <p className="text-xs text-gray-400 mt-2">Do you want to reserve an apartment now?</p>
               <div onClick={reserveRent} className={`relative flex text-white gap-2 font-semibold cursor-pointer ${availability ? 'hover:text-blue-500' : 'hover:text-red-500'} transition-all delay-200 hover:bg-black  bg-blue-500 py-2 px-3 hover:black rounded-xl mt-2`}>
                {availability ? <span className="text-[15px] text-white text-semibold ">Reserve with PayPal</span> : <span className="text-[15px] text-white text-semibold ">Not Availability</span>}
                {availability ? <SlPaypal className="hover:text-blue-500  border rounded-full text-[25px] p-1 absolute right-[20%] top-[calc(50%-12.5px)]" /> : <FaCalendarXmark />}
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  );
}

export default Form;
