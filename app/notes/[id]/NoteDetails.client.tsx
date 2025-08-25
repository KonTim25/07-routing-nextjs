"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({id}: NoteDetailsClientProps) {

    const { data: note, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id, 
        refetchOnMount: false,
    });

  if (isLoading) return <Loader />;
  if (isError || !note) return <ErrorMessage message="Error loading note details." />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}