import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SidebarButton: React.FC<Props> = ({ children }) => {
  return <button className="flex items-center space-x-2 font-bold">{children}</button>;
};

export default SidebarButton;
