import axios from 'axios';
import { NextPage } from 'next';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { IBrandItem, ICar, ICarModel } from 'server/interface';
import Card from '../Card';
import SelectPlaceholder from '../Placeholder';
import SelectDropdown from '../SelectDropdown';

interface IVariants {
    success: boolean;
    data: ICar[];
    message: string;
}
interface IProps {
    brands: IBrandItem[];
    selectedData: ICar[];
    setSelectedData: (car: ICar) => void;
}

type ITab = 'brand' | 'variant';

const CompareItem: NextPage<IProps> = ({
    brands,
    selectedData,
    setSelectedData,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tab, setTab] = useState<ITab>('brand');
    const [search, setSearch] = useState('');

    const [selectedCar, setSelectedCar] = useState<ICar>(
        {} as ICar
    ); /** when click to variant then save data this is state */

    const [variants, setVariants] = useState<ICar[]>([]);
    const [showCard, setShowCard] = useState(false);

    const modelItemHandler = async (model: ICarModel) => {
        setIsDropdownOpen(false);
        const { data } = await axios.get<IVariants>(
            `/api/cars/variant/${model._id}`
        );
        const variantData = data.data;
        const removeDuplicateData: ICar[] = [
            ...selectedData.filter((obj1) =>
                variantData.every((obj2) => obj1._id !== obj2._id)
            ),
            ...variantData.filter((obj2) =>
                selectedData.every((obj1) => obj2._id !== obj1._id)
            ),
        ];
        setIsDropdownOpen(true);
        setVariants(removeDuplicateData);
        setTab('variant');
    };
    const variantItemHandler = (car: ICar) => {
        setSelectedCar(car);
        setSelectedData(car);
        setIsModalOpen(false);
        setIsDropdownOpen(false);
        setShowCard(true);
    };

    const showCardHandler = (bool: boolean) => {
        setIsModalOpen(true);
        setShowCard(bool);
        setTab('brand');
        setIsDropdownOpen(true);
    };
    return (
        <div className="col-md-3">
            {!showCard && (
                <div className="compare-placeholder">
                    <SelectPlaceholder setIsModalOpen={setIsModalOpen} />
                    {isModalOpen && (
                        <div className="compare-item">
                            <FaTimes
                                className="times"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <ul className="compare-item-title">
                                <li
                                    className={tab === 'brand' ? 'active' : ''}
                                    onClick={() => setTab('brand')}
                                >
                                    Brand/Model
                                </li>
                                <li
                                    className={
                                        tab === 'variant' ? 'active' : ''
                                    }
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
                    )}
                </div>
            )}
            {showCard && (
                <Card
                    car={selectedCar}
                    variants={variants}
                    variantItemHandler={variantItemHandler}
                    showCardHandler={showCardHandler}
                />
            )}
        </div>
    );
};

export default CompareItem;
