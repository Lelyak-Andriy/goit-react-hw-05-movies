import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function toastError() {
  return toast.error(
    `No movies found! Please change your request and try again!`,
    {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    },
  );
}
