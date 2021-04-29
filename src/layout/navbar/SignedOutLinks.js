import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import LockOpenIcon from '@material-ui/icons/LockOpen'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 'auto',
  },
});

const SignedOutLinks = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(1)
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction component={Link} to="/register" label="Registrarse" icon={< LockOpenIcon />} />
        <BottomNavigationAction component={Link} to="/login" label="Iniciar Sesión" icon={<MeetingRoomIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default SignedOutLinks
