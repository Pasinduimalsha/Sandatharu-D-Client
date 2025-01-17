
import Style from './loading.module.css'; //This  is very importent // CsS MODULE SYSTEM
// import logo from '../../images/Red_Cypher_Logo.png';


const Loading = () => {
  return (
    <div className="relative top-0 left-0 flex flex-col w-screen h-screen items-center justify-center  z-50 gap-3"
    style={{ backgroundImage: 'linear-gradient(60deg, #000000 0%, #350101 100%)' }}>
 
 <div className={Style.dots_generator}>
 {/* <img  src={logo} alt='logo' className={Style.rotating_logo} /> */}
 </div>


</div>
  );
};

export default Loading; 

//we can import css using externel css then here we have used like inline css