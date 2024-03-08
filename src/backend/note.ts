import { readFile, writeFile } from 'node:fs/promises';
import { Note } from '@/models';
import { randomUUID } from 'node:crypto';

const NOTES_FILENAME = '.notes.json';
const NOTES_FILE_ENCODING = 'utf-8';

const loadNotes = async () => {
	try {
		const fileContentsBuffer = await readFile(NOTES_FILENAME, {encoding: NOTES_FILE_ENCODING});
		const fileContents = JSON.parse(fileContentsBuffer) as Note[];
		if (Array.isArray(fileContents)) {
			return fileContents.sort((a, b) => b.createdAt - a.createdAt) as Note[];
		}
	} catch {
		// noop
	}

	const blank = [] as Note[];
	await writeFile(NOTES_FILENAME, JSON.stringify(blank), {encoding: NOTES_FILE_ENCODING})
	return blank;
};

const saveNotes = async (noteData: Note[]) => {
	const noteDataSorted = noteData.sort((a, b) => b.createdAt - a.createdAt);
	await writeFile(NOTES_FILENAME, JSON.stringify(noteDataSorted, null, 2), {encoding: NOTES_FILE_ENCODING});
};

export const getMultipleNotes = async () => {
	return loadNotes();
};

export const getSingleNote = async (noteDataFilter: Pick<Note, 'id'>) => {
	const existingNotes = await loadNotes();

	return existingNotes.find((existingNote) => existingNote.id === noteDataFilter.id);
};

export const createNote = async (noteData: Partial<Note>) => {
	const existingNotes = await loadNotes();

	const newNote = {
		...noteData,
		id: noteData.id || randomUUID(),
		createdAt: Date.now(),
	} as Note;

	await saveNotes([
		newNote,
		...existingNotes,
	]);

	return newNote;
};

export const emplaceNote = async (noteData: Partial<Note> & Pick<Note, 'id'>): Promise<[Note, { isNew: boolean }]> => {
	const existingNotes = await loadNotes();

	const noteToReplace = await getSingleNote({id: noteData.id});
	if (!noteToReplace) {
		const newNote = await createNote(noteData);
		return [newNote, {isNew: true}];
	}

	const newNote = {
		...noteToReplace,
		...noteData,
	} as Note;

	await saveNotes(existingNotes.map((existingNote) => (
		existingNote.id === noteData.id
			? newNote
			: existingNote
	)))

	return [newNote, {isNew: false}];
};

export const deleteNote = async (noteDataFilter: Pick<Note, 'id'>) => {
	const existingNotes = await loadNotes();
	const noteToDelete = await getSingleNote(noteDataFilter);

	await saveNotes(existingNotes.filter((note) => !(
		note.id === noteDataFilter.id
	)));

	return noteToDelete;
};
