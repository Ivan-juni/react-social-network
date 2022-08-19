import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import styles from "./ProfileDescription.module.css";
import * as Yup from "yup";
import { saveProfile } from "../../../../Redux/profile-reducer";

const ProfileDescriptionForm = ({ profile, dispatch, setEditMode }) => {
  const initialValues = {
    fullName: profile.fullName,
    lookingForAJob: profile.lookingForAJob,
    lookingForAJobDescription: profile.lookingForAJobDescription,
    aboutMe: profile.aboutMe,
    contacts: {
      facebook: profile.contacts.facebook,
      website: profile.contacts.website,
      vk: profile.contacts.vk,
      twitter: profile.contacts.twitter,
      instagram: profile.contacts.instagram,
      youtube: profile.contacts.youtube,
      github: profile.contacts.github,
      mainLink: profile.contacts.mainLink,
    },
  };

  const onSubmit = (values, { setSubmitting, setStatus }) => {
    console.log("Form data", values);
    dispatch(saveProfile(values, setStatus, setSubmitting));
    setEditMode(false);
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Required field")
      .min(2, "Must be longer than 1 characters"),
    contacts: Yup.object({
      facebook: Yup.string().url("Invalid url format").nullable(),
      website: Yup.string().url("Invalid url format").nullable(),
      vk: Yup.string().url("Invalid url format").nullable(),
      twitter: Yup.string().url("Invalid url format").nullable(),
      instagram: Yup.string().url("Invalid url format").nullable(),
      youtube: Yup.string().url("Invalid url format").nullable(),
      github: Yup.string().url("Invalid url format").nullable(),
      mainLink: Yup.string().url("Invalid url format").nullable(),
    }),
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
            <div className={styles.description__caption}>
              <div className={styles.description__name}>
                <Field
                  type="text"
                  name="fullName"
                  className={styles.fullNameField}
                />
                <div className={styles.error}>
                  <ErrorMessage name="fullName" />
                </div>
              </div>
            </div>
            <ul className={styles.description__info}>
              <li>
                <b>Looking for a job:</b>
                <Field
                  type="checkbox"
                  name="lookingForAJob"
                  className={styles.field}
                />
              </li>
              <li>
                <b>My Professional skills: </b>
                <br></br>
                <Field
                  as="textarea"
                  name="lookingForAJobDescription"
                  placeholder="Notice your prof. skills here"
                  className={styles.fieldTextArea}
                />
              </li>
              <li>
                <b>About me: </b>
                <br></br>
                <Field
                  as="textarea"
                  name="aboutMe"
                  placeholder="About you"
                  className={styles.fieldTextArea}
                />
              </li>
              <li className={styles.contacts}>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => {
                  return (
                    <Contact
                      key={key}
                      contactTitle={key}
                      contactValue={
                        <div>
                          <Field
                            type="input"
                            name={"contacts." + key}
                            placeholder={key}
                            className={styles.field}
                          />
                          <div className={styles.error}>
                            <ErrorMessage name={"contacts." + key} />
                          </div>
                        </div>
                      }
                    />
                  );
                })}
              </li>
            </ul>
            <div className={styles.saveProfile}>
              <button
                type={"submit"}
                className={styles.saveButton}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}: </b>
      {contactValue}
    </div>
  );
};

export default ProfileDescriptionForm;
