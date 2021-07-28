import React from "react";
import { useFormik } from "formik";
import cn from "classnames";

import form from "./form.module.css";

import { ERROR_MESSAGES_DELIMETER, initialValues } from "./constants";
import { validate, validationSchema } from "./validation";

import { PasswordValidationStatus } from "./components/password-validation-status";

function App() {
  const initialFocusElementRef = React.useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validate: validate,
    onSubmit: console.log,
  });

  React.useEffect(() => {
    initialFocusElementRef.current?.focus();
  }, []);

  return (
    <main className="layout">
      <div className={form.layout}>
        <h1 className="page-title">Log in</h1>
        <form
          className={form.form}
          onSubmit={formik.handleSubmit}
          data-testid="login-form"
          noValidate
        >
          <ul className={form.group} role="none">
            <li className={form.field}>
              <label htmlFor="email" className={form.label}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                className={cn(form.input, {
                  [form.input_type_error]:
                    !!formik.errors.email && formik.touched.email,
                })}
                ref={initialFocusElementRef}
              />
              {/* {formik.touched.email && formik.errors.email} */}
            </li>
            <li className={form.field}>
              <label htmlFor="password" className={form.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="password"
                className={form.input}
              />
              <PasswordValidationStatus
                errors={formik.errors.password?.split(ERROR_MESSAGES_DELIMETER)}
              />
            </li>
          </ul>
          <button
            className={form.submit}
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
