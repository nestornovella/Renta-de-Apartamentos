import React, { useState, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Element } from 'react-scroll'; // Importa Element desde react-scroll
import Header from './components/header/header';
import Banner from './components/banner/banner';
//import Properties from './components/properties/propiedades';
import Services from './components/services/services';
import About from './components/about/About';
import TransitionPage from './components/transitionPage/transitionPage';
import Complementary from './components/complementario/complementarySection';
import Footer from './components/footer/footer';
import CardDetail from './components/Detail/Detail';
import AdminPanel from './components/admin/adminPanel';
import { useDispatch, useSelector } from 'react-redux';
import UnautorizedAdmin from './components/admin/unautorizedAdmin';
import useGetApartments from './hooks/custom/GetApartments';
import useInitialCharge from './hooks/custom/initialCharge';
import { getAllCties, getApatments } from './redux/actions/apartmentActions'
import { delayAction } from './utils/setTime';
import LoadingApartaments from './components/loadings/loadingApartments';

// Importa el componente de ubicación de manera dinámica usando React.lazy
const LocationMap = React.lazy(() => import('./components/location/location'));
const Properties = React.lazy(() => import('./components/properties/propiedades'))
function App() {
  const role = useSelector(store => store.user.role)
  const dispatch = useDispatch()
  const [chargeFail, setChargeFail] = useState(false)
  const { firstChanrge } = useInitialCharge()
  const apartments = useSelector((store) => store.apartment.apartments)

  function reset() {
    console.log('fallo carga inicial')
    console.log(apartments)
    setChargeFail(prev => !prev)
  }

  useEffect(() => {
      firstChanrge()
  }, [chargeFail])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Element name="home">
              <>
                <TransitionPage />
                <Header />
                <Banner />
                <Suspense >
                  <Element name="apartments">
                    <Properties />
                  </Element>
                </Suspense>

                <Element name="services">
                  <Services />
                </Element>
                <Suspense fallback={<div>Loading...</div>}>
                  <Element name="location">
                    <LocationMap />
                  </Element>
                </Suspense>
                <Element name="about">
                  <About />
                </Element>
                <Complementary />
                <Footer />
              </>
            </Element>
          }
        />
        <Route path="/apartment/:id" element={<CardDetail />} />

        <Route path='/admin' element={
          role == 'admin' || role == 'superAdmin' ?
            <>
              <TransitionPage />
              <Header main={false} />
              <AdminPanel />
            </> :
            <>
              <TransitionPage />
              <Header main={false} />
              <UnautorizedAdmin />
            </>
          // <>

          //   <TransitionPage />
          //   <Header main={false} />
          //   <AdminPanel />
          // </>
        } />
      </Routes>
    </>
  );
}

export default App;
