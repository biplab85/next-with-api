import React from 'react';

interface Props {
    params: { slug?: string[] }; // ✅ `slug` is optional and can be an array
    searchParams: { sortOrder?: string }; // ✅ Made `sortOrder` optional to avoid errors
}

const ProductPage = async ({ params, searchParams }: Props) => {
    const { slug } = params;
    const { sortOrder } = searchParams;

    return (
        <div>
            <h1>Product Page</h1>
            <p><strong>Slug:</strong> {slug ? slug.join(' / ') : 'No slug provided'}</p>
            <p><strong>Sort Order:</strong> {sortOrder || 'Not specified'}</p>
        </div>
    );
};

export default ProductPage;
