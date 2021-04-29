import React from 'react'
import { useSelector } from 'react-redux'
import SignedOutLinks from './SignedOutLinks'
import SignedInLinks from './SingedInLinks'

const NavBar = () => {
  const { auth } = useSelector((state) => state.firebase);
  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <div>
      {links}
    </div>
  )
}

export default NavBar;
