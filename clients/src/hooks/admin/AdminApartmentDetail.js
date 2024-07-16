import { useState } from "react";
import { parseInput } from "../../utils/parseInput";
import useGetAlert from "../custom/getAlert";

function useAdeminApartDetail() {
  const [detail, setDetail] = useState(null);
  const {alertTop} = useGetAlert()

  const VITE_API_USER_APARTMENT = import.meta.env.VITE_API_USER_APARTMENT
  function getDetail(id) {
    fetch(`${VITE_API_USER_APARTMENT}${id}`)
      .then((response) => response.json())
      .then((data) => setDetail(data.data));
  }

  function deleteApartment(id) {
    fetch(`${VITE_API_USER_APARTMENT}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => response.status < 300 && alertTop("apartamento eliminado")
      )
      .catch((error) => alertTop('no se pudo eliminar el partamento', 'error'));
  }

  function updateApartment(input, id) {
    const parsedInput = parseInput(input);
    fetch(`${VITE_API_USER_APARTMENT}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedInput),
    })
      .then((response) => response.json())
      .then(
        (response) =>
          response.status < 300 && alertTop("apartamento actualizado con exito")
      )
      .catch(() => alertTop("no se pudo actualizar el apartamento", 'error'));
  }

  function resetDetail() {
    setDetail(null);
  }

  return {
    detail,
    resetDetail,
    getDetail,
    updateApartment,
    deleteApartment,
  };
}

export default useAdeminApartDetail;
