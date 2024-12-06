import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchProducts as fetchProductsAPI,
    addProduct as addProductAPI,
    editProduct as editProductAPI,
    deleteProduct as deleteProductAPI,
    deleteCommentsByProduct,
} from '../../utils/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const products = await fetchProductsAPI();
    return products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
    const newProduct = await addProductAPI(product);
    return newProduct;
});

export const editProduct = createAsyncThunk('products/editProduct', async (product) => {
    const updatedProduct = await editProductAPI(product);
    return updatedProduct;
});

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId, { dispatch }) => {
        await deleteProductAPI(productId);
        await deleteCommentsByProduct(productId);
        return productId;
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            });
    },
});

export default productsSlice.reducer;