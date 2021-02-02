import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    'button':{
        backgroundColor: theme.palette.grey["300"],
        fontSize: 16,
        height: 48,
        marginButton: 16,
        width: 256
    }
  }));


const GrayButton = (props) => {
    console.log('primary')
    console.log(props)
    const classes = useStyles()
    return(
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
        {props.label}
      </Button>
    )
}

export default GrayButton