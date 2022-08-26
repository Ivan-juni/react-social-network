import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import  * as Yup from 'yup';
import { FilterType, FormikType } from '../../../types/types';
import styles from "./UsersForm.module.css";


type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

const UsersForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => {

    const validationSchema = Yup.object({
        //term: Yup.string().required("Required field"),
    });

    type FormType = {
        term: string
        friend: string
    }

    const initialValues = {
        term: '',
        friend: 'null'
    };

    const onSubmit = (values: FormType, { setSubmitting, setStatus } : FormikType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        
        onFilterChanged(filter);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
        {(formik) => {
        return (
            <Form>
                <div className={styles.form__wrapper}>
                    <div className={styles.fields}>
                        <Field type="text" name="term" placeholder="Type name here..." className={styles.term}/>
                        <Field as="select" name="friend" className={styles.select}>
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                    </div>
                    <div className={styles.submitBtn}>
                        <button type="submit" 
                                className={styles.btn} 
                                disabled={!formik.isValid || formik.isSubmitting}
                        >Find</button>
                    </div>
                </div>
                <ErrorMessage name="term" className={styles.error}/>
                <div className={styles.error}>{formik.status}</div>
            </Form>
            );
        }}
        </Formik>
    );
});

export default UsersForm;