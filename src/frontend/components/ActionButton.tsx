import { forwardRef, HTMLProps, useRef } from 'react';

export interface ActionButtonProps extends Omit<HTMLProps<HTMLElementTagNameMap['button']>, 'type'> {
	type?: 'button' | 'reset' | 'submit';
	variant?: 'filled' | 'outline' | 'bare';
}

export const ActionButton = forwardRef<HTMLElementTagNameMap['button'], ActionButtonProps>(({
	className = '',
	type = 'button',
	variant = 'bare',
	...etcProps
}, forwardedRef) => {
	const defaultRef = useRef<HTMLElementTagNameMap['button']>(null);
	const effectiveRef = forwardedRef ?? defaultRef;

	return (
		<button
			{...etcProps}
			type={type}
			ref={effectiveRef}
			className={[
				className,
				variant === 'filled' && 'bg-white text-black',
				variant === 'bare' && 'border-transparent',
				'font-bold border rounded overflow-hidden w-full h-12 px-8 bg-transparent block',
			]
				.filter((s) => Boolean(s))
				.join(' ')
				.trim()
			}
		/>
	);
});

ActionButton.displayName = 'ActionButton';
