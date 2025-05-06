import { CustomerAddressDTO, UserCreateRequest } from "@/app/types/customer/validators/CustomerDTO";
import React from "react";
import { fetchWithAuth } from "./cartService";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/customer`

export const CreateUser = async (form: UserCreateRequest) => {
    console.log('Payload enviado:', JSON.stringify(form));
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};

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