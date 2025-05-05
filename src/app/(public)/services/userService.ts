import { UserCreateRequest } from "@/app/types/customer/validators/CustomerDTO";
import React from "react";

export const CreateUser = async (form: UserCreateRequest) => {
    console.log('Payload enviado:', JSON.stringify(form));
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};