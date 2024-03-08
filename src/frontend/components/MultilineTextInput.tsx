import { forwardRef, HTMLProps, useId, useRef } from 'react';

export interface MultilineTextInputProps extends HTMLProps<HTMLElementTagNameMap['textarea']> {
}

export const MultilineTextInput = forwardRef<HTMLElementTagNameMap['textarea'], MultilineTextInputProps>(({
	className = '',
	id: idProp,
	label,
	...etcProps
}, forwardedRef) => {
	const defaultId = useId();
	const effectiveId = idProp ?? defaultId;

	const defaultRef = useRef<HTMLElementTagNameMap['textarea']>(null);
	const effectiveRef = forwardedRef ?? defaultRef;

	return (
		<div>
			<label
				htmlFor={effectiveId}
				className="text-sm"
			>
				{label}
			</label>
			<textarea
				{...etcProps}
				ref={effectiveRef}
				id={effectiveId}
				className={`${className} border rounded overflow-hidden w-full min-h-12 resize-y py-3 px-4 bg-transparent block`.trim()}
			/>
		</div>
	);
});

MultilineTextInput.displayName = 'MultilineTextInput';
