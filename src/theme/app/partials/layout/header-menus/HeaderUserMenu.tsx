
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
          <img
      alt="Profile Image"
      src={`${currentUser?.profilePicture}`}
      className="rounded-circle"
      style={{ width: '40px', height: '40px', objectFit: 'cover' }} // Asegura que la imagen sea cuadrada
    />              
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.fullname}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Verificado</span>
            </div>
            <a className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          Mi cuenta
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a href='#' className='menu-link px-5'>
          <span className='menu-text'>Mis inversiones</span>
          <span className='menu-badge'>
            <span className='badge badge-light-danger badge-circle fw-bolder fs-7'>3</span>
          </span>
        </a>
      </div>

      <div
        className='menu-item px-5'
        data-kt-menu-trigger='hover'
        data-kt-menu-placement='left-start'
        data-kt-menu-flip='bottom'
      >
        <a href='#' className='menu-link px-5'>
          <span className='menu-title'>Facturacion</span>
          <span className='menu-arrow'></span>
        </a>

        <div className='menu-sub menu-sub-dropdown w-175px py-4'>
          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
            Referencias
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
            Facturación
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link px-5'>
            Pagos
            </a>
          </div>

          <div className='menu-item px-3'>
            <a href='#' className='menu-link d-flex flex-stack px-5'>
            Declaraciones
              <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title='View your statements'
              ></i>
            </a>
          </div>

          <div className='separator my-2'></div>

          <div className='menu-item px-3'>
            <div className='menu-content px-3'>
              <label className='form-check form-switch form-check-custom form-check-solid'>
                <input
                  className='form-check-input w-30px h-20px'
                  type='checkbox'
                  value='1'
                  defaultChecked={true}
                  name='notifications'
                />
                <span className='form-check-label text-muted fs-7'>Notificaciones</span>
              </label>
            </div>
          </div>
        </div>
      </div>

  

      <div className='separator my-2'></div>

      <Languages />

      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/settings' className='menu-link px-5'>
          Configuracion de la cuenta
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Cerra sesion
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
