import { NextPage } from 'next';
import { IBrandItem, ICar, ICarModel } from 'server/interface';

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
                <div className="compare-item-search-dropdown-item">
                    <div className="compare-item-search-dropdown-item-title mb-3">
                        Popular Brands
                    </div>
                    {brands?.map((brand) => (
                        <>
                            <div
                                className="compare-item-search-dropdown-item-title"
                                key={brand._id}
                            >
                                {brand.brandName}
                            </div>
                            <ul>
                                {brand.models.map((model) => (
                                    <li
                                        key={model._id}
                                        onClick={() => modelItemHandler(model)}
                                    >
                                        {model.modelName}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ))}
                </div>
            )}
            {tab === 'variant' &&
                variants.map((variantCar) => (
                    <div
                        className="compare-item-search-dropdown-variant-item"
                        key={variantCar._id}
                        onClick={() => variantItemHandler(variantCar)}
                    >
                        {variantCar.variant.variantName} ({variantCar.fuelType})
                        ₹ {variantCar.price}
                    </div>
                ))}
        </div>
    );
};

export default SelectDropdown;
