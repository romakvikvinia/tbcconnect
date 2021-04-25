import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { Card, CardActionArea, CardActions, CardContent, Box, Button, Typography } from '@material-ui/core/';

import { ITemplate } from '../../package/store/reducers/template.reducer';
import { history } from '../../helper/history';

import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { reselectUser } from '../../package/store/reselect/user.reselect';
import { startFetchDeleteTemplate } from '../../package/store/actions/template.action';

export const TemplateCard: React.FC<ITemplate> = ({ _id, title, description, body }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(reselectUser);

  const handleRedirectDetail = useCallback(() => {
    if (pathname.includes('/template')) return;
    history.push({
      pathname: `/template/${_id}`,
    });
  }, [_id, pathname]);

  const handleRedirectToEdit = useCallback(() => {
    if (pathname.includes('/template')) return;
    history.push({
      pathname: `/template/${_id}/edit`,
    });
  }, [_id, pathname]);

  const handleDeleteTemplate = useCallback(async () => {
    if (!window.confirm('Are you sure?')) return;
    dispatch(startFetchDeleteTemplate(_id));
  }, [_id, dispatch]);

  return (
    <Card style={{ margin: 5 }}>
      <CardActionArea onClick={handleRedirectDetail}>
        <Box textAlign='center'>
          <ImageOutlinedIcon style={{ fontSize: 200 }} />
        </Box>

        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box component='span' style={{ justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex', flex: 1 }}>
          {!pathname.includes('/template/') && (
            <Button size='small' color='primary' onClick={handleRedirectDetail}>
              Show
            </Button>
          )}
          {isAuthenticated ? (
            <>
              <Button size='small' color='primary' onClick={handleRedirectToEdit}>
                <EditIcon />
              </Button>
              <Button size='small' color='secondary' onClick={handleDeleteTemplate}>
                <DeleteIcon />
              </Button>
            </>
          ) : null}
        </Box>
      </CardActions>
      {pathname.includes('/template/') && <div dangerouslySetInnerHTML={{ __html: body }}></div>}
    </Card>
  );
};
