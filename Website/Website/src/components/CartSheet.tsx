import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Minus, Plus, Trash2, CreditCard } from "lucide-react";

const CartSheet = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative text-foreground hover:text-primary transition-colors" aria-label="Cart">
          <ShoppingBag size={20} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-background border-border w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl uppercase tracking-wider text-foreground">Your Basket</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingBag size={40} className="text-muted-foreground/30 mb-4" />
            <p className="font-body text-muted-foreground">Your basket is empty.</p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col h-[calc(100vh-200px)]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-border">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm uppercase text-foreground truncate">{item.name}</h4>
                    <p className="font-body text-xs text-muted-foreground capitalize">{item.type}</p>
                    <p className="font-heading text-sm text-primary mt-1">₺{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center gap-2 border border-border">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="font-body text-xs w-6 text-center text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4 space-y-3">
              <div className="flex justify-between font-heading text-sm uppercase text-foreground">
                <span>Total</span>
                <span className="text-primary">₺{totalPrice.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button variant="accent" className="w-full" size="lg">
                  <CreditCard className="mr-2" size={16} /> Pay with Card
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="heroOutline" size="sm" className="w-full text-xs">
                    PayPal
                  </Button>
                  <Button variant="heroOutline" size="sm" className="w-full text-xs">
                    Apple Pay
                  </Button>
                </div>
              </div>
              <button onClick={clearCart} className="font-body text-xs text-muted-foreground hover:text-destructive transition-colors w-full text-center mt-2">
                Clear basket
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
