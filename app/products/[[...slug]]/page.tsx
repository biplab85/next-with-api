import React from 'react';

interface Props {
    params: { slug?: string[] }; // ✅ `slug` should be an optional array of strings
}

const ProductPage = async (props: Props) => {
    const { slug } = await props.params; // ✅ Await inside the function body

    return (
        <div>
            <h1>Product Page</h1>
            <p><strong>Slug:</strong> {slug ? slug.join(' / ') : 'No slug provided'}</p>
        </div>
    );
};

export default ProductPage;
