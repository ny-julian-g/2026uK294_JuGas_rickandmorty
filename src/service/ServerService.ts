import { api } from "./Api";

export interface RickAndMortyChar {
  id: number | string;
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

  getCharacterById: async (id: string | number) => {
    const response = await api.get(`/rickandmorty/${id}`);
    return response.data;
  },

  deleteCharacter: async (id: string | number) => {
    await api.delete(`/rickandmorty/${id}`);
  },
  
  updateCharacterById: async (id: string | number, data: Partial<RickAndMortyChar>) => {
    const response = await api.patch(`/rickandmorty/${id}`, data);
    return response.data;
  },

  createCharacter: async (data: Omit<RickAndMortyChar, "id" | "created">) => {
  const response = await api.post("/rickandmorty", {
    ...data,
    created: new Date().toISOString() // Datum automatisch setzen
  });
  return response.data;
}
};