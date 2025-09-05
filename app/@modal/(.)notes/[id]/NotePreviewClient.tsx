"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';
import { useRouter, useParams } from 'next/navigation';


export default function NotePreviewClient() {
    const router = useRouter();
    const close = () => router.back();
    const { id } = useParams<{ id: string }>();
    
    const { data: note, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id, 
        refetchOnMount: false,
    });

  if (isLoading) return <Loader />;
  if (isError || !note) return <ErrorMessage message="Error loading note details." />;

    return (
        <Modal onClose={close}>
            
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    
                    <p className={css.content}>{note.content}</p>
                    <span className={css.tag}>{note.tag}</span>
                    <button className={css.backBtn} onClick={close}>Close</button>
                    <p className={css.date}>{note.createdAt}</p>
                </div>
            </div>
        </Modal>
    );
};