import styled, { keyframes } from "styled-components";

type CajuLoadingOverlayProps = {
  show: boolean;
  delay: number;
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const CajuLoadingOverlay = styled.div<CajuLoadingOverlayProps>`
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  position: absolute;

  animation: ${(props) => (props.show ? fadeIn : fadeOut)} ${(props) => `${props.delay}ms`} 1 forwards;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility ${(props) => `${props.delay}ms`} linear, opacity ${(props) => `${props.delay}ms`} linear;
`;
