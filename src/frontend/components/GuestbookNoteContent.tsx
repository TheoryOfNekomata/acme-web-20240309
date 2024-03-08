import { Note } from '@/models';
import { FC } from 'react';
import Markdown from 'react-markdown';

export interface GuestbookNoteContentProps {
	note?: Note;
}

export const GuestbookNoteContent: FC<GuestbookNoteContentProps> = ({
	note,
}) => {
	if (typeof note === 'undefined') {
		return null;
	}

	const createdAt = new Date(note.createdAt);
	const mm = (createdAt.getMonth() + 1).toString().padStart(2, '0');
	const dd = createdAt.getDate().toString().padStart(2, '0');
	const hrs24 = createdAt.getHours();
	const hrs12 = hrs24 % 12 === 0 ? 12 : hrs24 % 12;
	const hrs = hrs12.toString();
	const mins = createdAt.getMinutes().toString().padStart(2, '0');
	const amPm = hrs24 >= 12 ? 'PM' : 'AM';
	const createdAtDisplay = `${mm}/${dd} ${hrs}:${mins} ${amPm}`;

	return (
		<>
			<header className="mb-8">
				<dl className="flex flex-wrap gap-x-4 items-center">
					<div className="flex-auto font-bold order-2 w-full sm:w-auto sm:order-1">
						<dt className="sr-only">Email</dt>
						<dd>{note.email}</dd>
					</div>
					<div className="text-sm order-1">
						<dt className="sr-only">Created At</dt>
						<dd>
							<time
								dateTime={createdAt.toISOString()}
								title={createdAt.toISOString()}
							>
								{createdAtDisplay}
							</time>
						</dd>
					</div>
					<div className="w-full text-xl font-bold order-2 sm:order-1">
						<dt className="sr-only">Subject</dt>
						<dd>{note.subject}</dd>
					</div>
				</dl>
			</header>
			<div className="prose dark:prose-invert">
				<Markdown
					components={{
						h1: 'h3',
						h2: 'h4',
						h3: 'h5',
						h4: 'h6',
						h5: 'p',
						h6: 'p',
					}}
				>
					{note.message}
				</Markdown>
			</div>
		</>
	);
};
