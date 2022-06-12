import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

interface IProps {}

const CompareDetailsPage: NextPage<IProps> = () => {
    const router = useRouter();
    console.log({ query: router.query });
    return <div>This is a Details page</div>;
};
export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
    const { query } = ctx;
    console.log({ query });
    try {
        return {
            props: {
                brands: [],
            },
        };
    } catch (error: any) {
        const data = error?.response?.data;
        return {
            props: {
                ...data,
            },
        };
    }
};
export default CompareDetailsPage;
