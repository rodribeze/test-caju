import styled, { keyframes } from "styled-components";

type ToastProps = {
  show: string | undefined;
  type: 'success' | 'error';
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

export const Toast = styled.div<ToastProps>`
  width: 680px;
  padding: 1rem;
  bottom: 5px;
  background-color: ${(props) => props.type === 'success' ? 'rgb(155, 229, 155)' : 'rgb(255, 145, 154)'};
  position: absolute;
  left: 0; 
  right: 0; 
  margin-inline: auto; 
  width: fit-content;

  display: flex;
  gap:1rem;
  justify-content: space-between;
  align-items: center;

  animation: ${(props) => (props.show ? fadeIn : fadeOut)}
    ${(props) => `${props.delay}ms`} 1 forwards;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility ${(props) => `${props.delay}ms`} linear,
    opacity ${(props) => `${props.delay}ms`} linear;
`;

export const Close = styled.div`
 font-size: 1rem;
 font-weight: bold;
 cursor: pointer;
`