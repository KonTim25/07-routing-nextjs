import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreviewClient';


export default async function NoteDetails({ params }: { params: Promise<{id: string}> }) {
    const queryClient = new QueryClient();
    const { id } = await params;
    
    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}