import React, { useCallback, useState } from "react";
import { useSpeed } from "../../../hooks/useSpeed";
import SettingModal from "./SettingModal";

const Speed = () => {
  const [currentSpeed, setCurrentSpeed] = useState<number>();

  const { getSpeeds, changeSpeed, speed } = useSpeed();

  const setSpeed = (index: number) => {
    changeSpeed(index);
    setCurrentSpeed(index);
  };

  const loadSpeed = useCallback(() => {
    const speedIndex = getSpeeds()?.findIndex((item) => {
      if (speed) {
        return item.value === speed?.value;
      }
      return item.value === 1;
    });
    setCurrentSpeed(speedIndex);
  }, [getSpeeds, speed]);

  return (
    <SettingModal
      onLoadedFunction={loadSpeed}
      currentItem={currentSpeed}
      setItem={setSpeed}
      title="سرعت پخش"
      items={getSpeeds()?.map((item) => item.key)}
      iconType="speed"
    />
  );
};

export default Speed;
