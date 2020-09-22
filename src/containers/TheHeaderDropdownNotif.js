import React from 'react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { useAuth } from '../hooks/auth';

const TheHeaderDropdownNotif = () => {
  const { notifications } = useAuth();

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">
          {notifications.length}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>Você tem {notifications.length} notificações</strong>
        </CDropdownItem>
        {notifications.map(notification => (
          <CDropdownItem key={notification.text}>
            <CIcon
              name={notification.icon}
              className={`mr-2 text-${notification.class}`}
            />
            {notification.text}
          </CDropdownItem>
        ))}
        <CDropdownItem header tag="div" color="light">
          <strong>Servidor</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Uso de CPU</b>
            </small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processos. 1/4 Núcleos.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Uso de Memória</b>
            </small>
          </div>
          <CProgress size="xs" color="warning" value={(11444 / 16384) * 100} />
          <small className="text-muted">11444 MB / 16384 MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Usu de SSD</b>
            </small>
          </div>
          <CProgress size="xs" color="danger" value={(243 / 256) * 100} />
          <small className="text-muted">243 GB / 256 GB</small>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownNotif;
