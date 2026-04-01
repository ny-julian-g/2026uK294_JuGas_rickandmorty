import { api } from "./Api";

export interface RickAndMortyChar {
  id: number;
  name: string;
  image: string;
  created: string;
}

export const ServerService = {
  login: async (credentials: any) => {
    const response = await api.post("/login", credentials);
    return response.data;
  },

  getCharacters: async (): Promise<RickAndMortyChar[]> => {
    const response = await api.get("/rickandmorty");
    return response.data;
  },

  getCharacterById: async (id: string) => {
    const response = await api.get(`/rickandmorty/${id}`);
    return response.data;
  },
};