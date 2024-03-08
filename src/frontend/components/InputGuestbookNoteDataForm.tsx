import { FC, HTMLProps, ReactNode } from 'react';
import { TextInput } from '@/frontend/components/TextInput';
import { MultilineTextInput } from '@/frontend/components/MultilineTextInput';
import { ActionButton } from '@/frontend/components/ActionButton';
import { Note } from '@/models';

export interface InputGuestbookNoteDataFormProps extends HTMLProps<HTMLElementTagNameMap['form']> {
	defaultValues?: Partial<Note>;
	resetButtonLabel?: ReactNode;
}

export const InputGuestbookNoteDataForm: FC<InputGuestbookNoteDataFormProps> = ({
	disabled,
	defaultValues = {},
	resetButtonLabel,
	...etcProps
}) => {
	return (
		<form
			{...etcProps}
			aria-label="Input Guestbook Note Data Form"
			method="post"
		>
			<fieldset
				className="contents"
				disabled={disabled}
			>
				<legend className="sr-only">
					Input Guestbook Note Data
				</legend>
				<div className="flex flex-col gap-4">
					<input
						type="hidden"
						name="id"
						defaultValue={defaultValues?.id}
					/>
					<div>
						<input
							type="hidden"
							name="email"
							defaultValue={defaultValues?.email}
						/>
						Posting as <b>{defaultValues?.email}</b>
					</div>
					<div>
						<TextInput
							name="subject"
							label="Subject"
							required
							defaultValue={defaultValues?.subject}
							autoComplete="off"
						/>
					</div>
					<div>
						<MultilineTextInput
							name="message"
							label="Message"
							required
							defaultValue={defaultValues?.message}
						/>
					</div>
					<div className="mt-4 flex justify-end gap-4">
						{resetButtonLabel && (
							<div>
								<ActionButton
									type="reset"
									variant="bare"
									className="w-32"
								>
									Reset
								</ActionButton>
							</div>
						)}
						<div>
							<ActionButton
								type="submit"
								variant="filled"
								className="w-32"
							>
								Send
							</ActionButton>
						</div>
					</div>
				</div>
			</fieldset>
		</form>
	);
};
