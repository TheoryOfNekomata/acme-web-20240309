import { FC, FormEventHandler } from 'react';
import { Note } from '@/models';
import { ActionButton } from '@/frontend/components/ActionButton';
import { InputGuestbookNoteDataForm } from '@/frontend/components/InputGuestbookNoteDataForm';
import { GuestbookNoteContent } from '@/frontend/components/GuestbookNoteContent';

export interface GuestbookNoteProps {
	note: Note;
	isEditMode?: boolean;
	onInputDataFormSubmit?: FormEventHandler<HTMLElementTagNameMap['form']>;
	onInputDataFormReset?: FormEventHandler<HTMLElementTagNameMap['form']>;
	onActionFormSubmit?: FormEventHandler<HTMLElementTagNameMap['form']>;
	disabled?: boolean;
	currentEmail?: string;
}

export const GuestbookNote: FC<GuestbookNoteProps> = ({
	note,
	isEditMode,
	onInputDataFormSubmit,
	onInputDataFormReset,
	onActionFormSubmit,
	disabled,
	currentEmail,
}) => {
	const canEdit = note.email === currentEmail;
	const canDelete = canEdit;

	return (
		<article
			id={`note-${note.id}`}
			className="my-8 rounded overflow-hidden bg-white/10 p-4"
		>
			{canEdit && isEditMode && (
				<InputGuestbookNoteDataForm
					defaultValues={note}
					onSubmit={onInputDataFormSubmit}
					onReset={onInputDataFormReset}
					disabled={disabled}
					resetButtonLabel="Cancel"
				/>
			)}
			{!isEditMode && (
				<GuestbookNoteContent
					note={note}
				/>
			)}
			{canEdit && !isEditMode && (
				<footer className="mt-8">
					<div className="-mx-4 -mb-4 border-t border-t-white/10">
						<form
							aria-label="Guestbook Note Action Form"
							onSubmit={onActionFormSubmit}
						>
							<input type="hidden" name="id" value={note.id}/>
							<div className="flex">
								<div className="w-0 flex-auto">
									<ActionButton
										name="action"
										value="edit"
										type="submit"
									>
										Edit
									</ActionButton>
								</div>
								{canDelete && (
									<div className="w-0 flex-auto">
										<ActionButton
											name="action"
											value="delete"
											type="submit"
										>
											Delete
										</ActionButton>
									</div>
								)}
							</div>
						</form>
					</div>
				</footer>
			)}
		</article>
	);
};
