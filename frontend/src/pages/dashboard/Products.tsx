import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@mantine/core";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import AddOrEditProductModal from "../../components/modals/AddOrEditProduct";
import DeleteProductModal from "../../components/modals/DeleteProduct";
import { Column } from "../../components/tables/Table";
import TableWrapper from "../../components/tables/TableWrapper";
import useProducts from "../../hooks/useProducts";
import { generatePageTitle } from "../../lib/utils";
import { showAddOrEditProductState, showDeleteProductState } from "../../store";
import { Product } from "../../types";


const columns: Column<Product>[] = [
    {
        title: "ID",
        key: "id"
    },
    {
        title: "Product Name",
        key: "name"
    },
    {
        title: "Product Description",
        key: "description",
        Element: ({ row }) => <p className="max-w-lg">{row.description}</p>
    },
    {
        title: "Price",
        key: "price",
        Element: ({ row }) => <p className="font-bold">${row.price}</p>
    },
    {
        title: "Created At",
        key: "createdAt",
        Element: ({ row }) => <p>{new Date(row.createdAt).toLocaleDateString()}</p>
    },
    {
        title: "Actions",
        key: "actions",
        Element: ({ row }) => {
            const [, setShowEdit] = useRecoilState(showAddOrEditProductState);
            const [, setShowDelete] = useRecoilState(showDeleteProductState)
            return (
                <div className="flex space-x-2">
                    <Button
                        onClick={() => setShowEdit({
                            show: true,
                            action: "edit",
                            product: row
                        })}
                        size="xs" variant="outline">Edit</Button>
                    <Button
                        onClick={() => setShowDelete({
                            show: true,
                            product: row
                        })}
                        size="xs" variant="outline" color="red">Delete</Button>
                </div>
            )
        }
    }
]

export default function Products() {
    const [, setShowAddProduct] = useRecoilState(showAddOrEditProductState);
    const { isLoading, products, error } = useProducts();
    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Products")}</title>
            </Helmet>
            <AddOrEditProductModal />
            <DeleteProductModal />
            <TableWrapper
                columns={columns}
                data={products ?? []}
                loading={isLoading}
                error={error}
                title="Products"
                description="List of all products"
                actions={
                    <Button
                        onClick={() => setShowAddProduct({
                            show: true,
                            action: "add"
                        })}
                    >
                        <PlusIcon className="w-6" />
                        <span>Add Product</span>
                    </Button>
                }
            />
        </>
    )
}
