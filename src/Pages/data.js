// rooms images
import Room1Img from '../assets/img/rooms/1.png';
import Room1ImgLg from '../assets/img/rooms/1-lg.png';
import Room3Img from '../assets/img/rooms/3.png';
import Room3ImgLg from '../assets/img/rooms/3-lg.png';
import Room4Img from '../assets/img/rooms/4.png';
import Room4ImgLg from '../assets/img/rooms/4-lg.png';
import Room5Img from '../assets/img/rooms/5.png';
import Room5ImgLg from '../assets/img/rooms/5-lg.png';
import Room6Img from '../assets/img/rooms/6.png';
import Room6ImgLg from '../assets/img/rooms/6-lg.png';
import Room7Img from '../assets/img/rooms/7.png';
import Room7ImgLg from '../assets/img/rooms/7-lg.png';
import Room2Img from '../assets/img/rooms/8.png';
import Room2ImgLg from '../assets/img/rooms/8-lg.png';
import Rm1 from '../assets/img/rooms/rm1.jpg';
import Rm2 from '../assets/img/rooms/rm2.jpg';

// import icons
import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from 'react-icons/fa';

export const roomData = [
  {
    id: 1,
    name: 'Opulent Oasis',
    description:
      'Welcome to our exquisite hotel rooms, where comfort meets elegance.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 25,
    capacity: 1,
    price: 115,
    image: Rm1,
    imageLg: Rm1,
  }
  ,
  {
    id: 2,
    name: 'Grandeur Getaway',
    description:
      "Relax in our spacious and beautifully appointed rooms, adorned with pleasure.",
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 60,
    capacity: 2,
    price: 220,
    image: Rm2,
    imageLg: Rm2,
  },
  {
    id: 3,
    name: 'Majestic Mirage',
    description:
      'Experience a stay like no other in our well designed and luxurious room.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 70,
    capacity: 3,
    price: 265,
    image: Room3Img,
    imageLg: Room3ImgLg,
  },
  {
    id: 4,
    name: 'Paradise Perch',
    description:
      'Experience a true home away from home in our hotel rooms.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 40,
    capacity: 4,
    price: 289,
    image: Room4Img,
    imageLg: Room4ImgLg,
  },
  {
    id: 5,
    name: 'Enchanting Escape',
    description:
      'Book your stay with us and embark on a journey of unparalleled comfort.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 80,
    capacity: 5,
    price: 320,
    image: Room5Img,
    imageLg: Room5ImgLg,
  },
  {
    id: 6,
    name: 'Tranquil Haven',
    description:
      'Step into a world of tranquility and indulgence, where every detail is a memory.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 55,
    capacity: 6,
    price: 344,
    image: Room6Img,
    imageLg: Room6ImgLg,
  },
  {
    id: 7,
    name: 'Royal Oasis',
    description:
      'Enjoy modern amenities, breathtaking views, and impeccable service.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 44,
    capacity: 7,
    price: 389,
    image: Room7Img,
    imageLg: Room7ImgLg,
  },
  {
    id: 8,
    name: 'Blissful Retreat',
    description:
      'Book your stay with us and discover a world of refined luxury that will leave smiling.',
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 78,
    capacity: 8,
    price: 499,
    image: Room1Img,
    imageLg: Room1ImgLg,
  },
  {
    id: 9,
    name: 'Serenity Suite',
    description:
      "Whether you're here for business or leisure, our hotel room provides the perfect haven.",
    facilities: [
      { name: 'Wifi', icon: <FaWifi /> },
      { name: 'Coffee', icon: <FaCoffee /> },
      { name: 'Bath', icon: <FaBath /> },
      { name: 'Parking Space', icon: <FaParking /> },
      { name: 'Swimming Pool', icon: <FaSwimmingPool /> },
      { name: 'Breakfast', icon: <FaHotdog /> },
      { name: 'GYM', icon: <FaStopwatch /> },
      { name: 'Drinks', icon: <FaCocktail /> },
    ],
    size: 28,
    capacity: 7,
    price: 599,
    image: Room2Img,
    imageLg: Room2ImgLg,
  },
];
