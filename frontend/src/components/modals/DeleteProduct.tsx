import { Button } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { showDeleteProductState } from '../../store';
import ModalLayout from '../layouts/ModalLayout';
import useProducts from '../../hooks/useProducts';

export default function DeleteProductModal() {
    const [show, setShow] = useRecoilState(showDeleteProductState);
    const { deleteProduct, deletingProduct } = useProducts();

    return (
        <ModalLayout
            open={Boolean(show?.show)}
            onClose={() => setShow(null)}
        >
            <h1 className="text-2xl font-semibold pb-4">Delete Product</h1>
            <p className="pb-4">Are you sure you want to delete {show?.product?.name}?</p>
            <div className="flex w-full justify-end gap-4 pt-5">
                <Button
                    onClick={() => setShow(null)}
                    variant='outline'
                    color='gray'
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => deleteProduct(show!.product!.id)}
                    loading={deletingProduct}
                    disabled={deletingProduct}
                    color='red'>
                    Delete
                </Button>
            </div>
        </ModalLayout>
    )
}
