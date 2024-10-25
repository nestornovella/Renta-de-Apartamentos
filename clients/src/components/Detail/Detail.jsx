import { useParams } from "react-router-dom";
import useGetAnApartment from "../../hooks/custom/getAnApartment";
import { useEffect, useState } from "react";
import Transition from "../complements/transition";
import TransitionPage from "../transitionPage/transitionPage";
import Header from "../header/header";
import Property from "./property";
import Footer from "../footer/footer";
import { scrollTop } from "../../utils/scrollTop";
import { useSelector } from "react-redux";

function CardDetail() {
  const { id } = useParams();
  const { getApartment } = useGetAnApartment();
  const [apartment, setApartment] = useState(null)
  const globalAparts = useSelector(store => store.apartment.apartments)



  useEffect(() => {
    scrollTop()
    const apart = globalAparts.find(ap => ap.id.includes(id))
    if (apart) {
      setApartment(apart)
    } else {
      setTimeout(() => {
        getApartment(id)
          .then(response =>  setApartment(response))
      }, 800)

    }
  }, [])

  return (
    <>
      <TransitionPage />
      <Header main={false} />
      <Transition>
        {
          apartment &&
          <Property apartment={apartment} />
        }
        <Footer />
      </Transition>
    </>
  );
}

export default CardDetail;
