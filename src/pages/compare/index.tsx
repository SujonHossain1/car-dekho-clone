import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { IBrandItem, ICar } from 'server/interface';
import CompareItem from 'src/components/CompareItem';

interface IBrands {
    success: boolean;
    data: IBrandItem[];
    message: string;
}
interface IVariants {
    success: boolean;
    data: ICar[];
    message: string;
}
interface IProps {
    brands: IBrandItem[];
}

const CompareCar: NextPage<IProps> = ({ brands }) => {
    const [selectedData, setSelectedData] = useState<ICar[]>([]);

    const selectedDataHandler = (car: ICar) => {
        console.log({ car });
    };
    return (
        <div className="container bg-white py-5">
            <div className="row">
                <CompareItem
                    brands={brands}
                    selectedDataHandler={selectedDataHandler}
                />
                <CompareItem
                    brands={brands}
                    selectedDataHandler={selectedDataHandler}
                />
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
    try {
        const { data } = await axios.get<IBrands>(`/api/cars/model/all`);
        return {
            props: {
                brands: data.data,
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

export default CompareCar;
