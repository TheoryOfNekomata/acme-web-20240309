import { GuestbookNoteContent } from '@/frontend/components/GuestbookNoteContent';
import { ActionButton } from '@/frontend/components/ActionButton';
import { Note } from '@/models';
import { FC, FormEventHandler } from 'react';

export interface DeleteGuestbookNoteDialogContentProps {
	guestbookData?: Note[];
	deleteId?: Note['id'];
	isGuestbookDataLoading?: boolean;
	handleDeleteFormSubmit?: FormEventHandler<HTMLElementTagNameMap['form']>;
}

export const DeleteGuestbookNoteDialog: FC<DeleteGuestbookNoteDialogContentProps> = ({
	guestbookData,
	isGuestbookDataLoading,
	deleteId,
	handleDeleteFormSubmit,
}) => {
	const isOpen = typeof deleteId !== 'undefined' && !isGuestbookDataLoading && Array.isArray(guestbookData);

	return (
		<dialog
			className="w-full h-full fixed top-0 left-0 bg-black/50 overscroll-none"
			open={isOpen}
		>
			<div className="my-8 sm:my-16 mx-auto max-w-screen-sm px-8">
				<div className="bg-black text-white shadow rounded overflow-hidden border border-white/20">
					<div className="my-8 sm:my-16">
						<div className="px-4 sm:px-8">
							<header>Are you sure you want to delete this note?</header>
							<div className="mt-8 rounded overflow-hidden bg-white/10 p-4">
								<GuestbookNoteContent
									note={guestbookData?.find((n) => n.id === deleteId)}
								/>
							</div>
							<footer className="mt-8">
								<form
									aria-label="Delete Guestbook Note Form"
									onSubmit={handleDeleteFormSubmit}
								>
									<input type="hidden" name="id" value={deleteId}/>
									<div className="flex justify-end gap-4">
										<div>
											<ActionButton
												type="submit"
												name="delete"
												value="no"
												variant="filled"
												className="w-32"
											>
												No
											</ActionButton>
										</div>
										<div>
											<ActionButton
												type="submit"
												name="delete"
												value="yes"
												className="w-32"
												variant="outline"
											>
												Yes
											</ActionButton>
										</div>
									</div>
								</form>
							</footer>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	);
};
