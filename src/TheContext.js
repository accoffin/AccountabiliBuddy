import React, { useState, createContext } from "react";

export const ActivityContext = createContext();

export const ActivityContextProvider = (props) => {
  const [activity, setActivity] = useState([]);

  return (
    <ActivityContext.Provider value={{ activity, setActivity }}>
      {props.children}
    </ActivityContext.Provider>
  );
};
