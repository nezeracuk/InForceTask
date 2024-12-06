import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../../redux/slices/productsSlice';
import './Modals.css';

const AddEditModal = ({ data, onClose }) => {
    const [formData, setFormData] = useState(
        data || { name: '', count: '', size: { width: '', height: '' }, weight: '' }
    );
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'count' || name === 'weight' ? +value : value,
        }));
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            size: { ...prev.size, [name]: +value },
        }));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.count || !formData.weight || !formData.size.width || !formData.size.height) {
            setError('All fields are required!');
            return;
        }

        setError('');
        if (data) {
            dispatch(editProduct(formData));
        } else {
            dispatch(addProduct(formData));
        }

        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{data ? 'Edit Product' : 'Add Product'}</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="count"
                    placeholder="Count"
                    step="5"
                    min={0}
                    value={formData.count}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="width"
                    placeholder="Width"
                    min={0}
                    step="100"
                    value={formData.size.width}
                    onChange={handleSizeChange}
                />
                <input
                    type="number"
                    name="height"
                    placeholder="Height"
                    min={0}
                    step="100"
                    value={formData.size.height}
                    onChange={handleSizeChange}
                />
                <input
                    type="text"
                    name="weight"
                    placeholder="Weight (in grams)"
                    value={formData.weight}
                    onChange={handleChange}
                />
                <div className="modal-actions">
                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddEditModal;