import { Button } from "@material-tailwind/react"
export default function Advertisement(){
    return(
        <>
     <div className="flex  flex-col justify-center items-center md:flex-row md:justify-between w-[350px] md:w-[750px] rounded-2xl bg-cyan-400 - blue-800  px-3 py-1 md:px-6 md:py-4 shadow-sm">

       <div className="flex flex-col text-white roboto-bold ">
        <h1 className="text-2xl md:text-xl">open for Advertisement</h1>
        <p className="tet-xl md:text-xl roboto-medium-italic"> contact us for more information.</p>
       </div>

       <div className="mt-2 flex justify-center items-center">
       <Button color="yellow" className="roboto-bold px-16 rounded-2xl">Contact us</Button>
       </div>

        </div>
        </>
    )
}