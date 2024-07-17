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
import RaitingPage from './components/raiting/raintingPage';
import Properties from './components/properties/propiedades';

// Importa el componente de ubicación de manera dinámica usando React.lazy
const LocationMap = React.lazy(() => import('./components/location/location'));

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

                <Element name="apartments">
                  <div className='min-h-[1000px]'>
                    <Properties />
                  </div>
                </Element>
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
          role == 'admin' || role == 'superAdmin' || !role ?
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
        <Route path='/raiting/:id/:calification' element={<RaitingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
