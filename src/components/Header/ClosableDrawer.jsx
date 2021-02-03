import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddCircle from '@material-ui/icons/AddCircle';
import MailIcon from '@material-ui/icons/Mail';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { TextInput } from '../UIkit';
import { useDispatch } from 'react-redux';
import {push} from 'connected-react-router'
import { signOut } from '../../reducks/users/operations';
import { db } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolber: theme.mixins.toolber,
  drawerPaper: {
    width: 256
  },
  serchField: {
    alignItem: 'center',
    display: 'flex',
    marginLeft: 32
  }
}))
const ClosableDrawer = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {container} = props;

  const [keyword, setKeyword] = useState();

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value);
  }, [setKeyword])

  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.close(event);
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: '全て', id: 'all', value: '/'},
    {func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male'},
    {func: selectMenu, label: '全て', id: 'female', value: '/?gender=female'},
  ])

  const menus = [
    {func: selectMenu, label: '商品登録', icon: <AddCircle/>, id: 'register', value: '/product/edit'},
    {func: selectMenu, label: '注文履歴', icon: <AddCircle/>, id: 'history', value: '/order/history'},
    {func: selectMenu, label: 'プロフィール', icon: <AddCircle/>, id: 'profile', value: '/user/mypage'},
  ]

  useEffect(() => {
    db.collection('categories').get()
    .then((snapshots) => {
      const list = []
      snapshots.forEach(snapshot => {
        const category = snapshot.data()
        list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}` },)
      }); 
      console.log(list)
      setFilters(prevState => [...prevState, ...list])

    })
  }, [])

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(e) => props.close(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
          <div onClose={(e) => props.close(e)} onKeyDown={(e) => props.close(e)}>
            <div className={classes.serchField}>
              <TextInput
                fullWidth={false} label={'キーワードを入力'} multiline={false}
                onChange={inputKeyword} required={false} rows={1} value={keyword} type={'text'}
              />
              <IconButton>
                <SearchIcon/>
              </IconButton>
            </div>
            <Divider/>
            <List>
              {menus.map(menu => (
                <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText primary={menu.label}/>
                </ListItem>
              ))}
              <ListItem button key='logout' onClick={() => dispatch(signOut())}>
                <ListItemIcon>
                  <ExitToAppIcon/>
                </ListItemIcon>
                <ListItemText primary={'Logout'}/>
              </ListItem>
            </List>
            <Divider/>
            <List>
              {filters.map(filter => (
                <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                  <ListItemText primary={filter.label}/>
                </ListItem>
              ))}
            </List>
          </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer