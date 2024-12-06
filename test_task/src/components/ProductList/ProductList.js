import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddEditModal from '../Modals/AddEditModal';
import DeleteModal from '../Modals/DeleteModal';
import { fetchProducts, deleteProduct } from '../../redux/slices/productsSlice';
import './ProductList.css';

const ProductList = ({ onSelectProduct }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null);
    const [sortOption, setSortOption] = useState('alphabetical');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleOpenAddEditModal = (product = null) => {
        setEditingProduct(product);
        setIsAddEditModalOpen(true);
    };

    const handleOpenDeleteModal = (productId) => {
        setDeletingProductId(productId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(deletingProductId));
        setIsDeleteModalOpen(false);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'count') {
            return b.count - a.count;
        }
        return 0;
    });

    return (
        <div className="product-list">
            <h1>Product List</h1>
            <button onClick={() => handleOpenAddEditModal()}>Add Product</button>

            <div className="sort-options">
                <label htmlFor="sort">Sort By: </label>
                <select id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="count">Count</option>
                </select>
            </div>

            {sortedProducts.length === 0 ? (
                <p>Nothing here. Try to add something.</p>
            ) : (
                <ul>
                    {sortedProducts.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Count: {product.count}</p>
                            <div className="actions">
                                <button onClick={() => onSelectProduct(product.id)}>View more</button>
                                <button onClick={() => handleOpenAddEditModal(product)}>Edit</button>
                                <button onClick={() => handleOpenDeleteModal(product.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isAddEditModalOpen && (
                <AddEditModal
                    data={editingProduct}
                    onClose={() => setIsAddEditModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    onConfirm={handleDeleteProduct}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductList;