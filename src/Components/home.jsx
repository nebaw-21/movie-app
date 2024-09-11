import NavBar from "./nav-bar"
import CardsList from "./cards-list"
import Footer from "./footer"
import Filter from "./filter"
import Advertisement from "./ad"

export default function Home(){
    return(
        <>
        <NavBar/>
<div>

<div className=" flex justify-between  p-4 md:p-8">
   
<h1 className="roboto-black ml-4  text-2xl">Movies</h1>
        
<Filter/>

</div>

<div className="flex justify-center items-center mb-4">
    <Advertisement className />

</div>

</div>
       {<CardsList/> } 
<Footer />

        </>
    )
}