import { forwardRef, HTMLProps, useId, useRef } from 'react';

export interface TextInputProps extends HTMLProps<HTMLElementTagNameMap['input']> {
}

export const TextInput = forwardRef<HTMLElementTagNameMap['input'], TextInputProps>(({
	className = '',
	id: idProp,
	label,
	...etcProps
}, forwardedRef) => {
	const defaultId = useId();
	const effectiveId = idProp ?? defaultId;

	const defaultRef = useRef<HTMLElementTagNameMap['input']>(null);
	const effectiveRef = forwardedRef ?? defaultRef;

	return (
		<div>
			<label
				htmlFor={effectiveId}
				className="text-sm"
			>
				{label}
			</label>
			<input
				{...etcProps}
				ref={effectiveRef}
				id={effectiveId}
				className={`${className} border rounded overflow-hidden w-full h-12 px-4 bg-transparent block`.trim()}
			/>
		</div>
	);
});

TextInput.displayName = 'TextInput';
