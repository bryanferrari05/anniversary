import { useEffect, useState } from "react";
import { loveData } from "../data/loveData";
import { relationshipDuration } from "../lib/calendar";
export function useRelationship() {
  const [time, setTime] = useState(() =>
    relationshipDuration(loveData.relationshipStart),
  );
  useEffect(() => {
    const update = () =>
      setTime(relationshipDuration(loveData.relationshipStart));
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return time;
}
