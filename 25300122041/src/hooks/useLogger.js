import { useContext } from "react";
import { LoggerContext } from "../context/LoggerContext";

const useLogger = () => {
  const context = useContext(LoggerContext);

  if (!context) {
    throw new Error("useLogger must be used within LoggerProvider");
  }

  return {
    logEvent: context.logEvent, // ✅ match your components
  };
};

export default useLogger;
