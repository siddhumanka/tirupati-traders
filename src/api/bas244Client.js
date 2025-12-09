import Papa from 'papaparse';

export const base44 = {
    entities: {
        Product: {
            list: async () => {
                try {
                    const response = await fetch('/products.csv');
                    if (!response.ok) {
                        throw new Error('Failed to fetch products.csv');
                    }
                    const csvText = await response.text();
                    return new Promise((resolve, reject) => {
                        Papa.parse(csvText, {
                            header: true,
                            skipEmptyLines: true,
                            complete: (results) => {
                                resolve(results.data.map(item => ({
                                    ...item,
                                    price: parseFloat(item.price) || 0,
                                    sale_price: parseFloat(item.sale_price) || 0,
                                    weight: parseFloat(item.weight) || 0,
                                    inventory: parseInt(item.inventory) || 0,
                                    product_id: item.product_id,  // Ensure SKU is string
                                })));
                            },
                            error: reject,
                        });
                    });
                } catch (error) {
                    console.error('Error loading products:', error);
                    return [];
                }
            }
        }
    }
};