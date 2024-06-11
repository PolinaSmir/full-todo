import React from "react";
import { Formik, Form, Field } from "formik";
import { format } from "date-fns";

const SignUp = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    passwordHash: "",
    birthday: format(new Date(), "yyyy-MM-dd"),
  };

  const onSubmit = (values, actions) => {
    props.sendData(values);
    actions.resetForm();
  };

  return (
    <>
      <h2>SignUp</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => (
          <Form>
            <Field name="firstName" placeholder="Type your name" />
            <Field name="lastName" placeholder="Type your last name" />
            <Field name="email" placeholder="Type your email" />
            <Field name="passwordHash" placeholder="Type your password" />
            <Field name="birthday" type="date" />
            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
