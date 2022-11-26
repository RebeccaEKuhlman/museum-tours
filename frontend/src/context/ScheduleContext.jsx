import { useState } from "react";
import { useMemo } from "react";
import React from "react";
import { Schedule } from "../models";

export const ScheduleContext = React.createContext(null);

export const ScheduleContextProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(new Schedule([], 0));

  const context = useMemo(() => ({
    schedule,
    addToSchedule: (product) => {
      console.log("adding to schedule now!");
      let _schedule = { ...schedule };
      let existing = _schedule.items.find(x => x.product.id === product.id);
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = existing.product.price * existing.quantity;
      } else {
        _schedule.items.push({ product, quantity: 1, totalPrice: product.price });
      }
      
      _schedule.total = _schedule.items.map(x => x.totalPrice).reduce((x, y) => x + y);
      setSchedule(_schedule);
      console.log("Schedule: ", schedule);
    },
    }), [schedule]);

  return (
    <ScheduleContext.Provider value={{ context }}>
      {children}
    </ScheduleContext.Provider>
  );
}