import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import clsx from 'clsx';
import { getUserByToken, register } from '../core/_requests';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../features/helpers';
import { PasswordMeterComponent } from '../../../../features/assets/ts/components';
import { useAuth } from '../core/Auth';
import { registrationSchema } from '../scheme/schemes';

const initialValues = {
  fullname: '',
  lastname: '',
  email: '',
  countryCode: '+57',
  mobil: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
  profilePicture: '', // Añadido
};

const countryCodes = [
  { code: '+57', label: 'Colombia' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
  // Añadir más países según sea necesario
];

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const { data: auth } = await register(
          values.email,
          values.fullname,
          values.lastname,
          values.password,
          values.changepassword,
          values.countryCode,
          values.mobil,
          values.acceptTerms,
          values.profilePicture
        );
        saveAuth(auth);
        const { data: user } = await getUserByToken(auth.api_token);
        setCurrentUser(user);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The registration details are incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  useEffect(() => {
    console.log('Formik values:', formik.values);
    console.log('Formik errors:', formik.errors);
    console.log('Formik isValid:', formik.isValid);
    console.log('Formik isSubmitting:', formik.isSubmitting);
  }, [formik.values, formik.errors, formik.isValid, formik.isSubmitting]);

  return (
    <div className='form-container' style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
      >
        {/* begin::Heading */}
        <div className=' mb-11'>
        <h1 className="text-center mb-4">
                <b className="text-center mb-4" style={{ fontSize: '2em' }}>NU</b>
                <span className="text-center mb-4" style={{ fontSize: '1.5em', width: '100%', backgroundColor: '#0beea6', borderRadius: '10px', padding: '4px' }}>
                  <b>Pay</b>
                </span>
                FINANCE
              </h1>
              <br />
              <h3 className="card-subtitle text-left mb-4" style={{ fontSize: '2.1em' }}>
                <b>Gracias por elegirnos</b>
              </h3>
        </div>
        {/* end::Heading */}

        {/* begin::Login options */}
        <div className='row g-3 mb-9'>
          <div className='col-md-6'>
            <a
              href='#'
              className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
            >
              <img
                alt='Google'
                src={toAbsoluteUrl('media/svg/brand-logos/google-icon.svg')}
                className='h-15px me-3'
              />
              Google
            </a>
          </div>
          <div className='col-md-6'>
            <a
              href='#'
              className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
            >
              <img
                alt='Apple'
                src={toAbsoluteUrl('media/svg/brand-logos/apple-black.svg')}
                className='theme-light-show h-15px me-3'
              />
              <img
                alt='Apple Dark'
                src={toAbsoluteUrl('media/svg/brand-logos/apple-black-dark.svg')}
                className='theme-dark-show h-15px me-3'
              />
              Apple
            </a>
          </div>
        </div>
        {/* end::Login options */}

        <div className='separator separator-content my-14'>
          <span className='w-125px text-gray-500 fw-semibold fs-7'>O con tu Email</span>
        </div>

        {formik.status && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )}

        {/* begin::Form group fullname */}
        <div className='fv-row mb-8'>
          <input
            placeholder='Nombre completo'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('fullname')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.fullname && formik.errors.fullname,
              },
              {
                'is-valid': formik.touched.fullname && !formik.errors.fullname,
              }
            )}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.fullname}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Lastname */}
        <div className='fv-row mb-8'>
          <input
            placeholder='Apellidos'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('lastname')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.lastname && formik.errors.lastname,
              },
              {
                'is-valid': formik.touched.lastname && !formik.errors.lastname,
              }
            )}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.lastname}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Email */}
        <div className='fv-row mb-8'>
          <input
            placeholder='Email'
            type='email'
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.email && formik.errors.email },
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Country Code */}
        <div className='fv-row mb-8'>
          <select
            {...formik.getFieldProps('countryCode')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.countryCode && formik.errors.countryCode },
              { 'is-valid': formik.touched.countryCode && !formik.errors.countryCode }
            )}
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.label}
              </option>
            ))}
          </select>
          {formik.touched.countryCode && formik.errors.countryCode && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.countryCode}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Mobile */}
        <div className='fv-row mb-8'>
          <input
            placeholder='Número de móvil'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('mobil')}
            className={clsx(
              'form-control bg-transparent',
              { 'is-invalid': formik.touched.mobil && formik.errors.mobil },
              { 'is-valid': formik.touched.mobil && !formik.errors.mobil }
            )}
          />
          {formik.touched.mobil && formik.errors.mobil && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.mobil}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group Password */}
        <div className='fv-row mb-8' data-kt-password-meter='true'>
          <div className='mb-1'>
            <div className='position-relative mb-3'>
              <input
                type='password'
                placeholder='Password'
                autoComplete='off'
                {...formik.getFieldProps('password')}
                className={clsx(
                  'form-control bg-transparent',
                  {
                    'is-invalid': formik.touched.password && formik.errors.password,
                  },
                  {
                    'is-valid': formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password}</span>
                  </div>
                </div>
              )}
            </div>
            <div
              className='d-flex align-items-center mb-3'
              data-kt-password-meter-control='highlight'
            >
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
            </div>
          </div>
          <div className='text-muted'>
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className='fv-row mb-5'>
          <input
            type='password'
            placeholder='Password confirmation'
            autoComplete='off'
            {...formik.getFieldProps('changepassword')}
            className={clsx(
              'form-control bg-transparent',
              {
                'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
              },
              {
                'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
              }
            )}
          />
          {formik.touched.changepassword && formik.errors.changepassword && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.changepassword}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
          <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
            <input
              className='form-check-input'
              type='checkbox'
              id='kt_login_toc_agree'
              {...formik.getFieldProps('acceptTerms')}
            />
            <span>
              I Accept the{' '}
              <a
                href='https://keenthemes.com/metronic/?page=faq'
                target='_blank'
                className='ms-1 link-primary'
              >
                Terms
              </a>
              .
            </span>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_up_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
          >
            {!loading && <span className='indicator-label'>Enviar</span>}
            {loading && (
              <span className='indicator-progress' style={{display: 'block'}}>
                Porfavor espere...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_signup_form_cancel_button'
              className='btn btn-lg btn-light-primary w-100 mb-5'
            >
              Cancel
            </button>
          </Link>
        </div>
        {/* end::Form group */}
      </form>
    </div>
  );
}
