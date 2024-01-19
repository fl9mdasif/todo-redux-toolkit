import { ReactNode } from "react";

type TTodoContainerProps = {
  children: ReactNode;
};

const ConTainer = ({ children }: TTodoContainerProps) => {
  return (
    <div className="h-screen w-full max-w-7xl mx-auto bg-gray-200">
      {children}
    </div>
  );
};

export default ConTainer;
