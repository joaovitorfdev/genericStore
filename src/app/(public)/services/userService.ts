import React from "react";
import { CustomerAddressDTO } from "@/app/types/customer/validators/CustomerDTO";
import { fetchWithAuth } from "./cartService";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/customer`

export const GetUserAddressesAsyc = async (id: string): Promise<CustomerAddressDTO[]> => {
    const res = await fetchWithAuth(`${BASE_URL}/addresses`);
    if (!res.ok) {
        throw new Error("failed to fetch data");
    }

    const data = await res.json();
    return data.map((x: any) => ({
        ...x,
        zipCode: x.zip_code,

    })) as CustomerAddressDTO[];
}

export const AddUserAdressAsync = async (form: CustomerAddressDTO): Promise<CustomerAddressDTO> =>{
    
    const res = await fetchWithAuth(`${BASE_URL}/addresses`,
    {   
        method:"POST",
        body: JSON.stringify({
            "zip_code": form.zipCode.replace("-",""),
            ...form

        })    
    });

    if (!res.ok) {
        throw new Error("failed to fetch data");
    }

    const data = await res.json();
    return {...data, zipCode: data.zip_code } as CustomerAddressDTO;
}

