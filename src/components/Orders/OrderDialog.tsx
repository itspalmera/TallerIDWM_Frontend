import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { Order } from "@/interfaces/Orders/Order";

interface OrderDialogProps {
    order: Order | null;
    open: boolean;
    onClose: () => void;
}

export const OrderDetailDialog = ({ order, open, onClose, }: OrderDialogProps) => {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalle del Pedido #{order.id}</DialogTitle>
                    <DialogDescription>Información completa del pedido</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <div>
                        <span className="font-semibold">Fecha:</span>{" "}
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                    </div>
                    <div>
                        <span className="font-semibold">Envío:</span>{" "}
                        {order.address
                            ? `${order.address.street} ${order.address.number}, ${order.address.commune ?? ""}`
                            : "-"}
                    </div>
                    <div>
                        <span className="font-semibold">Total:</span> ${order.total}
                    </div>
                    <div>
                        <span className="font-semibold">Productos:</span>
                        <ul className="list-disc ml-6 mt-1">
                            {order.items.map((item: any, idx: number) => (
                                <li key={item.id ?? idx}>
                                    <span className="font-semibold">{item.name}</span> - {item.quantity} x ${item.price} ={" "}
                                    <span className="font-bold">${item.quantity * item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Button onClick={onClose} className="mt-4 w-full">
                    Cerrar
                </Button>
            </DialogContent>
        </Dialog>
    );
};