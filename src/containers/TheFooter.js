import React from 'react';
import { CFooter } from '@coreui/react';

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://felipealves.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          Felipe Alves
        </a>
        <span className="ml-1">&copy; 2020</span>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
