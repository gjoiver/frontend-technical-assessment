const BASE_URL = "https://jsonplaceholder.typicode.com";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export async function getUser(userId: number): Promise<User> {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error(`Invalid user id: ${userId}`);
  }

  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as User;
  } catch (cause) {
    throw new Error(`Failed to fetch user ${userId}`, { cause });
  }
}
