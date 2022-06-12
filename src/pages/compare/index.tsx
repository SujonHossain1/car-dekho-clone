import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IBrandItem, ICar } from 'server/interface';
import CompareItem from 'src/components/CompareItem';

interface IBrands {
    success: boolean;
    data: IBrandItem[];
    message: string;
}
interface IProps {
    brands: IBrandItem[];
}

const ComparePage: NextPage<IProps> = ({ brands }) => {
    const router = useRouter();
    const [selectedAllData, setSelectedAllData] = useState<ICar[]>([]);

    const [selectedData1, setSelectedData1] = useState<ICar>({} as ICar);
    const [selectedData2, setSelectedData2] = useState<ICar>({} as ICar);
    const [selectedData3, setSelectedData3] = useState<ICar>({} as ICar);

    useEffect(() => {
        const data: ICar[] = [selectedData1, selectedData2, selectedData3];
        setSelectedAllData(data);
        return () => {
            setSelectedAllData([]);
        };
    }, [selectedData1, selectedData2, selectedData3]);

    const compareHandler = () => {
        const isHasDataArray = selectedAllData.filter((item) => item._id);
        const minimumSelected = isHasDataArray.length > 1 ? true : false;
        if (!minimumSelected) {
            alert('At least two cars need to compare');
        } else {
            const variant1 = selectedData1.variant?.variantName;
            const variant2 = selectedData2.variant?.variantName;
            const variant3 = selectedData3.variant?.variantName;

            console.log({ variant1, variant2, variant3 });
            router.push(
                `/compare/details?variant=${variant1}&variant=${variant2}${
                    variant3 ? `&variant=${variant3}` : ''
                }`
            );
        }
    };

    return (
        <div className="container bg-white py-5">
            <div className="row justify-content-center pb-5">
                <CompareItem
                    brands={brands}
                    selectedData={selectedAllData}
                    setSelectedData={setSelectedData1}
                />
                <CompareItem
                    brands={brands}
                    selectedData={selectedAllData}
                    setSelectedData={setSelectedData2}
                />
                <CompareItem
                    brands={brands}
                    selectedData={selectedAllData}
                    setSelectedData={setSelectedData3}
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

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
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

export default ComparePage;
