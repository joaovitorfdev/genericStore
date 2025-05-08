import { UserCreateRequest } from "@/app/types/customer/validators/CustomerDTO";
import { FreightCalcRequest, ServicesDTO } from "@/app/types/integrations/melhorEnvio/FormsDTO";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/melhorenvio`

export const CalcFreightAsync  = async (form: FreightCalcRequest) => {
    const response = await fetch(`${BASE_URL}/freight`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "to_cep": form.toCep,
            "items":form.items
        }),
    });
    const data: ServicesDTO[] = await response.json();
    return data;
};

