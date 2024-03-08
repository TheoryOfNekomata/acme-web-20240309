import { Note } from '@/models';

export const loadGuestbookNotes = async () => {
	const response = await fetch('http://localhost:3000/api/notes', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		},
	});

	if (response.ok) {
		const data = await response.json();
		return data as Note[];
	}

	throw new Error('Could not load guestbook notes.');
};

export const addGuestbookNote = async (note: Partial<Note>) => {
	const response = await fetch('http://localhost:3000/api/notes', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});

	if (response.ok) {
		const data = await response.json();
		return data as Note;
	}

	throw new Error('Could not add guestbook note.');
};

export const emplaceGuestbookNote = async (note: Partial<Note>) => {
	const response = await fetch(`http://localhost:3000/api/notes/${note.id}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});

	if (response.ok) {
		const data = await response.json();
		return data as Note;
	}

	throw new Error('Could not add guestbook note.');
};

export const deleteGuestbookNote = async (note: Partial<Note>) => {
	const response = await fetch(`http://localhost:3000/api/notes/${note.id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		return;
	}

	throw new Error('Could not add guestbook note.');
};
