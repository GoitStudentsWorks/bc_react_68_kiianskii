import { useState, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";

import Validation from "./Validation";
import { Icon } from "../../img/Icon";
import s from "./LoginForm.module.css";
import { RegisterGrad } from "./RegistrGrad";
import { LoginGrad } from "./LoginGrad";
import ProgressBar from "./ProgressBar";

export default function LoginForm({ type, onSubmit, initialValues }) {
  const [size, setSize] = useState(window.innerWidth);

  const handleResize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section
        className={
          type === "login" ? `${s.loginSections}` : `${s.registerSections}`
        }
      >
        {type === "login" ? <LoginGrad /> : <RegisterGrad />}
        <div
          className={
            type === "login"
              ? s.form_container_login
              : s.form_container_register
          }
        >
          <div
            className={s.logo_wrapper}
            style={{ paddingBottom: type === "login" ? "11px" : "0px" }}
          >
            <Icon size={size > 768 ? 34 : 26} id="logo-mob" />
            Money Guard
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={Validation(type)}
            context={{ type }}
          >
            {({ isSubmitting, values }) => (
              <Form className={s.form}>
                {type === "register" && (
                  <div className={s.inputContainer}>
                    <Icon size={24} id="user" className={s.svg} />
                    <Field
                      className={s.formInput}
                      type="text"
                      name="username"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={s.user_error}
                    />
                  </div>
                )}
                <div className={s.inputContainer}>
                  <Icon size={24} id="email" className={s.svg} />
                  <Field
                    className={s.formInput}
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.email_error}
                  />
                </div>
                <div className={s.inputContainer}>
                  <Icon size={24} id="password" className={s.svg} />
                  <Field
                    className={s.formInput}
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={s.password_error}
                  />
                </div>
                {type === "register" && (
                  <div className={s.inputContainer}>
                    <Icon size={24} id="password" className={s.svg} />
                    <Field
                      className={s.formInput}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={s.confirm_error}
                    />
                    <ProgressBar password={values.password} />
                  </div>
                )}
                <div className={s.button_cont}>
                  <button
                    className={s.buttonSubmit}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {type === "login" ? "log in" : "register"}
                  </button>
                  <NavLink
                    className={s.buttonNoactive}
                    to={type === "login" ? "/register" : "/login"}
                  >
                    {type === "login" ? "register" : "log in"}
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}
