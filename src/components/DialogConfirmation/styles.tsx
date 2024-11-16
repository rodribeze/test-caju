import styled, { keyframes } from "styled-components";

type BackdropProps = {
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

export const Backdrop = styled.div<BackdropProps>`
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

  animation: ${(props) => (props.show ? fadeIn : fadeOut)}
    ${(props) => `${props.delay}ms`} 1 forwards;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  transition: visibility ${(props) => `${props.delay}ms`} linear,
    opacity ${(props) => `${props.delay}ms`} linear;
`;

export const Container = styled.div`
  background: white;
  border-radius: 5px;
  width: 680px;
`;

export const Header = styled.div`
   padding: .5rem 1rem;
   font-size: 1.5rem;
   border-bottom: 1px solid #241c150d;
`;

export const Body = styled.div`
   padding: 1rem;
   font-size: 1rem;
`;

export const Actions = styled.div`
   display:flex;
   justify-content: flex-end;
   border-top: 1px solid #241c150d;
   gap: 1rem;
   padding: .5rem 1rem;
`;

export const ButtonConfirm = styled.button`
   background-color: rgb(155, 229, 155);
   border: none;
   padding: 0.5rem 1rem;
   display:inline-block;
   cursor: pointer;
   border-radius: 3px;
`;

export const ButtonCancel = styled.button`
   background-color: rgb(255, 145, 154);
   border: none;
   padding: 0.5rem 1rem;
   display:inline-block;
   cursor: pointer;
   border-radius: 3px;
`;

