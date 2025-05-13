import { ProductDTO } from "../../ProductDTO";
import { CartDTO } from "../CartDTO";

export type UserCreateRequest = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  document?: string;
}

export interface GroupDTO {
  name:string;
  id: string;
}
export interface UserDTO {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  document?: string;
  id: string;
  cart:CartDTO;
  groups:GroupDTO[];
}


export interface CustomerAddressDTO {
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  number: string;
  id?: string;
}
export type CustomerAddressRequest = {
  zipCode: string;
  street: string;
  complement?: string;
  neighborhood: string;
  number: string;
}



