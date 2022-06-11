import { NextPage } from 'next';
import { IBrandItem, ICarModel } from 'server/interface';

interface IProps {
    brands: IBrandItem[];
    modelItemHandler: (model: ICarModel) => void;
}

const BrandBox: NextPage<IProps> = ({ brands, modelItemHandler }) => {
    return (
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
    );
};

export default BrandBox;
