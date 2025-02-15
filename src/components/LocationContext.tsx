import React, { createContext, useState, useEffect, useContext } from "react";

interface LocationContextProps {
  location: { latitude: number; longitude: number } | null;
  status: "granted" | "denied" | "prompt";
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] =
    useState<LocationContextProps["location"]>(null);
  const [status, setStatus] =
    useState<LocationContextProps["status"]>("prompt");

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setStatus("granted");
          },
          () => {
            setStatus("denied");
          }
        );
      } else {
        setStatus("denied");
      }
    };

    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, status }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
