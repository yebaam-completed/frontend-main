
import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100%';
    }
    return () => {
      if (root) {
        root.style.height = 'auto';
      }
    };
  }, []);

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid '>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 w-100 h-100'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid w-100 h-100'>
          {/* begin::Wrapper */}
          <div className='w-30 h-100'>
            <Outlet />
          </div>
        </div>

      </div>

    </div>
  );
};

export {AuthLayout};
