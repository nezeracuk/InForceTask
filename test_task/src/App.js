import React, { useState } from 'react';
import ProductList from './components/ProductList/ProductList';
import ProductView from './components/ProductView/ProductView';

function App() {
    const [selectedProductId, setSelectedProductId] = useState(null);

    return (
        <div className="App">
            {selectedProductId ? (
                <ProductView
                    productId={selectedProductId}
                    onBack={() => setSelectedProductId(null)}
                />
            ) : (
                <ProductList onSelectProduct={setSelectedProductId} />
            )}
        </div>
    );
}

export default App;
