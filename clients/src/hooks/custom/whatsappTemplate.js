import { useEffect, useState } from "react";

function formatDate(date) {
    // Obtener día, mes y año
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

export function useWhatsapp(input) {
    console.log("🚀 ~ useWhatsapp ~ input:", input)
    const [link, setLink] = useState(null)



    useEffect(()=>{

        let template = `::::::RENT-APARTMENTS-MEDELLIN::::::%0A`;
        template += `name: ${input.name}%0A`
        template += `email: ${input.email}%0A`
        template += `apartment id: ${input.id}%0A`
        template += `start date: ${input.formatDate && formatDate(input.startDate)}   end date: ${input.formatDate && formatDate(input.endDate)}%0A`
        template += `----------------------%0A`
        template += `consult:%0A ${input.consult}%0A`
        template += `----------------------%0A`
        setLink(`https://api.whatsapp.com/send?phone=+541125063297&text=${template}`)
    }, [input])


    return {
        link
    }
    
}

export default useWhatsapp;