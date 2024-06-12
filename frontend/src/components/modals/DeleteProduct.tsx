import { Button } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { showDeleteProductState } from '../../store';
import ModalLayout from '../layouts/ModalLayout';

export default function DeleteProductModal() {
    const [show, setShow] = useRecoilState(showDeleteProductState);
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
                <Button color='red'>
                    Delete
                </Button>
            </div>
        </ModalLayout>
    )
}
