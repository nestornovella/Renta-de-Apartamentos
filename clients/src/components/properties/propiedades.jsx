import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  LiaStarSolid,
  LiaBedSolid,
  LiaBathSolid,
  LiaRulerCombinedSolid,
} from "react-icons/lia";
import { parseToColombianMoney, parseToDollarsMoney } from "../../utils/parseMoney";
import useCounterHouses from "../../redux/actions/counterHauses";
import { PiBuildingApartmentFill, PiBuildingApartment } from "react-icons/pi";
import useGetApartments from "../../hooks/custom/GetApartments";
import useGetAllCities from "../../hooks/custom/getAllCities";
import Transition from "../complements/transition";
import { useSelector } from "react-redux";
import LoadingApartaments from "../loadings/loadingApartments";

function Properties() {
  const { apartments, length, getApartments } = useGetApartments();
  const { counter, handleCounter } = useCounterHouses();
  const { dispatchCities } = useGetAllCities();
  const role = useSelector(store => store.user.role)
  const exchange = useSelector(store => store.user.exchange)

  // useEffect(() => {
  //   getApartments();
  // }, []);

  let delayMult = 0

  return (
    <Transition className="min-w-[400px]  px-4 mb-0 ms:mt-0 mt-[300px] md:mt-20 md:px-10 xl:px-40">
      {apartments && apartments.length ?
        <section className="grid grid-cols-2 gap-4 md:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {apartments && apartments.length &&
            apartments.map(
              (
                {
                  availability,
                  bathrooms,
                  bedrooms,
                  description,
                  urbanizacion,
                  id,
                  images,
                  lat,
                  lon,
                  name,
                  price,
                  size,
                  status,
                  rating,
                  rentalType,
                  ubication,
                  userId,
                },
                index
              ) => {
                delayMult > 7 ? delayMult = 1 : delayMult++
                return (
                  index < counter && (
                    <div key={id} className="shadow-light hover:shadow-xl font-quicksand rounded-2xl transition-all duration-300 ">
                      {role == 'admin' &&
                        <span className="mx-2 text-xs text-gray-400 ">
                          {`id: ${id}`}
                        </span>
                      }
                      <Link
                        className="cursor-pointer"
                        to={`/apartment/${id}`}
                      >
                        <AnimatedBox
                          availability={availability}
                          bathrooms={bathrooms}
                          bedrooms={bedrooms}
                          urbanizacion={urbanizacion}
                          images={images}
                          price={price}
                          size={size}
                          status={status}
                          ubication={ubication}
                          id={id}
                          role={role}
                          delay={delayMult * 0}
                          exchange={exchange}
                          rentalType={rentalType}
                          rating={rating}
                        />
                      </Link>
                    </div>
                  )
                );
              }
            )}
        </section>
        : <LoadingApartaments />
      }
      {counter < length && (
        <div className="text-center my-7 rounded-3xl">
          <button
            onClick={handleCounter}
            className="mx-auto flex items-center justify-center gap-2 xl:mt-20 mt-5 text-xl bg-secondary rounded-xl px-3 py-3 font-quicksand text-white hover:bg-black"
          >
            See more
            <PiBuildingApartmentFill className="text-[30px]" />
          </button>
        </div>
      )}
    </Transition>
  );
}

const AnimatedBox = ({
  availability,
  bathrooms,
  bedrooms,
  urbanizacion,
  images,
  price,
  size,
  status,
  ubication,
  id,
  delay,
  role,
  exchange,
  rentalType,
  rating
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <div className="relative">
        <div className="absolute text-secondary flex items-center px-2 rounded-lg bg-slate-50 top-2 right-2">
          <LiaStarSolid className="text-yellow-400" />
          <span className="text-sm ml-1 font-semibold py-1">{rating.media}</span>
        </div>
        <img
          src={images && images[0]}
          alt="furnished, amoblados, apartments, apartamentos, alquiler, rent"
          className="object-cover w-full max-h-full h-[280px] rounded-t-2xl"
        />
        <div className="px-3 py-5">
          <p className="text-secondary">{ubication}</p>
          <div className="">
            <div className="flex gap-2">
              <span className="text-[15px] block h-[20px] text-gray-400 text-xs md:text-sm font-semibold mb-2">
                {urbanizacion}
              </span>
              <PiBuildingApartment className="text-orange-500 text-[20px] " />
            </div>
            <div className="flex gap-2">
              <img className="size-[20px] rounded-[50%]" src="https://icons.iconarchive.com/icons/wikipedia/flags/512/CO-Colombia-Flag-icon.png" alt="" />
              <p className="font-bold text-sm ">{parseToColombianMoney(price).slice(1)}</p>
            </div>
            <div className="flex gap-3">
              <img className="size-[20px] rounded-[50%]" src="https://imgs.search.brave.com/IJw-vNjpU-9a8pN4NO2vNJvBuL1fL9bdVhmTVc-woXg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvNTU1LzU1NTUy/Ni5wbmc" alt="" />
              <p className="font-bold text-sm "> {exchange.value && parseToDollarsMoney((price / exchange.value).toFixed(2)).slice(1)}</p>
            </div>
            <div className="gap-1 md:gap-4 xl:gap-2 mt-2 flex flex-wrap flex-col md:flex-row">
              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                <LiaBedSolid />
                <span className="ml-2 text-xs">{bedrooms}</span>
              </div>
              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                <LiaBathSolid />
                <span className="ml-2 text-xs">{bathrooms}</span>
              </div>
              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-slate-300/30">
                <LiaRulerCombinedSolid />
                <span className="ml-2 text-xs">{size}</span>
              </div>
              <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-black">
                <span className="text-xs font-bold text-white">
                  {status && status.includes("sale") ? "Buy" : status}
                </span>
              </div>
              <div className="absolute top-0 left-[10px]">
                {availability === true ? (
                  <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-green-500">
                    <span className="text-[10px] font-bold text-white">
                      Available
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg bg-yellow-400">
                    <span className="text-[10px] font-bold text-black">
                      Not Available
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute top-6 left-[10px]">
                <div className="flex items-center justify-center px-2 my-2 py-1 rounded-lg  text-black bg-gray-200 backdrop-blur-2xl">
                  {
                    status && !status.includes('sale') ?
                      <span className="text-[10px] font-bold">
                        {rentalType[0].toUpperCase() + rentalType.slice(1).toLowerCase()}
                      </span>
                      :
                      <span className="text-[10px] font-bold">
                        {status[0].toUpperCase() + status.slice(1).toLowerCase()}
                      </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Properties;
