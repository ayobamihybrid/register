import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../redux/features/api/auth/authApi';

const schema = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Email address is not valid!')
    .required('Please enter your email address'),
  password: Yup.string().required('Please enter your password!').min(6),
});

const Register = () => {
  const [register, { data, isSuccess, error }] = useRegisterMutation();

  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const resizeScreen = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener('resize', resizeScreen);

    return () => {
      window.removeEventListener('resize', resizeScreen);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Registration successful';
      console.log(message);
      navigate('/sign-in');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error;
        console.log(errorData);
      }
    }
  }, [isSuccess, error, data?.message]);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: schema,
    onSubmit: async ({ name, email, password, confirmPassword }) => {
      const data = {
        name,
        email,
        password,
        confirmPassword,
      };

      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full h-screen 1000px:flex ">
      {!isSmallScreen && (
        <div
          className="relative w-[44%] h-full 1500px:bg-center bg-contain bg-no-repeat"
          style={{
            backgroundSize: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#00FEA8',
              opacity: '35%',
            }}
          ></div>
          <img
            alt=""
            className="absolute 1000px:top-[65px] 1000px:left-[55px] 1000px:w-[205px] 1000px:h-[100px] "
          />

          <div className="relative 1000px:ml-[55px] mx-auto h-full flex flex-col gap-4 items-center justify-center">
            <h1 className="1000px:text-[42px] 1000px:leading-[63px] 1500px:ml-[-35px] font-[600] font-poppins">
              Welcome to the Duwitt Hub
            </h1>

            <h2
              className="text-[18px] 1000px:text-[22px] 1100px:text-[22px] 1200px:text-[28px] 1000px:leading-[42px] font-[500]"
              style={{ fontFamily: 'poppins' }}
            >
              Unlock the Power of Cryptocurrency Your Journey Starts Here –
              Learn, Connect, Thrive
            </h2>
          </div>
        </div>
      )}

      <div className={`${isSmallScreen ? 'w-full' : 'w-[50%]'}`}>
        {!isSmallScreen && (
          <div className="px-9 mt-[80px] flex justify-end">
            <div className="flex items-center gap-1">
              <p>Go back to home</p>
            </div>
          </div>
        )}

        <div
          className={` ${
            isSmallScreen ? 'w-[85%]' : 'w-[70%]'
          } mt-9 1000px:mt-[50px] 1100px:mt-[55px] 1500px:mt-[40px] mx-auto`}
        >
          <h1
            className="text-[30px] font-[600]"
            style={{ fontFamily: 'Kumbh Sans' }}
          >
            Welcome
          </h1>
          <p
            className="my-2 text-[14px] 1000px:text-[15px] 1100px:text-[16px] text-[#78778B]"
            style={{ fontFamily: 'Kumbh Sans' }}
          >
            Welcome! Enter your details to create an Account
          </p>

          <form className="relative" onSubmit={handleSubmit}>
            <div className="mt-6">
              <label
                htmlFor="name"
                className="text-[14px] font-[500]"
                style={{ fontFamily: 'Kumbh Sans' }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={values.name}
                className="w-full py-[6px] px-4 border border-[#00FEA8] rounded-[10px]"
                onChange={handleChange}
              />
              {errors.name && touched.name && (
                <span className="text-red-500 pt-2 block"> {errors.name} </span>
              )}
            </div>

            <div className="mt-[14px]">
              <label
                htmlFor="name"
                className="text-[14px] font-[500]"
                style={{ fontFamily: 'Kumbh Sans' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={values.email}
                className="w-full py-[6px] px-4 border border-[#00FEA8] rounded-[10px]"
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <span className="text-red-500 pt-2 block">{errors.email} </span>
              )}
            </div>

            <div className="relative mt-[14px]">
              <label
                htmlFor="name"
                className="text-[14px] font-[500]"
                style={{ fontFamily: 'Kumbh Sans' }}
              >
                Password
              </label>
              <input
                id="password"
                type={'password'}
                placeholder="Enter a strong password"
                value={values.password}
                className="w-full py-[6px] px-4 border border-[#00FEA8] rounded-[10px]"
                onChange={handleChange}
              />

              {/* {showPassword ? (
                // <AiOutlineEye
                //   size={24}
                //   className="absolute right-2 bottom-2 cursor-pointer"
                //   onClick={() => setShowPassword(!showPassword)}
                // />
              ) : (
                // <AiOutlineEyeInvisible
                //   size={24}
                //   className="absolute right-2 bottom-2 cursor-pointer"
                //   onClick={() => setShowPassword(!showPassword)}
                // />
              )} */}
              {errors.password && touched.password && (
                <span className="text-red-500 pt-2 block">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="relative mt-[14px]">
              <label
                htmlFor="name"
                className="text-[14px] font-[500]"
                style={{ fontFamily: 'Kumbh Sans' }}
              >
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={'password'}
                placeholder="Enter password again"
                value={values.confirmPassword}
                className="w-full py-[6px] px-4 border border-[#00FEA8] rounded-[10px]"
                onChange={handleChange}
              />

              {/* {showConfirmPassword ? (
                <AiOutlineEye
                  size={24}
                  className="absolute right-2 bottom-2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={24}
                  className="absolute right-2 bottom-2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )} */}
              {errors.password && touched.password && (
                <span className="text-red-500 pt-2 block">
                  {errors.password}
                </span>
              )}
            </div>

            <button className="button !w-full my-6 1000px:mt-[20px] 1500px:mt-[30px] text-[#000] text-[16px] font-[600] 1000px:text-[18px] 1000px:leading-[27px] !bg-[#00FEA8] ">
              Sign Up
            </button>

            <div className="relative">
              <p className="text-[14px] text-center">
                Already have an account?{' '}
                <span
                  className="font-[600] cursor-pointer mb-[79px]"
                  onClick={() => navigate(`/sign-in`)}
                >
                  Sign in Here
                </span>
              </p>

              {/* <img
                src={vector}
                alt=""
                className="absolute top-6 w-[78px] left-[210px] 400px:left-[250px] 500px:left-[285px] 700px:left-[382px] 800px:left-[395px] 900px:left-[445px] 1000px:top-6 1000px:left-[247px] 1100px:left-[255px] 1200px:left-[275px] 1300px:left-[290px] 1500px:left-[325px] "
              /> */}
            </div>
            {/* 
            {isSmallScreen && (
              <div className="absolute bottom-[-340px] right-[-50px]">
                <img
                  src={ellipsebottom}
                  alt=""
                  className="W-[500px] h-[170px]"
                />
              </div>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
