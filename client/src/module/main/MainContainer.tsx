import React from 'react';
import { Grid } from '@material-ui/core';
import { TemplateCard } from '../..//components/template/TemplateItem';

const MainContainer: React.FC<{}> = () => {
  return (
    <>
      <Grid container alignItems='flex-end'>
        <Grid item xs={12}>
          <TemplateCard />
        </Grid>
      </Grid>
    </>
  );
};
export default MainContainer;
