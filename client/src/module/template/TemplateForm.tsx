import React, { useCallback, useEffect, useRef } from 'react';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { toast } from 'react-toastify';
//@ts-ignore
import EmailEditor from 'react-email-editor';
import { useFormik } from 'formik';
import { TemplateSchema } from './validationSchema';
import { fetchCreateTemplate, fetchUpdateTemplate } from '../../api/templates.api';
import { history } from '../../helper/history';
import { ITemplate } from '../../package/store/reducers/template.reducer';

export const TemplateForm: React.FC<{ item: ITemplate | null }> = ({ item }) => {
  const emailEditorRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      body: '',
      json: '',
    },
    validationSchema: TemplateSchema,
    onSubmit: async ({ title, description, body, json }, methods) => {
      try {
        methods.setSubmitting(true);
        let payload = { title, description, body, json: JSON.stringify(json) };
        item ? await fetchUpdateTemplate(item._id, payload) : await fetchCreateTemplate(payload);
        methods.resetForm();
        methods.setSubmitting(false);
        toast('Template Created successfully', {
          onClose: () => {
            history.push({
              pathname: '/',
            });
          },
        });
      } catch (error) {
        toast.error('Something was wrong!');
        methods.setSubmitting(false);
      }
    },
  });

  const exportHtml = useCallback(() => {
    if (!emailEditorRef.current) return;
    //@ts-ignore
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      formik.setFieldValue('body', html);
      formik.setFieldValue('json', design);
      formik.submitForm();
    });
  }, [emailEditorRef, formik]);

  const onLoad = useCallback(() => {
    // you can load your template here;
    if (emailEditorRef.current) {
      const templateJson = (item && item.json) || {};
      //@ts-ignore
      emailEditorRef.current.editor.loadDesign(templateJson);
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      const { title, description, body, json } = item;
      formik.setValues({
        title,
        description,
        body,
        json,
      });
      onLoad();
    }
  }, [item, onLoad]);

  return (
    <>
      <Box width={1}>
        <Grid item>
          <TextField
            id='Title'
            label='Title'
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            error={'title' in formik.errors && 'title' in formik.touched}
          />
        </Grid>

        <Grid item>
          <TextField
            id='description'
            label='Description'
            fullWidth
            value={formik.values.description}
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            error={'description' in formik.errors && 'description' in formik.touched}
          />
        </Grid>
        <br />
      </Box>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
      <br />
      <br />
      <Grid item xs={12}>
        <Button
          variant='outlined'
          color='primary'
          fullWidth
          onClick={exportHtml}
          disabled={!formik.values.title || !formik.values.description || formik.isSubmitting}
        >
          Save
        </Button>
      </Grid>
    </>
  );
};
