import { useAuth } from "@/context/auth/AuthContext";
import { useEffect, useState } from "react";
import { CustomerAddressDTO } from "../../ui/modals/AddressModal";
import { GetUserAddressesAsyc } from "../../services/userService";
import AdressCard from "./components/AddressCard";


export default function AddressesArea() {
  const {user} = useAuth()

  if(!user){return;}

  const [userAdresses, setUserAdresses] = useState<CustomerAddressDTO[]>([])

  useEffect(() => {
    GetUserAddressesAsyc(user?.id).then((resp) => {
      setUserAdresses(resp);
    })
  },[user])

  
  return (

   <div>
    <button>
      +
    </button>
     <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3  gap-5 w-full">
      {
        userAdresses.map((address) => (
          <AdressCard key={address.id} address={address}/>
        ))
      }
    </div>
   </div>
  );
}
