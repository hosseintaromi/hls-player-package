import { useSpeed } from "../../../hooks/useSpeed";
import SettingModal from "./SettingModal";
import { useSignal } from "../../../hooks/useSignal";

const Speed = () => {
  const { getSpeeds, changeSpeed, currentSpeed } = useSpeed();
  const $currentSpeed = useSignal(currentSpeed);

  const setSpeed = (index: number) => {
    changeSpeed(index);
  };

  return (
    <SettingModal
      currentItem={$currentSpeed}
      setItem={setSpeed}
      title="سرعت پخش"
      items={getSpeeds()?.map((item) => item.key)}
      iconType="speed"
    />
  );
};

export default Speed;
