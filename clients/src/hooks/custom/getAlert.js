import { TbCoinRupeeFilled } from 'react-icons/tb';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function useGetAlert() {
  function alertTop(message, status, ms, blocked) {
    Swal.fire({
      position: "top-end",
      icon: status == 'error' ? 'error' :  status == 'warning' ? 'warning' : 'success',
      title:status == 'error' ? 'error' : 'Ok' ,
      showConfirmButton: false,
      timer: !ms ? 1600 : ms,
      html:`
        <p style="color:gray">${message}</p>
      `,
      allowOutsideClick: true

    });
  }
  function alertTopPaypal(message, status, ms) {
    Swal.fire({
      position: "top-end",
      icon: status == 'error' ? 'error' :  status == 'warning' ? 'warning' : 'success',
      title:status == 'error' ? 'error' : 'Ok' ,
      showConfirmButton: false,
      timer: !ms ? 1600 : ms,
      html:`
        <p style="color:gray">${message}</p>
      `,
      allowOutsideClick: false
      

    });
  }
  return { alertTop,
           alertTopPaypal
   };
}

export default useGetAlert;