import { type NextPage } from 'next';
import { GuestbookNote } from '@/frontend/components/GuestbookNote';
import { InputGuestbookNoteDataForm } from '@/frontend/components/InputGuestbookNoteDataForm';
import { useGuestbookNotes } from '@/frontend/hooks/note';
import { DeleteGuestbookNoteDialog } from '@/frontend/components/DeleteGuestbookNoteDialog';

const email = 'email@example.com';

const GuestbookPage: NextPage = () => {
	const {
		data: guestbookData,
		loading: isGuestbookDataLoading,
		handleInputDataFormSubmit,
		handleInputDataFormReset,
		handleActionFormSubmit,
		handleDeleteFormSubmit,
		editId,
		deleteId,
	} = useGuestbookNotes();

	return (
		<>
			<main className="my-16">
				<div className="max-w-screen-sm w-full px-8 mx-auto">
					<h1 className="text-5xl my-8 font-bold">
						Guestbook
					</h1>
					<div className="my-16">
						<InputGuestbookNoteDataForm
							defaultValues={{
								email,
							}}
							onSubmit={handleInputDataFormSubmit}
							disabled={isGuestbookDataLoading}
						/>
					</div>
					{!isGuestbookDataLoading && Array.isArray(guestbookData) && (
						<div className="my-16">
							<h2 className="text-3xl my-8 font-bold">
								Notes
							</h2>
							{guestbookData.map((note) => (
								<GuestbookNote
									key={note.id}
									isEditMode={editId === note.id}
									note={note}
									currentEmail={email}
									onActionFormSubmit={handleActionFormSubmit}
									onInputDataFormReset={handleInputDataFormReset}
									onInputDataFormSubmit={handleInputDataFormSubmit}
								/>
							))}
						</div>
					)}
				</div>
			</main>
			<DeleteGuestbookNoteDialog
				deleteId={deleteId}
				handleDeleteFormSubmit={handleDeleteFormSubmit}
				guestbookData={guestbookData}
				isGuestbookDataLoading={isGuestbookDataLoading}
			/>
		</>
	);
};

export default GuestbookPage;
