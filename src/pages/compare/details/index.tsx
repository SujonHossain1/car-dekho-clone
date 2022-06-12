import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { ICar } from 'server/interface';

interface ICars {
    success: boolean;
    data: ICar[];
    message: string;
}

interface IProps {
    status: boolean;
    data: ICar[];
    message: string;
}

const CompareDetailsPage: NextPage<IProps> = ({ data }) => {
    const router = useRouter();
    console.log({ query: router.query });
    console.log({ data });
    return (
        <div className="container">
            <div className=" p-3 bg-white mt-5">
                <h4>
                    {data.map((car, index) => (
                        <Fragment key={car._id}>
                            {car.brand.brandName} {car.model.modelName}{' '}
                            {index < data.length - 1 && ' Vs '}
                        </Fragment>
                    ))}
                </h4>
                <p></p>
                <pre> {JSON.stringify(data, null, 4)} </pre>
            </div>
        </div>
    );
};
export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
    const { query } = ctx;

    try {
        const { data } = await axios.post<ICars>('/api/cars/select-car', {
            variant: query.variant,
        });
        return {
            props: { ...data },
        };
    } catch (error: any) {
        const data = error?.response?.data;
        return {
            props: { ...data },
        };
    }
};
export default CompareDetailsPage;
