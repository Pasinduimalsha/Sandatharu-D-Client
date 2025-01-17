// import React from 'react';
// import { Typography } from "@material-tailwind/react";
// import styled from "styled-components";
 
// const LINKS = [
//   {
//     title: "Product",
//     items: ["Overview", "Features", "Solutions", "Tutorials"],
//   },
//   {
//     title: "Company",
//     items: ["About us", "Careers", "Press", "News"],
//   },
//   {
//     title: "Resource",
//     items: ["Blog", "Newsletter", "Events", "Help center"],
//   },
// ];
 
// const currentYear = new Date().getFullYear();
 
// const Footer = () => {
//   return (
//     <FooterContainer>
//       <div className="mx-auto w-full max-w-7xl px-8">
//         <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
//           <Typography variant="h5" className="mb-6">
//             Material Tailwind
//           </Typography>
//           <div className="grid grid-cols-3 justify-between gap-4">
//             {LINKS.map(({ title, items }) => (
//               <ul key={title}>
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="mb-3 font-medium opacity-40"
//                 >
//                   {title}
//                 </Typography>
//                 {items.map((link) => (
//                   <li key={link}>
//                     <Typography
//                       as="a"
//                       href="#"
//                       color="gray"
//                       className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
//                     >
//                       {link}
//                     </Typography>
//                   </li>
//                 ))}
//               </ul>
//             ))}
//           </div>
//         </div>
//         <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
//           <Typography
//             variant="small"
//             className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
//           >
//             &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
//             Rights Reserved.
//           </Typography>
//           <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
//             <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
//               <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path
//                   fillRule="evenodd"
//                   d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </Typography>
//             {/* Add other social icons */}
//           </div>
//         </div>
//       </div>
//     </FooterContainer>
//   );
// }
// export default Footer;
// const FooterContainer = styled.footer`
//   background-color: #251515; 
//   color: white; 
//   padding: 20px;
//   position: relative;

//   &::before {
//     content: '';
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: -20px; 
//     height: 20px; 
//     background-color: #130e0e;
//     border-radius: 50% 50% 0 0; 
//   }

  
// `;


