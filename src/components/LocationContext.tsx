"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

interface LocationContextProps {
  location: { latitude: number; longitude: number } | null;
  status: "granted" | "denied" | "prompt";
  requestLocation: () => void; // Function to re-request location
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

  const getLocation = useCallback(() => {
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
  }, []);

  // Function to re-request location permission
  const requestLocation = useCallback(() => {
    if (status === "denied") {
      getLocation();
    }
  }, [status, getLocation]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return (
    <LocationContext.Provider value={{ location, status, requestLocation }}>
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
