import React, { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div >
      <Navbar/>
      <main>
        {children}
      </main>
    </div> 
  );
}
