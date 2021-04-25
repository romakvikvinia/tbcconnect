import React, { useCallback, useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { fetchTemplate } from '../../api/templates.api';
import { TLoader } from '../../components/simple/TLoader';
import { ITemplate } from '../../package/store/reducers/template.reducer';
import { TemplateCard } from '../../components/template/TemplateItem';

const TemplateDetailContainer: React.FC<{ match: match<{ id: string }> }> = ({
  match: {
    params: { id },
  },
}) => {
  const [{ isLoading, item }, setState] = useState<{
    isLoading: boolean;
    item: ITemplate | null;
  }>({ isLoading: true, item: null });

  /**
   * methods
   */

  const loadItem = useCallback(async () => {
    try {
      const item = await fetchTemplate(id);
      //@ts-ignore
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        item,
      }));
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  return (
    <Grid container alignItems='flex-end'>
      <TLoader isLoading={isLoading} />
      <Grid item xs={12}>
        {item && <TemplateCard {...item} />}
      </Grid>
    </Grid>
  );
};
export default TemplateDetailContainer;
