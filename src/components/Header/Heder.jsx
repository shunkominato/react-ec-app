import React, { useCallback, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo.png'
import { useDispatch,useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router'
import HeaderMenus from './HeaderMenus';
import { ClosableDrawer } from '.';

const useStyles = makeStyles({
  root: {
    flexGrow:1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444'
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  iconButtons: {
    margin: '0 0 0 auto'
  }
})

const Header = () => {
  const classes = useStyles()
  const selector = useSelector(state => state)
  const isSignedIn = getIsSignedIn(selector)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const handleDrawerTggle = useCallback((event) => {
    if(event.type === 'keydown' && (event.type === 'Tab' || event.type === 'Shift')){
      return;
    }
    console.log(open)
    setOpen(!open)
  }, [setOpen, open])

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.Toolbar}>
          <span onClick={() => dispatch(push('/'))}>EC sample</span>
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerTggle={handleDrawerTggle}/>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} close={handleDrawerTggle}></ClosableDrawer>
    </div>
  )
}

export default Header