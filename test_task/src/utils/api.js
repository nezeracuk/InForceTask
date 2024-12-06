const API_URL = 'http://localhost:3001';

export const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
};

export const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
};

export const editProduct = async (product) => {
    const response = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to edit product');
    return response.json();
};

export const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete product');
    return response;
};

export const deleteCommentsByProduct = async (productId) => {
    const commentsResponse = await fetch(`${API_URL}/comments?productId=${productId}`);
    if (!commentsResponse.ok) throw new Error('Failed to fetch related comments');

    const comments = await commentsResponse.json();
    const deletePromises = comments.map((comment) =>
        fetch(`${API_URL}/comments/${comment.id}`, { method: 'DELETE' })
    );
    await Promise.all(deletePromises);
};

export const fetchProductById = async (productId) => {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
};

export const fetchCommentsByProductId = async (productId) => {
    const response = await fetch(`${API_URL}/comments?productId=${productId}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
};

export const addComment = async (comment) => {
    const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment),
    });
    if (!response.ok) throw new Error('Failed to add comment');
    return response.json();
};

export const deleteCommentById = async (commentId) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete comment');
    return response;
};