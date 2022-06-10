import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { ICarBrand } from 'server/interface';

interface IBrand {
    success: boolean;
    data: ICarBrand[],
    message: string
}
interface IProps {
    brands: ICarBrand[]
}

const CompareCar: NextPage<IProps> = ({ brands }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tab, setTab] = useState('brand');
    const [search, setSearch] = useState('');

    console.log({ brands });
    return (
        <div className="container bg-white py-5">
            <pre> {JSON.stringify(brands, null, 4)} </pre>
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
                                onBlur={() => setIsDropdownOpen(false)}
                            />
                            {/* {isDropdownOpen && (
                                <div className="compare-item-search-dropdown">
                                    {tab === "brand" && data?.map((car) => (
                                        <div
                                            className="compare-item-search-dropdown-item"
                                            key={car._id}
                                        >
                                            <div className="compare-item-search-dropdown-item-title mb-3">
                                                Popular Brands
                                            </div>
                                            <div className="compare-item-search-dropdown-item-title">
                                                {car.brand.brandName}
                                            </div>

                                            <ul>
                                                {car.brand.model.map(
                                                    (carModel) => (
                                                        <li key={carModel.modelName} >
                                                            {carModel.modelName}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                    <div className="compare-item-search-dropdown-variant-item">

                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
    try {
        const { data } = await axios.get<IBrand>(
            `http://localhost:3000/api/cars/brand`
        );

        return {
            props: {
                brands: data.data
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
