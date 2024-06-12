import { faker } from "@faker-js/faker";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "@mantine/core";
import { Helmet } from "react-helmet";
import { Column } from "../../components/tables/Table";
import TableWrapper from "../../components/tables/TableWrapper";
import { generatePageTitle } from "../../lib/utils";
import { Product } from "../../types";
import AddOrEditProductModal from "../../components/modals/AddOrEditProduct";
import { useRecoilState } from "recoil";
import { showAddOrEditProductState, showDeleteProductState } from "../../store";
import DeleteProductModal from "../../components/modals/DeleteProduct";


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

const products: Product[] = Array.from({ length: 35 }, () => ({
    id: "#" + faker.string.uuid().slice(0, 3),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({
        min: 10,
        max: 100
    }),
    createdAt: faker.date.recent().toISOString()
}))

export default function Products() {
    const [, setShowAddProduct] = useRecoilState(showAddOrEditProductState);
    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Products")}</title>
            </Helmet>
            <AddOrEditProductModal />
            <DeleteProductModal />
            <TableWrapper
                columns={columns}
                data={products}
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
