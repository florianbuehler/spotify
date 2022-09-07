import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const SidebarButton: React.FC<Props> = ({ children }) => {
  return <button className="flex items-center space-x-2 font-bold hover:cursor-default">{children}</button>;
};

export default SidebarButton;
