import React, { useCallback, useRef } from 'react';
import { Box, Grid, TextField, Button } from '@material-ui/core';
//@ts-ignore
import EmailEditor from 'react-email-editor';

const TemplateContainer = () => {
  const emailEditorRef = useRef(null);

  const exportHtml = useCallback(() => {
    if (!emailEditorRef.current) return;
    //@ts-ignore
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
    });
  }, [emailEditorRef]);

  const onLoad = () => {
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <Box width={1}>
          <Grid item>
            <TextField id='Title' label='Title' fullWidth />
          </Grid>

          <Grid item>
            <TextField id='description' label='Description' fullWidth />
          </Grid>
          <br />
        </Box>

        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        <br />
        <br />
        <Grid item xs={12}>
          <Button variant='outlined' color='primary' fullWidth onClick={exportHtml}>
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default TemplateContainer;
