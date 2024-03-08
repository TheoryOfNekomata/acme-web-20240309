import { type NextApiHandler } from 'next';
import { constants } from 'node:http2';
import * as Note from '@/backend/note';

const noteCollectionApiHandler: NextApiHandler = async (req, res) => {
	switch (req.method?.toUpperCase()) {
		case 'GET': {
			const notes = await Note.getMultipleNotes();
			res.json(notes);
			return;
		}
		case 'POST': {
			const newNote = await Note.createNote(req.body);
			res
				.setHeader('Location', `/api/notes/${newNote.id}`)
				.status(constants.HTTP_STATUS_CREATED)
				.json(newNote);
			return;
		}
		default:
			break;
	}

	res.writeHead(constants.HTTP_STATUS_METHOD_NOT_ALLOWED, {
		Allow: 'GET, POST',
	});
};

export default noteCollectionApiHandler;
