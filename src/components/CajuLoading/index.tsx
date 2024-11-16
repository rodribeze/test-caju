import { useEffect, useState } from "react";
import { CajuLoadingOverlay } from "./styles";
import cajuImg from "@/assets/caju.webp";

type CajuLoadingProps = {
  show?: boolean;
  delay?: number
};

export const CajuLoading = (props: CajuLoadingProps) => {
  const [showLoading, setShowLoading] = useState(false);

  let animationTime: NodeJS.Timeout;
  useEffect(() => {
    clearTimeout(animationTime);
    if (props.show) {
      setShowLoading(true);
    } else {
      animationTime = setTimeout(() => setShowLoading(false), props.delay ?? 500);
    }
  }, [props.show]);

  return (
    <CajuLoadingOverlay show={showLoading} delay={props.delay ?? 500}>
      <img src={cajuImg} width={100} alt="caju-logo" />
    </CajuLoadingOverlay>
  );
};
