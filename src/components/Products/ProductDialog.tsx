import { Product } from "@/interfaces/Products/Product"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader} from "../ui/dialog";
import Image from "next/image";

interface ProductDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export const ProductDialog = ({ product, open, onClose }: ProductDialogProps) => {
    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>{product.title}</DialogTitle>
                    <DialogDescription>Detalle del Producto</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center">
                    <Image src={product.imageUrl[0]} alt={product.title} width={200} height={200} className="object-contain rounded-xl"/>
                    <p className="mt-4 font-bold text-2xl">${product.price}</p>
                    <p className="mt-2">{product.description ?? "Sin descripción"}</p>
                    <p className="mt-2 text-sm font-semibold">Stock: {product.stock}</p>
                </div>           

            </DialogContent>
        </Dialog>
    );
}