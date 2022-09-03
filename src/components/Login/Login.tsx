import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../Redux/auth-reducer.ts";
import { RootState } from "../../types/types";


const Login: React.FC = () => {
  const captcha = useSelector((state: RootState) => state.auth.captchaURL);
  if (useSelector((state: RootState) => state.auth.isAuth)) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginArea}>
        <h1>Sign in</h1>
        <LoginForm captcha={captcha} />
      </div>
    </div>
  );
};

type PropsType = {
  captcha: string | null
};

const LoginForm: React.FC<PropsType> = ({ captcha }) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
    captcha: null
  };

  type valuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null 
  }

  type FormikType = {
    setSubmitting : (isSubmitting: boolean) => void
    setStatus: (arg0: string) => void
  }

  const onSubmit = (values: valuesType, { setSubmitting, setStatus } : FormikType)=> {
    //console.log("Form data", values);
    dispatch(
      loginTC(
        values.email,
        values.password,
        values.rememberMe,
        values.captcha,
        setStatus,
        setSubmitting
      )
    );
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Required field"),
    password: Yup.string()
      .required("Required field")
      .min(4, "Must be longer than 3 characters"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className={styles.loginField}>
              <div className={styles.formControl}>
                <span>Login:</span>
                <div className={styles.errorLabel}>
                  <div className={styles.error}>
                    <ErrorMessage name="email" />
                  </div>
                  <Field type="email" name="email" placeholder="E-mail" />
                </div>
              </div>
            </div>
            <div className={styles.passwordField}>
              <div className={styles.formControl}>
                <span>Password:</span>
                <div className={styles.error}>
                  <ErrorMessage name="password" className={styles.error} />
                </div>
                <Field type="password" name="password" placeholder="Password" />
              </div>
            </div>
            <div className={styles.confirmField}>
              <div className={styles.rememberMe}>
                <Field type="checkbox" name="rememberMe" />
                remember me
              </div>
              {captcha && (
                <div className={styles.captcha}>
                  <img src={captcha} className={styles.captcha__thumb} />
                  <Field
                    type="text"
                    name="captcha"
                    className={styles.captcha__field}
                  />
                </div>
              )}
              <button
                className={styles.loginButton}
                type={"submit"}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? "Please wait..." : "Sign in"}
              </button>
            </div>
            <div className={styles.registrationRequest}>
              <span className={styles.signUp}>Haven't account?</span>
              <NavLink to={"/registration"} className={styles.registrationLink}>
                sign up
              </NavLink>
            </div>
            <div className={styles.error}>{formik.status}</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Login;
