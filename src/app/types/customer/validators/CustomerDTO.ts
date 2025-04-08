interface Customer {
  document: string;
  id: string;
  created_at: string;
  disabled_at: string | null;
}

export interface UserDTO {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  id: string;
  customer: Customer;
  groups: any[]; // Dependendo da estrutura real dos grupos, você pode definir uma interface mais específica
  created_at: string;
}

