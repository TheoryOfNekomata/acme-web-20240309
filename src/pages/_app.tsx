import '@/frontend/styles/globals.css';
import type { AppProps } from "next/app";
import { FC } from 'react';

const App: FC<AppProps> = ({Component, pageProps}) => (
	<Component {...pageProps} />
);

export default App;
