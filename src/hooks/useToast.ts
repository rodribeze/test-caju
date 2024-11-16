import { atom, useAtom } from "jotai";
import { useEffect } from "react";

type ToastMessageProps = {
  message: string;
  type: "success" | "error";
} | null;

const messageAtom = atom<ToastMessageProps>(null);

let timeoutMessage: NodeJS.Timeout;

export const useToast = () => {
  const [message, setMessage] = useAtom(messageAtom);

  const showMessage = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setMessage({
      message,
      type,
    });
  };

  const hideMessage = () => setMessage(null);

  useEffect(() => {
    clearTimeout(timeoutMessage);

    if (message?.message)
      timeoutMessage = setTimeout(() => {
        setMessage(null);
      }, 5000);

    return () => {
      clearTimeout(timeoutMessage);
    };
  }, [setMessage, message?.message]);

  return {
    hideMessage,
    showMessage,
    message,
  };
};
