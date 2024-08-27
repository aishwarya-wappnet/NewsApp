import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";

interface ModalProps {
  show: boolean;
  close: () => void;
  outsideClose?: boolean;
  escapeClose?: boolean;
  title?: string;
  width?: string;
  showLogo?: boolean;
  children: React.ReactElement;
}

interface ModalContainerProps {
  width?: string;
}

const ModalOverlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`;

const ModalContainer = styled.div<ModalContainerProps>`
  width: ${({ width }) => width || "50%"};
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  max-height: 90%;
  overflow: auto;
  margin: 1rem;
  @media (max-width: 720px) {
    width: 100%;
  }
`;

const Modal: React.FC<ModalProps> = ({
  show,
  close,
  outsideClose,
  escapeClose,
  title,
  width,
  showLogo,
  children,
}) => {
  const [showModal, setShowModal] = useState(show);

  useEffect(() => {
    setShowModal(show);
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (escapeClose && event.key === "Escape") {
        close();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal, escapeClose, close]);

  if (!showModal) {
    return null;
  }

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (outsideClose && event.target === event.currentTarget) close();
  };

  return (
    <ModalOverlay onClick={handleOutsideClick}>
      <ModalContainer data-aos="zoom-in" width={width}>
        <div className="sticky top-0 bg-white w-full z-10">
          {showLogo && (
            <div className="flex justify-center items-center border-b py-3 ">
              <Logo />
            </div>
          )}
          {title && (
            <h2 className="flex font-semibold justify-start items-center border-b p-3 bg-gray-300">
              {title}
            </h2>
          )}
        </div>
        <div className="p-5">{children}</div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
