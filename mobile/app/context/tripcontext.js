// import { createContext, useContext, useState } from "react";

// const TripContext = createContext();

// export function TripProvider({ children }) {
//   const [trips, setTrips] = useState([]);

//   const addTrip = (trip) => {
//     setTrips((previousTrips) => [
//       ...previousTrips,
//       trip,
//     ]);
//   };

//   return (
//     <TripContext.Provider
//       value={{
//         trips,
//         addTrip,
//       }}
//     >
//       {children}
//     </TripContext.Provider>
//   );
// }

// export function useTrips() {
//   return useContext(TripContext);
// }