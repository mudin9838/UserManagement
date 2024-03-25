import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const showToast = (type, msg) => {
    return toast[type](msg, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
    });
}

export default showToast;