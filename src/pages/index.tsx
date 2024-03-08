import { GetServerSideProps, type NextPage } from 'next';

interface IndexPageProps {
	who?: string;
}

const IndexPage: NextPage = ({
	who = 'World',
}: IndexPageProps) => {
	return (
		<div className="fixed flex w-full h-full justify-center items-center">
			<div className="text-5xl font-bold">
				Hello {who ?? 'World'}!
			</div>
		</div>
	);
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			who: null,
		}
	}
};
