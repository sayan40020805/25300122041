import React from "react";
import { LoggerContext } from "./LoggerContext";

const LoggerProvider = ({ children }) => {
  const logEvent = (action, details) => {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    const newLog = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };
    logs.push(newLog);
    localStorage.setItem("logs", JSON.stringify(logs));
  };

  return (
    <LoggerContext.Provider value={{ logEvent }}>
      {children}
    </LoggerContext.Provider>
  );
};

export default LoggerProvider;
