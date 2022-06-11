import { NextPage } from 'next';
import { ICar } from 'server/interface';

interface IProps {
    variants: ICar[];
    variantItemHandler: (variantCar: ICar) => void;
}

const VariantBox: NextPage<IProps> = ({ variants, variantItemHandler }) => {
    return (
        <>
            {variants.map((variantCar) => (
                <div
                    className="compare-item-search-dropdown-variant-item"
                    key={variantCar._id}
                    onClick={() => variantItemHandler(variantCar)}
                >
                    {variantCar.variant.variantName} ({variantCar.fuelType}) ₹{' '}
                    {variantCar.price}
                </div>
            ))}
        </>
    );
};

export default VariantBox;
