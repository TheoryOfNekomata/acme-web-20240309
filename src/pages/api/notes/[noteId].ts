import { NextApiHandler } from 'next';
import * as Note from '@/backend/note';
import { constants } from 'node:http2';

const noteApiHandler: NextApiHandler = async (req, res) => {
	switch (req.method?.toUpperCase()) {
		case 'GET': {
			const note = await Note.getSingleNote({id: req.query.noteId as string});
			if (note) {
				res.json(note);
				return;
			}
			res.status(constants.HTTP_STATUS_NOT_FOUND).send('');
			return;
		}
		case 'PUT': {
			const [note, emplaceOptions] = await Note.emplaceNote(req.body);
			if (emplaceOptions.isNew) {
				res.status(constants.HTTP_STATUS_CREATED).json(note);
				return;
			}
			res.json(note);
			return;
		}
		case 'DELETE': {
			const noteToDelete = await Note.deleteNote({id: req.query.noteId as string});
			if (noteToDelete) {
				res.status(constants.HTTP_STATUS_NO_CONTENT).send('');
				return;
			}
			res.status(constants.HTTP_STATUS_NOT_FOUND).send('');
			return;
		}
		default:
			break;
	}

	res.writeHead(constants.HTTP_STATUS_METHOD_NOT_ALLOWED, {
		Allow: 'GET, PUT, DELETE',
	});
};

export default noteApiHandler;
