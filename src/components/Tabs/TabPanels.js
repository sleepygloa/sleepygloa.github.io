import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: `calc(100vw-100px)`,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding:'10px'
  },
}));

export default function TabPanels({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        { children }
    </div>
  );
}
