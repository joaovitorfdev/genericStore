


export default function NavBar(){
    return (
         <nav className="bg-white  w-full text-black p-4 flex items-center h-28">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-4" />

            <div className="flex-1 flex justify-center space-x-20 permanent-marker">
                <a href="#" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">HOME</a>
                <a href="/shop" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">SHOP</a>
                <a href="#" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">CONTACTS</a>
                <a href="#" className="hover:text-gray-600 font-extrabold transition-transform duration-200 ease-in-out hover:scale-105">ABOUT</a>
            </div>
        </nav>
    );
}