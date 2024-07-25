import { Link } from 'react-router-dom';

const HeaderLanding = () => {
  return (
    <header className="fixed-top header-background bg-white shadow-sm">
      <div className="container py-3 py-lg-4"> {/* Padding añadido aquí */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center flex-equal">
            <button
              className="btn btn-icon btn-active-color-primary me-3 d-flex d-lg-none"
              id="kt_landing_menu_toggle"
            >
              <i className="ki-duotone ki-abstract-14 fs-2hx text-dark">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </button>
            <Link to="/" className="text-dark text-decoration-none fs-3 fw-bold">
            <p  className="w-50">YEBAAM </p>
              {/* <img src={Logo} alt="Logo" className="w-50"/> */}
            </Link>
          </div>

          <div className="d-lg-block" id="kt_header_nav_wrapper">
            <div
              className="d-lg-block p-5 p-lg-0"
              data-kt-drawer="true"
              data-kt-drawer-name="landing-menu"
              data-kt-drawer-activate="{default: true, lg: false}"
              data-kt-drawer-overlay="true"
              data-kt-drawer-width="200px"
              data-kt-drawer-direction="start"
              data-kt-drawer-toggle="#kt_landing_menu_toggle"
              data-kt-swapper="true"
              data-kt-swapper-mode="prepend"
              data-kt-swapper-parent="{default: '#kt_body', lg: '#kt_header_nav_wrapper'}"
            >
              <div
                className="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-600 menu-state-title-primary nav nav-flush fs-5 fw-semibold"
                id="kt_landing_menu"
              >
                <div className="menu-item">
                  <a
                    className="menu-link nav-link active py-3 px-4 px-xxl-6 text-dark"
                    href="#kt_body"
                    data-kt-scroll-toggle="true"
                    data-kt-drawer-dismiss="true"
                  >
                    Items
                  </a>
                </div>

                <div className="menu-item">
                  <a
                    className="menu-link nav-link py-3 px-4 px-xxl-6 text-dark"
                    href="#how-it-works"
                    data-kt-scroll-toggle="true"
                    data-kt-drawer-dismiss="true"
                  >
                    Items
                  </a>
                </div>

                <div className="menu-item">
                  <a
                    className="menu-link nav-link py-3 px-4 px-xxl-6 text-dark"
                    href="#achievements"
                    data-kt-scroll-toggle="true"
                    data-kt-drawer-dismiss="true"
                  >
                    Items
                  </a>
                </div>

              
              </div>
            </div>
          </div>

          <div className="flex-equal text-end ms-1">
            <Link
              to="/login"
              className="btn btn-success"
              style={{
                backgroundColor: '#primary',
                color: '#000',
                borderRadius: '20px',
                padding: '7px 50px',
              }} 
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>


      </div>
    </header>
  );
};

export default HeaderLanding;
