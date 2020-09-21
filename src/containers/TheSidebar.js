import React from 'react';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react';

import logo from '../assets/kabum-logo.png';

import { useSidebar } from '../hooks/sidebar';

import navigation from './_nav';

const TheSidebar = () => {
  const { sidebarShow, toggleSidebar } = useSidebar();

  return (
    <CSidebar show={sidebarShow} onShowChange={val => toggleSidebar(val)}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={logo} alt="Logo Kabum" height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
