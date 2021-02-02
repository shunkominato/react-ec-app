import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import noImage from '../../assets/img/src/no_image.png'
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { deleteProducts } from '../../reducks/products/operations';

const useStayles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]:{
      margin: 8,
      width: 'calc(50% - 16px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33% - 32px)'
    }
  },
  content:{
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child':{
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: theme.palette.secondary.main,
    fontsize: 16
  }
}))




const ProductCard = (props) => {
  const classes = useStayles()
  const dispatch = useDispatch()
  const price = props.price.toLocaleString()
  const images = (props.images.length > 0) ? props.images : [{path: noImage}]

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        onClick={() => dispatch(push(`/product/${props.id}`))}
      />
      <CardContent className={classes.content}>
        <div>
          <Typography color='textSecondary' compornent='p'>
            {props.name}
          </Typography>
          <Typography className={classes.price} compornent='p'>
            ¥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon></MoreVertIcon>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
          onClick={() => {
            dispatch(push(`/product/edit/${props.id}`))
            handleClose()
          }}

          >
          編集する
          </MenuItem>
          <MenuItem
          onClick={() => {
            dispatch(deleteProducts(props.id))
            handleClose()
          }}
          >
          削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default ProductCard