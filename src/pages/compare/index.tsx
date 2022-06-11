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
        const isExited = selectedData.find(
            (carItem) => carItem._id === car._id
        );
        if (isExited) {
            alert('Already Selected!');
        } else {
            setSelectedData((prev) => [...prev, car]);
        }
    };

    const compareHandler = () => {
        const minimumSelected = selectedData.length > 1 ? true : false;
        if (!minimumSelected) {
            alert('At least two cars need to compare');
        } else {
            console.log({ yes: 'oK' });
        }
    };
    const isDisable = selectedData.length > 1 ? true : false;
    console.log({ isDisable });
    return (
        <div className="container bg-white py-5">
            <div className="row justify-content-center pb-5">
                <CompareItem
                    brands={brands}
                    selectedData={selectedData}
                    selectedDataHandler={selectedDataHandler}
                />
                <CompareItem
                    brands={brands}
                    selectedData={selectedData}
                    selectedDataHandler={selectedDataHandler}
                />
                <CompareItem
                    brands={brands}
                    selectedData={selectedData}
                    selectedDataHandler={selectedDataHandler}
                />
            </div>
            <div className="text-center">
                <button className="button" onClick={compareHandler}>
                    Compare
                </button>
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
