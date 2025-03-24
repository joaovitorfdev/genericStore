import React from "react";

export const CreateCustomer = async (form: CreateRequest) => {
    console.log('Payload enviado:', JSON.stringify(form));
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(form),
    // });
};