import axios, { type AxiosResponse } from 'axios';
import { type Note, type NoteTag } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteResponse {
  note: Note;
}

export interface DeleteNoteResponse {
  note: Note;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('', {
    params,
  });
  return response.data;
};

export const createNote = async (
  data: CreateNoteParams
): Promise<CreateNoteResponse> => {
  const response: AxiosResponse<CreateNoteResponse> = await axiosInstance.post('', data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response: AxiosResponse<DeleteNoteResponse> = await axiosInstance.delete(`/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.get(`/${id}`);
  return response.data;
};
