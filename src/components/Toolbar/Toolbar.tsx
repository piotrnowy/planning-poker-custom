import React, { useEffect, useRef, useState } from 'react';
import { GamesSVG } from '../SVGs/GamesSVG';
import { useHistory } from 'react-router-dom';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { MenuSVG } from '../SVGs/Menu';
import { ThemeControl } from '../ThemeControl/ThemeControl';
export const title = 'Planning Poker';

export const Toolbar = () => {
  const history = useHistory();
  const screenSize = useBreakpoint();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: string) => {
    history.push(path);
    setIsDropdownOpen(false); // Close dropdown after navigation
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex w-full items-center shadow-sm dark:shadow-gray-800'>
      <div className='inline-flex items-center'>
        <button className='button-ghost flex items-center' onClick={() => history.push('/')}>
          <div className='pr-1'>
            <GamesSVG />
          </div>
          <p className='md:text-2xl text-sm font-normal'>{title}</p>
        </button>
      </div>

      {/* Right Section */}
      <div className='inline-flex items-center justify-end flex-1'>
        {screenSize === 'md' || screenSize === 'sm' || screenSize === 'xs' ? (
          <div className='flex relative' ref={dropdownRef}>
            <ThemeControl />
            <button
              className='button-ghost flex items-center'
              onClick={toggleDropdown}
              aria-label='Toggle Menu'
            >
              <MenuSVG />
            </button>
          </div>
        ) : (
          <>
            <ThemeControl />
          </>
        )}
      </div>
    </div>
  );
};
