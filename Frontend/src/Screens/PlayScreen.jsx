import React, { useState } from 'react'
import FlipFrenzy from './FlipFrenzy'
import { useLocation } from 'react-router'
 
import CardSwipe from './CardSwipe';


function PlayScreen() {
  const {state} = useLocation();
 
  
  return (
    <>
    {
      state.gameState.isRapidRecall ? <CardSwipe/> : <FlipFrenzy />
    }
    </>
  )
}

export default PlayScreen