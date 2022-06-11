import { NextPage } from 'next';
import { IBrandItem, ICar, ICarModel } from 'server/interface';
import BrandBox from '../BrandBox';
import VariantBox from '../VariantBox';

interface IProps {
    tab: 'brand' | 'variant';
    brands: IBrandItem[];
    variants: ICar[];
    modelItemHandler: (model: ICarModel) => void;
    variantItemHandler: (variantCar: ICar) => void;
}

const SelectDropdown: NextPage<IProps> = ({
    tab,
    brands,
    variants,
    modelItemHandler,
    variantItemHandler,
}) => {
    return (
        <div className="compare-item-search-dropdown">
            {tab === 'brand' && (
                <BrandBox brands={brands} modelItemHandler={modelItemHandler} />
            )}
            {tab === 'variant' && (
                <VariantBox
                    variants={variants}
                    variantItemHandler={variantItemHandler}
                />
            )}
        </div>
    );
};

export default SelectDropdown;
