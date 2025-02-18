import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import Navbar from "./Components/Navbar";
import LandingPage from "./LandingPage/page";
import { useNavigate } from "react-router";

export default function App() {
  const Navigate = useNavigate();
  const {user} = useUser();
  if(user?.primaryEmailAddress?.id){
    Navigate(`/${user.primaryEmailAddress.id}/Dashboard`);
  }
  return (
<div className="bg-gray-100 min-h-screen">
 <LandingPage/>
</div>
  );
}