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
    let timer: number;
    const tick = () => {
      update();
      // Align ticks to the next wall-clock second, including midnight.
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    const resume = () => {
      window.clearTimeout(timer);
      tick();
    };
    tick();
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("pageshow", resume);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pageshow", resume);
    };
  }, []);
  return time;
}
