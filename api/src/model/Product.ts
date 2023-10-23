import mongoose, { Document, Model, Schema } from 'mongoose';

const { model } = mongoose;

interface IProduct {
    title: string;
    description: string;
    cover: string;
    price: string;
    isAvailable: Boolean;
}

export interface IProductDocument extends IProduct, Document {}

const ProductSchema: Schema<IProductDocument> = new Schema<IProductDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },

    isAvailable: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const ProductModel: Model<IProductDocument> = model<IProductDocument>('Product', ProductSchema);

export default ProductModel;

