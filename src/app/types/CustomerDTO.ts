interface CustomerBase {
    name: string;
    document: string;
    email: string;
    phone: string;
    street: string;
    complement?: string | null;
    neighborhood: string;
    number: string;
    zipCode: string;
  }
type CreateRequest = CustomerBase
