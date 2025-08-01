
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loading = () => {
  return (
    <div className="relative top-0 left-0 flex flex-col w-screen h-screen items-center justify-center  z-50 gap-3"
   >
    <DotLottieReact
      src="https://lottie.host/a5f450a8-1518-4ff5-9120-16ec18dfd4d5/5gAG54xqje.lottie"
      loop
      autoplay
      style={{ width: '300px', height: '300px' }}
    />
 
</div>
  );
};

export default Loading; 

//we can import css using externel css then here we have used like inline css