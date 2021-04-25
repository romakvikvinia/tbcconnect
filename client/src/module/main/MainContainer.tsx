import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { TemplateCard } from '../..//components/template/TemplateItem';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchTemplates } from '../../package/store/actions/template.action';
import { reselectTemplate } from '../../package/store/reselect/template.reselect';
import { TLoader } from '../../components/simple/TLoader';

const MainContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { isLoading, items } = useSelector(reselectTemplate);

  useEffect(() => {
    dispatch(startFetchTemplates());
  }, [dispatch]);
  return (
    <>
      <Grid container alignItems='flex-end'>
        <Grid item xs={12}>
          <TLoader isLoading={isLoading} />
          {!isLoading && items.map((i) => <TemplateCard {...i} key={`${i._id}`} />)}
        </Grid>
      </Grid>
    </>
  );
};
export default MainContainer;
