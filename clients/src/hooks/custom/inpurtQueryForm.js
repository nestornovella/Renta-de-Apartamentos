import { useEffect, useState } from "react";
import useAuth0GetData from "./auth0getinData";
import useWhatsapp from "./whatsappTemplate";
import useGetAlert from "./getAlert";

function useInputQuery() {
  const { controledUser } = useAuth0GetData()
  const [errors, setError] = useState({ blocked: true, });
  const [input, setInput] = useState({
    name: "",
    email: "",
    consult: "",
    startDate: "",
    endDate: "",
    id: "",
    urbanizacion: "",
    services: {transport:0}
  });
  const {alertTop, alertTopPaypal} = useGetAlert()
  //const [inputUrbanizacion, setInputUrbanizacion] = useState()
  const { isAuthenticated } = useAuth0GetData()
  function setId(id) {
    setInput(prev => {
      return { ...prev, id: id }
    });
  }

  function setUrbanizacion(urbanizacion) {
    setInput(prev =>{return { ...prev, urbanizacion: urbanizacion }});
  }

  const { link } = useWhatsapp(input, errors);

  function validate(input) {
    const error = {
      blocked: false,
    };
    function handleError(errorName, message) {
      error[errorName] = { message };
    }

    if (!input.name) handleError("name", "expected a name");
    if (!input.email) handleError("email", "expected a email");
    if (!input.startDate) handleError("startDate", "expected a start date");
    if (!input.endDate) handleError("endDate", "expected a end date");
    if (!input.consult) handleError("consult", "expected a consult");
    setError(error);
  }

  useEffect(() => {
    setInput({
      ...input,
      name: controledUser.name,
      email: controledUser.email,
    });
  }, [controledUser]);

  function handleInput(e) {
    const event = e.target;
    validate({
      ...input,
      [event.name]: event.value,
    });

    setInput(
      (prev) =>
      (prev = {
        ...input,
        [event.name]: event.value,
      })
    );
  }

  function handleTransport(e){
    const event = e.target;
    setInput(
      (prev) =>
      (prev = {
        ...input,
        [event.name]: event.checked ? {transport:45.00}:{transport:0.00},
      })
    );
  }
  function selectService(e){
    
    setInput(
      prev =>
      (prev = {
        ...input,
        services: e.target.checked ? {transport:e.target.value}:{transport:45.00},
      })
    );
  }

  function validateURL(url) {
    try {
        // Crear un objeto URL para validar
        const validatedURL = new URL(url);
        
        // Opcional: Asegurarse de que el protocolo es seguro (http o https)
        if (validatedURL.protocol === "http:" || validatedURL.protocol === "https:" && !url.includes('<')&& !url.includes('>')) {
            return url;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}
  function submitWap(status) {
    if (Object.keys(errors).length == 1 && !errors.blocked  || status == 'sale' && isAuthenticated) {
      alertTopPaypal("You will be redirected to WhatsApp.");
      const escapedHTML = validateURL(link)
      window.location.href = escapedHTML;
    } else {
       
      alertTop(isAuthenticated ? "Please fill out all required fields before submitting your query" : "First you need to log in.", 'warning', 3000);
      validate()
    }
  }

  return {
    input,
    handleInput,
    errors,
    link,
    submitWap,
    setId,
    validate,
    setUrbanizacion,
    handleTransport,
    selectService
  };
}

export default useInputQuery;
