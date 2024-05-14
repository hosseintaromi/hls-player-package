import Icon from "../icons/Icon";
import { useTime } from "../../hooks/useTime";

const JumpBack = ({ type }: { type: "back" | "forward" }) => {
  const { increaseTime, decreaseTime } = useTime();

  const jumpBack = () => {
    decreaseTime(10);
  };

  const JumpForward = () => {
    increaseTime(10);
  };

  return (
    <>
      {type === "back" ? (
        <Icon
          isClickable
          isSensitive
          onClick={jumpBack}
          type="jumpBack"
          className="vp-icon-jump-back controlled-tool"
        />
      ) : (
        <Icon
          isClickable
          isSensitive
          onClick={JumpForward}
          type="jumpForward"
          className="vp-icon-jump-forward controlled-tool"
        />
      )}
    </>
  );
};

export default JumpBack;
