import { useRouter } from 'next/router';
import { FormEventHandler, useCallback, useEffect, useState } from 'react';
import { Note } from '@/models';
import * as NoteService from '@/frontend/services/note';

export const useGuestbookNotes = () => {
	const router = useRouter();
	const [data, setData] = useState<Note[]>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error>();

	const refetch = useCallback(() => {
		NoteService.loadGuestbookNotes().then(
			(loadedData) => {
				setData(loadedData);
				setLoading(false);
			},
			(err) => {
				setError(err);
				setLoading(false);
			},
		);
	}, []);

	const handleInputDataFormSubmit: FormEventHandler<HTMLElementTagNameMap['form']> = async (e) => {
		e.preventDefault();
		const {currentTarget: form} = e;
		const formData = new FormData(form);
		const values = Object.fromEntries(formData.entries());

		if (!values.id) {
			const newNote = await NoteService.addGuestbookNote(values);
			setData((oldData = []) => [
				newNote,
				...oldData,
			]);

			form.reset();
			return;
		}

		const {editId: _, ...etcQuery} = router.query;
		const newNote = await NoteService.emplaceGuestbookNote(values);
		setData((oldData = []) => oldData.map((d) => (
			d.id === values.id
				? newNote
				: d
		)));
		await router.push({query: etcQuery}, undefined, {shallow: true});
	};

	const handleInputDataFormReset: FormEventHandler<HTMLElementTagNameMap['form']> = async (e) => {
		e.preventDefault();
		router.back();
	};

	const handleDeleteFormSubmit: FormEventHandler<HTMLElementTagNameMap['form']> = async (e) => {
		e.preventDefault();
		const {currentTarget: form, nativeEvent} = e;
		const {submitter} = nativeEvent as unknown as { submitter: HTMLButtonElement };
		const formData = new FormData(form);
		const values = {
			...Object.fromEntries(formData.entries()),
			[submitter.name]: submitter.value,
		};

		if (values.delete === 'yes') {
			await NoteService.deleteGuestbookNote(values);
			setData((oldData = []) => oldData.filter((d) => !(
				d.id === values.id
			)));
		}

		router.back();
		// const { deleteId: _, ...etcQuery  } = router.query;
		// await router.push({ query: etcQuery }, undefined, { shallow: true });
	};

	const handleActionFormSubmit: FormEventHandler<HTMLElementTagNameMap['form']> = async (e) => {
		e.preventDefault();
		const {currentTarget: form, nativeEvent} = e;
		const {submitter} = nativeEvent as unknown as { submitter: HTMLButtonElement };
		const formData = new FormData(form);
		const values = {
			...Object.fromEntries(formData.entries()),
			[submitter.name]: submitter.value,
		};

		switch (values.action) {
			case 'edit':
				return router.push({
					query: {
						...router.query,
						editId: values.id as string,
					},
				}, undefined, {shallow: true});
			case 'delete':
				return router.push({
					query: {
						...router.query,
						deleteId: values.id as string,
					},
				}, undefined, {shallow: true});
			default:
				break;
		}
	};

	useEffect(() => {
		setError(undefined);
		setLoading(true);
		refetch();
	}, [refetch]);

	return {
		data,
		loading,
		error,
		refetch,
		handleInputDataFormSubmit,
		handleInputDataFormReset,
		handleActionFormSubmit,
		handleDeleteFormSubmit,
		editId: router.query.editId as string | undefined,
		deleteId: router.query.deleteId as string | undefined,
	};
};
