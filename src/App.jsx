import AppRouter from "./Routers/AppRouters";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div >
    <ToastContainer />
     <AppRouter />
    </div>
  );
}

export default App;
