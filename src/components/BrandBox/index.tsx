import { NextPage } from 'next';
import { Fragment } from 'react';
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
                <Fragment key={brand._id}>
                    <div className="compare-item-search-dropdown-item-title">
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
                </Fragment>
            ))}
        </div>
    );
};

export default BrandBox;
