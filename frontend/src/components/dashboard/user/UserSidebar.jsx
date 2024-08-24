import React, { useState } from 'react';
import { HomeIcon, UserIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline';

const UserSidebar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className="sidebar">
      <h1 className="title">My Dashboard</h1>
      <nav>
        <ul>
          <li>
            <a
              href="/home"
              className={activeItem === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick('home');
              }}
              tabIndex={activeItem === 'home' ? 0 : -1}
              aria-label="Home link"
            >
              <HomeIcon className="icon" aria-hidden="true" />
              Home
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className={activeItem === 'profile' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick('profile');
              }}
              tabIndex={activeItem === 'profile' ? 0 : -1}
              aria-label="Profile link"
            >
              <UserIcon className="icon" aria-hidden="true" />
              Profile
            </a>
          </li>
          <li>
            <a
              href="/documents"
              className={activeItem === 'documents' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick('documents');
              }}
              tabIndex={activeItem === 'documents' ? 0 : -1}
              aria-label="Documents link"
            >
              <DocumentTextIcon className="icon" aria-hidden="true" />
              Documents
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className={activeItem === 'settings' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick('settings');
              }}
              tabIndex={activeItem === 'settings' ? 0 : -1}
              aria-label="Settings link"
            >
              <CogIcon className="icon" aria-hidden="true" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default UserSidebar;