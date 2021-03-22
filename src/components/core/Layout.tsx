import React, { ReactElement, ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Navbar/>
      <main>
        {children}
      </main>
    </> 
  );
}
