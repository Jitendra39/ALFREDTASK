import React from 'react'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast';
function MainRoute() {
  return (
    <>
      <Toaster/>
    <Outlet/>
    </>
  )
}

export default MainRoute
