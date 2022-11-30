import { useState } from "react";
import { useMemo } from "react";
import React from "react";
import { Schedule } from "../models";

export const ScheduleContext = React.createContext(null);

export const ScheduleContextProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(new Schedule([]));

  const context = useMemo(
    () => ({
      schedule,
      addToSchedule: (tour) => {
        console.log("adding to schedule now!");
        let _schedule = { ...schedule };
        console.log(_schedule);
        let existing = _schedule.tours.find(
          (x) => x.tour.tour_Name === tour.tour_Name
        );
        if (existing) {
        } else {
          _schedule.tours.push({ tour });
        }

        setSchedule(_schedule);
        console.log("Schedule: ", schedule);
      },
    }),
    [schedule]
  );

  return (
    <ScheduleContext.Provider value={{ context }}>
      {children}
    </ScheduleContext.Provider>
  );
};
