import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { IBrandItem, ICar, ICarModel } from 'server/interface';
import SelectDropdown from 'src/components/SelectDropdown';

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

type ITab = 'brand' | 'variant';

const CompareCar: NextPage<IProps> = ({ brands }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tab, setTab] = useState<ITab>('brand');
    const [search, setSearch] = useState('');
    const [variants, setVariants] = useState<ICar[]>([]);
    const [selectedCars, setSelectedCars] = useState<ICar[]>([]);

    const modelItemHandler = async (model: ICarModel) => {
        console.log({ model: model._id });
        setIsDropdownOpen(false);

        const { data } = await axios.get<IVariants>(
            `/api/cars/variant/${model._id}`
        );
        setIsDropdownOpen(true);
        setVariants(data.data);
        setTab('variant');
    };
    const variantItemHandler = (car: ICar) => {
        console.log({ car });
    };
    return (
        <div className="container bg-white py-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="compare-item">
                        <ul className="compare-item-title">
                            <li
                                className={tab === 'brand' ? 'active' : ''}
                                onClick={() => setTab('brand')}
                            >
                                Brand/Model
                            </li>
                            <li
                                className={tab === 'variant' ? 'active' : ''}
                                onClick={() => setTab('variant')}
                            >
                                Variant
                            </li>
                        </ul>
                        <div className="compare-item-search">
                            <input
                                type="text"
                                className="compare-item-search-input"
                                name=""
                                placeholder={
                                    tab === 'brand'
                                        ? 'Select Brand/Model'
                                        : 'Select Variant'
                                }
                                onChange={(e) =>
                                    setSearch(e.currentTarget.value)
                                }
                                onFocus={() => setIsDropdownOpen(true)}
                                // onBlur={() => setIsDropdownOpen(false)}
                            />
                            {isDropdownOpen && (
                                <SelectDropdown
                                    tab={tab}
                                    brands={brands}
                                    variants={variants}
                                    modelItemHandler={modelItemHandler}
                                    variantItemHandler={variantItemHandler}
                                />
                            )}
                        </div>
                    </div>
                </div>
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
