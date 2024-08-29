import React, { ReactNode } from "react";
import styled from "styled-components";
import { Button } from "./Buttons";

const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 1rem;
`;

interface ConfirmationProps {
  title: string;
  icon: ReactNode;
  confirmBtnName: string;
  close: () => void;
  confirmBtnClick: () => void;
}

const ConfirmationModal: React.FC<ConfirmationProps> = ({
  title,
  icon,
  confirmBtnName,
  close,
  confirmBtnClick,
}) => {
  return (
    <ConfirmationContainer>
      {icon}
      <h3>{title}</h3>
      <ButtonsContainer>
        <Button.Secondary className="w-[100px]" type="button" onClick={close}>
          Cancel
        </Button.Secondary>
        <Button className="w-[100px]" type="button" onClick={confirmBtnClick}>
          {confirmBtnName}
        </Button>
      </ButtonsContainer>
    </ConfirmationContainer>
  );
};

export default ConfirmationModal;
