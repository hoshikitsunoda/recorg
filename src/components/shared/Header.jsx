import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  Box,
  Menu,
  MenuItem,
  List,
  ListItem,
  Avatar,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import { useAuth } from '../../hooks'
import Logo from '../../images/discorg.png'
import { MultiColorBorder } from '../shared/Border'
import AvatarPlaceholder from '../../images/avatar-placeholder.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
  logo: {
    width: 100,
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 32,

    '& a': {
      textDecoration: 'none',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  avatar: {
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(0.5),
    width: 32,
    height: 32,
  },
}))

const Header = ({ title }) => {
  const { user } = useAuth()

  const { signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const classes = useStyles()

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { email, uid } = user || {}

  return (
    <AppBar position="static" color="transparent" className={classes.root}>
      <Toolbar>
        {uid && (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width={1}
            >
              <Box display="flex" alignItems="center" p={2}>
                {title === 'dashboard' && (
                  <img src={Logo} alt="discorg logo" className={classes.logo} />
                )}
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.nav}
                >
                  <Link to={`/dashboard`}>
                    <ListItem button>Dashboard</ListItem>
                  </Link>
                  <Link to="/explore">
                    <ListItem button>Explore</ListItem>
                  </Link>
                  <ListItem onClick={signOut} button>
                    Logout
                  </ListItem>
                </List>
              </Box>
              <Box display="flex" alignItems="center">
                {!!user && title === 'dashboard' && (
                  <>
                    <Box>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="primary"
                        onClick={handleClick}
                      >
                        <Avatar
                          alt="avatar"
                          src={AvatarPlaceholder}
                          className={clsx(classes.avatar)}
                        />
                      </IconButton>
                    </Box>
                    <Typography variant="body1">{email}</Typography>
                  </>
                )}
              </Box>
            </Box>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={signOut}>Log Out</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
      <MultiColorBorder />
    </AppBar>
  )
}

export default Header
