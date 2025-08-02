import { useLocation } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const NoUrl = () => {
  const location = useLocation();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <DotLottieReact
      src="https://lottie.host/6c0fc0e9-3fb5-4551-9cfe-d28402bc453a/EprNU8LLT2.lottie"
      loop
      autoplay
      style={{ width: '700px', height: '300px' }}
    />
      <h1 className="text-7xl font-extrabold mb-4 text-red-200">404</h1>
      <h2 className="text-2xl font-medium text-gray-300 text-center px-4">
        The requested URL <span className="text-red-400">{location.pathname}</span> was not found on this server.
      </h2>
    </div>
  );
};

export default NoUrl;
