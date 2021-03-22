import React, { ReactElement } from 'react';

interface Props {}

export default function Navbar(props: Props): ReactElement {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-primary-500 h-16">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-base text-white font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
            href="/"
          >
            Presentation App
          </a>
        </div>

        <div className="lg:flex flex-grow items-center">
          <ul className="flex flex-col lg:flex-row list-none">
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/editor"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">Editor</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                href="/player"
              >
                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                <span className="ml-2">Player</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
