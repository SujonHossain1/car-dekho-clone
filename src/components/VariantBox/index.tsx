import { NextPage } from 'next';
import { Fragment } from 'react';
import { ICar } from 'server/interface';

interface IProps {
    variants: ICar[];
    variantItemHandler: (variantCar: ICar) => void;
}

const VariantBox: NextPage<IProps> = ({ variants, variantItemHandler }) => {
    return (
        <>
            {variants.length > 0 &&
                variants.map((variantCar, index) => (
                    <Fragment key={variantCar._id + `${index}`}>
                        {variantCar.variant && (
                            <div
                                className="compare-item-search-dropdown-variant-item"
                                onClick={() => variantItemHandler(variantCar)}
                            >
                                {variantCar.variant?.variantName} (
                                {variantCar?.fuelType}) ₹ {variantCar?.price}
                            </div>
                        )}
                    </Fragment>
                ))}
        </>
    );
};

export default VariantBox;
