import React, { useCallback, useEffect, useState } from 'react';
import { match } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { TemplateForm } from './TemplateForm';
import { fetchTemplate } from '../../api/templates.api';
import { TLoader } from '../../components/simple/TLoader';
import { ITemplate } from '../../package/store/reducers/template.reducer';

const TemplateContainer: React.FC<{ match: match<{ id: string }> }> = ({
  match: {
    params: { id },
  },
}) => {
  const [{ isLoading, item }, setState] = useState<{
    isLoading: boolean;
    item: ITemplate | null;
  }>({ isLoading: false, item: null });

  /**
   * methods
   */

  const loadItem = useCallback(async () => {
    if (!id) return;
    try {
      //@ts-ignore
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const item = await fetchTemplate(id);
      //@ts-ignore
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        item: {
          //@ts-ignore
          ...item,
          json: JSON.parse(item.json),
        },
      }));
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);
  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <TLoader isLoading={isLoading} />
        {!isLoading && <TemplateForm item={item} />}
      </Grid>
    </>
  );
};
export default TemplateContainer;
