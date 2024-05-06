import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalContent, ModalOverlay, ModalWrapper } from "./DialogStyle";
import { useContextEvents } from "../../hooks/useContextEvents";
import { PlayerEventsType } from "../../@types/player.model";
import VideoPlayerContext from "../../contexts/VideoPlayerContext";

type DialogPropsType = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Dialog = ({ children, isOpen, onClose }: DialogPropsType) => {
  const { call } = useContextEvents<PlayerEventsType>(VideoPlayerContext);

  useEffect(() => {
    call.onChangeSetting?.(isOpen);
  }, [call, isOpen]);

  return (
    <>
      {createPortal(
        isOpen && (
          <ModalOverlay onClick={onClose}>
            <ModalWrapper onClick={(e: any) => e.stopPropagation()}>
              <ModalContent>{children}</ModalContent>
            </ModalWrapper>
          </ModalOverlay>
        ),
        document.body,
      )}
    </>
  );
};

export default Dialog;
