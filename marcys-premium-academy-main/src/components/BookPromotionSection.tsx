import { useEffect,useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const BookPromotion = ()=>{

const [book,setBook] = useState<any>(null);

useEffect(()=>{

axios.get(`${API}/api/book`)
.then(res=>setBook(res.data))

},[]);

if(!book) return null;

return(

<section className="py-20">

<div className="container-premium grid lg:grid-cols-2 gap-12 items-center">

{/* IMAGE */}
<motion.div
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.8}}
>

<img
src={book.image}
className="w-full rounded-2xl shadow-xl"
/>

</motion.div>

{/* CONTENT */}
<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.8}}
>

<h2 className="text-4xl font-bold mb-4 text-gold">
{book.title}
</h2>

<p className="mb-6 text-muted-foreground text-justify">
{book.description}
</p>

<a
href={book.amazonLink}
target="_blank"
>

<button className="group flex items-center gap-2 bg-gold px-6 py-3 rounded-lg">

Book Now

<ArrowRight
size={24}
className="transition-transform group-hover:translate-x-2"
/>

</button>

</a>

</motion.div>

</div>

</section>

);

};

export default BookPromotion;