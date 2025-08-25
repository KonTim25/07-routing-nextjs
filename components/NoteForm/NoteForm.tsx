"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { type NoteTag } from '@/types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onSuccess: () => void;
}

const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500, 'Max 500 characters'),
  tag: Yup.mixed<NoteTag>().oneOf(tags).required('Tag is required'),
});

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
  });

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        mutation.mutate({
            ...values,
        tag: values.tag as NoteTag,
      });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>
          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onSuccess}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}