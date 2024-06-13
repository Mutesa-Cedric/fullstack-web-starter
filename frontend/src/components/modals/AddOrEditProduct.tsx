import React from 'react'
import ModalLayout from '../layouts/ModalLayout'
import { useRecoilState } from 'recoil'
import { showAddOrEditProductState } from '../../store';
import { Input, Button, Textarea } from '@mantine/core';
import useProducts from '../../hooks/useProducts';

export default function AddOrEditProductModal() {
    const [show, setShow] = useRecoilState(showAddOrEditProductState);
    const { createProduct, creatingProduct, updateProduct, updatingProduct } = useProducts();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            price: parseInt(formData.get('price') as string)
        }

        if (show?.action === 'add') {
            createProduct(data);
        } else if (show?.action === 'edit' && show.product) {
            updateProduct({
                ...show.product,
                ...data
            });
        }
    }
    return (
        <ModalLayout
            open={Boolean(show?.show)}
            onClose={() => setShow(null)}
        >
            <h1 className="text-2xl font-semibold pb-4 capitalize">{show?.action} Product</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                <div className='grid gap-2'>
                    <label htmlFor="name">Product Name</label>
                    <Input id="name" required min={2} name='name' placeholder="Product Name"
                        defaultValue={show?.product?.name}
                    />
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="description">Product Description</label>
                    <Textarea required id="description" name='description' placeholder="Product Description"
                        defaultValue={show?.product?.description}
                    />
                </div>
                <div className='grid gap-2'>
                    <label htmlFor="price">Price</label>
                    <Input min={1} required id="price" name='price' placeholder="Price" type="number"
                        defaultValue={show?.product?.price}
                    />
                </div>
                <div className='flex w-full justify-end gap-4 pt-5'>
                    <Button
                        onClick={() => setShow(null)}
                        variant='outline'
                        color='gray'
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        loading={creatingProduct || updatingProduct}
                        disabled={creatingProduct || updatingProduct}
                    >
                        {show?.action === 'add' ? 'Add Product' : 'Update Product'}
                    </Button>
                </div>

            </form>

        </ModalLayout >
    )
}
