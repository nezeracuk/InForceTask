import React, { useState, useEffect } from 'react';
import { v4 as dynamicId } from 'uuid';
import DeleteModal from '../Modals/DeleteModal';
import AddEditModal from '../Modals/AddEditModal';
import {
    fetchProductById,
    fetchCommentsByProductId,
    addComment,
    deleteCommentById,
} from '../../utils/api';
import './ProductView.css';

const CommentsList = ({ comments, onDelete }) => (
    <ul>
        {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
                <p>{comment.description}</p>
                <small>{comment.date}</small>
                <button
                    onClick={() => onDelete(comment.id)}
                    className="delete-comment-button"
                >
                    Delete
                </button>
            </li>
        ))}
    </ul>
);

const ProductView = ({ productId, onBack }) => {
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await fetchProductById(productId);
                setProduct(productData);

                const commentsData = await fetchCommentsByProductId(productId);
                setComments(commentsData);
            } catch (error) {
                console.error('Failed to fetch product or comments:', error);
            }
        };

        fetchData();
    }, [productId]);

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            setError('Comment cannot be empty!');
            return;
        }

        setError('');
        const comment = {
            id: dynamicId(),
            productId,
            description: newComment.trim(),
            date: new Date().toLocaleString(),
        };

        try {
            const addedComment = await addComment(comment);
            setComments((prev) => [...prev, addedComment]);
            setNewComment('');
        } catch (error) {
            setError('Failed to add comment. Please try again.');
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async () => {
        try {
            await deleteCommentById(commentToDelete);
            setComments((prev) => prev.filter((comment) => comment.id !== commentToDelete));
            setIsDeleteModalOpen(false);
            setCommentToDelete(null);
        } catch (error) {
            setError('Failed to delete comment. Please try again.');
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="product-view">
            {product ? (
                <>
                    <h2 className="product-header">{product.name}</h2>
                    <p className="product-details">
                        <span>Count:</span> {product.count}
                    </p>
                    <p className="product-details">
                        <span>Weight:</span> {product.weight}g
                    </p>
                    <p className="product-details">
                        <span>Size:</span> {product.size.width} x {product.size.height}
                    </p>

                    <div className="button-container">
                        <button onClick={onBack} className="back-button">Back</button>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="edit-button"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="comments">
                        <h3>Comments</h3>
                        <CommentsList
                            comments={comments}
                            onDelete={(id) => {
                                setCommentToDelete(id);
                                setIsDeleteModalOpen(true);
                            }}
                        />
                        <div className="add-comment">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={handleAddComment}>Add Comment</button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </>
            ) : (
                <p>Loading product...</p>
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    onConfirm={handleDeleteComment}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}

            {isEditModalOpen && (
                <AddEditModal
                    data={product}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProductView;