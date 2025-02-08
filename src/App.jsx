import AppRouter from "./Routers/AppRouters";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoomProvider from "../src/context/RoomContext";

function App() {
  return (
    <div >
      <RoomProvider>
      <ToastContainer />
      <AppRouter />
      </RoomProvider>
   
    </div>
  );
}

export default App;
