import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import QueryProvider from '@/app/providers/QueryProvider';
import { NoteTag } from '@/types/note';

type Props = {
    params: Promise<{ slug: string[] }>
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === 'All' ? undefined : slug[0] as NoteTag;

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes tag = {tag} />
      </HydrationBoundary>
    </QueryProvider>
  );
}