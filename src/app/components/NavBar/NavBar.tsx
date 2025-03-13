


export default function NavBar(){
    return (
         <nav className="bg-white small-text  w-full  text-black p-4 flex  items-center h-28">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-4" />

            <div className="flex-1 flex justify-center space-x-20  tinos">
                <a href="/" className="hover:text-gray-600 font-extrabold transition-all ease-in-out  duration-300 hover:scale-101">HOME</a>
                <a href="/shop" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">SHOP</a>
                <a href="#" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">CONTACTS</a>
                <a href="#" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">ABOUT</a>
            </div>
        </nav>
    );
}