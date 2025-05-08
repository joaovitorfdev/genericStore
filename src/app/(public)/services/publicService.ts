import { UserCreateRequest } from "@/app/types/customer/validators/CustomerDTO";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/public`

export const CreateUser = async (form: UserCreateRequest) => {
    console.log('Payload enviado:', JSON.stringify(form));
    const response = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
};

