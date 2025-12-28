import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tablesAPI } from "@/api/tables";
import { ordersAPI } from "@/api/orders";
import { billsAPI } from "@/api/bills";
import { kotAPI } from "@/api/kot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, RefreshCw, Receipt, Printer, Plus, ChefHat, Clock, CheckCircle } from "lucide-react";
import BillDisplay from "./BillDisplay";
import KOTReceipt from "./KOTReceipt";
import OrderEntry from "./OrderEntry";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface TableManagementProps {
  onTableSelect: (table: any) => void;
  onResetTable?: (tableId: string) => void;
  onGenerateKOT?: (table: any, items: any[]) => void;
}

const TableManagementEnhanced = ({ onTableSelect, onResetTable, onGenerateKOT }: TableManagementProps) => {
  const [tables, setTables] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [resettingTable, setResettingTable] = useState<string | null>(null);
  const [generatingBill, setGeneratingBill] = useState<string | null>(null);
  const [generatingKOT, setGeneratingKOT] = useState<string | null>(null);
  const [showBill, setShowBill] = useState(false);
  const [billData, setBillData] = useState<any>(null);
  const [showKOT, setShowKOT] = useState(false);
  const [kotData, setKotData] = useState<any>(null);
  const [selectedOrderForFood, setSelectedOrderForFood] = useState<any>(null);
  const [showAddFood, setShowAddFood] = useState(false);
  const [activeTab, setActiveTab] = useState("tables");

  // Get user role to check if admin
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isAdmin = user?.role === 'admin' || user?.role === 'owner' || user?.role === 'superadmin';

  useEffect(() => {
    fetchTables();
    fetchOrders();

    // Poll for updates every 3 seconds
    const interval = setInterval(() => {
      fetchTables();
      fetchOrders();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchTables = async () => {
    try {
      const data = await tablesAPI.getAll();
      setTables(data);
    } catch (error: any) {
      console.error("Failed to load tables:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await ordersAPI.getAll();
      setOrders(data);
    } catch (error: any) {
      console.error("Failed to load orders:", error);
    }
  };

  const handleResetTable = async (table: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setResettingTable(table._id || table.id);

    try {
      await tablesAPI.resetTable(table._id || table.id);
      toast.success(`Table ${table.table_number} marked as served and reset successfully`);
      await fetchTables();
      await fetchOrders();

      if (onResetTable) {
        onResetTable(table._id || table.id);
      }
    } catch (error: any) {
      console.error("Failed to reset table:", error);
      toast.error("Failed to reset table: " + (error.response?.data?.message || error.message || "Unknown error"));
    } finally {
      setResettingTable(null);
    }
  };

  const handleGenerateFinalBill = async (table: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setGeneratingBill(table._id || table.id);

    try {
      const bill = await billsAPI.createFinal(table._id || table.id);
      setBillData({ ...bill, table });
      setShowBill(true);
      toast.success(`Final bill generated for Table ${table.table_number}`);
    } catch (error: any) {
      console.error("Failed to generate final bill:", error);
      toast.error("Failed to generate final bill: " + (error.response?.data?.message || error.message || "Unknown error"));
    } finally {
      setGeneratingBill(null);
    }
  };

  const handleGenerateKOT = async (table: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setGeneratingKOT(table._id || table.id);

    try {
      // Get orders for this table
      const tableOrders = orders.filter(o => (o.table_id || o.table?._id) === (table._id || table.id));
      if (tableOrders.length === 0) {
        toast.error("No orders found for this table");
        setGeneratingKOT(null);
        return;
      }

      // Get the latest order's items
      const latestOrder = tableOrders[tableOrders.length - 1];
      const items = latestOrder.items || [];

      if (items.length === 0) {
        toast.error("No items in order");
        setGeneratingKOT(null);
        return;
      }

      // Generate KOT locally without API call
      setKotData({
        table,
        items: items.map((item: any) => ({
          name: item.item_name || item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        kotNumber: `KOT-${table.table_number}-${Date.now()}`,
      });
      setShowKOT(true);
      toast.success("KOT generated successfully");
    } catch (error: any) {
      console.error("Failed to generate KOT:", error);
      toast.error("Failed to generate KOT");
    } finally {
      setGeneratingKOT(null);
    }
  };

  const handleAddFood = (table: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOrderForFood(table);
    setShowAddFood(true);
  };

  const getTableOrders = (tableId: string) => {
    return orders.filter(o => (o.table_id || o.table?._id) === tableId);
  };

  const getOrderStatusBadge = (status: string) => {
    const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Pending", variant: "outline" },
      sent_to_kitchen: { label: "Sent to Kitchen", variant: "secondary" },
      preparing: { label: "Preparing", variant: "outline" },
      ready: { label: "Ready", variant: "default" },
      served: { label: "Served", variant: "secondary" },
    };

    const config = statusConfig[status] || { label: status, variant: "secondary" };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // Filter orders by status
  const readyOrders = orders.filter(o => o.status === "ready");
  const activeOrders = orders.filter(o => ["sent_to_kitchen", "preparing"].includes(o.status));
  const runningOrders = orders.filter(o => o.status === "pending");

  if (loading) {
    return <div className="text-center py-8">Loading tables...</div>;
  }

  if (showAddFood && selectedOrderForFood) {
    return (
      <div>
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => {
            setShowAddFood(false);
            setSelectedOrderForFood(null);
          }}
        >
          ← Back to Tables
        </Button>
        <OrderEntry
          table={selectedOrderForFood}
          onComplete={() => {
            setShowAddFood(false);
            setSelectedOrderForFood(null);
            fetchTables();
            fetchOrders();
          }}
          onGenerateKOT={onGenerateKOT}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6">
          <TabsTrigger value="tables" className="text-xs sm:text-sm">Tables</TabsTrigger>
          <TabsTrigger value="ready" className="text-xs sm:text-sm">
            Ready
            {readyOrders.length > 0 && (
              <Badge variant="destructive" className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center text-xs">
                {readyOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm">Active</TabsTrigger>
          <TabsTrigger value="running" className="text-xs sm:text-sm">Running</TabsTrigger>
        </TabsList>

        {/* Tables Tab */}
        <TabsContent value="tables">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold">Restaurant Tables</h3>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {tables.map((table) => {
              const tableOrders = getTableOrders(table._id || table.id);
              const hasOrders = tableOrders.length > 0;

              return (
                <motion.div key={table.id} variants={staggerItem}>
                  <Card
                    className={`transition-all hover:shadow-lg ${table.is_booked ? "border-primary table-pulse" : "border-border"
                      } ${!table.is_booked ? "cursor-pointer" : ""}`}
                    onClick={() => !table.is_booked && onTableSelect(table)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Table {table.table_number}</CardTitle>
                        <Badge variant={table.is_booked ? "default" : "secondary"}>
                          {table.is_booked ? "Booked" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Users className="h-4 w-4" />
                        <span>Capacity: {table.capacity}</span>
                      </div>
                      {table.is_booked && isAdmin && (
                        <div className="space-y-2">
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full touch-target"
                            onClick={(e) => handleGenerateKOT(table, e)}
                            disabled={generatingKOT === (table._id || table.id) || !hasOrders}
                          >
                            <Printer className={`h-4 w-4 mr-2 ${generatingKOT === (table._id || table.id) ? "animate-spin" : ""}`} />
                            {generatingKOT === (table._id || table.id) ? "Generating..." : "Generate KOT"}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full touch-target"
                            onClick={(e) => handleAddFood(table, e)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Food
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full touch-target"
                            onClick={(e) => handleGenerateFinalBill(table, e)}
                            disabled={generatingBill === (table._id || table.id)}
                          >
                            <Receipt className={`h-4 w-4 mr-2 ${generatingBill === (table._id || table.id) ? "animate-spin" : ""}`} />
                            {generatingBill === (table._id || table.id) ? "Generating..." : "Generate Final Bill"}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="w-full touch-target"
                                onClick={(e) => e.stopPropagation()}
                                disabled={resettingTable === (table._id || table.id)}
                              >
                                <RefreshCw className={`h-4 w-4 mr-2 ${resettingTable === (table._id || table.id) ? "animate-spin" : ""}`} />
                                {resettingTable === (table._id || table.id) ? "Marking as Served..." : "Mark as Served"}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Mark Table {table.table_number} as Served?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This confirms that the food has been served and the customer has left.
                                  The table will be reset and made available for new orders.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetTable(table, e);
                                  }}
                                >
                                  Mark as Served
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </TabsContent>

        {/* Ready Orders Tab */}
        <TabsContent value="ready">
          <div className="space-y-3 sm:space-y-4">
            {readyOrders.length === 0 ? (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                  <p className="text-sm sm:text-base text-muted-foreground">No orders ready to serve</p>
                </CardContent>
              </Card>
            ) : (
              readyOrders.map((order) => (
                <Card key={order._id || order.id} className="border-2 border-primary">
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <CardTitle className="text-base sm:text-lg">Table {order.table?.table_number || order.table?.tableNumber}</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at || order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {getOrderStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs sm:text-sm">
                          <span>{item.item_name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t mt-3 sm:mt-4">
                      <span className="font-bold text-sm sm:text-base">Total: ₹{parseFloat(String(order.total_amount || order.totalAmount)).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Active Orders Tab */}
        <TabsContent value="active">
          <div className="space-y-3 sm:space-y-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <ChefHat className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                  <p className="text-sm sm:text-base text-muted-foreground">No active orders</p>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => (
                <Card key={order._id || order.id}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <CardTitle className="text-base sm:text-lg">Table {order.table?.table_number || order.table?.tableNumber}</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at || order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {getOrderStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs sm:text-sm">
                          <span>{item.item_name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t mt-3 sm:mt-4">
                      <span className="font-bold text-sm sm:text-base">Total: ₹{parseFloat(String(order.total_amount || order.totalAmount)).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Running Orders Tab */}
        <TabsContent value="running">
          <div className="space-y-3 sm:space-y-4">
            {runningOrders.length === 0 ? (
              <Card>
                <CardContent className="py-8 sm:py-12 text-center">
                  <Clock className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-muted-foreground" />
                  <p className="text-sm sm:text-base text-muted-foreground">No running orders</p>
                </CardContent>
              </Card>
            ) : (
              runningOrders.map((order) => (
                <Card key={order._id || order.id}>
                  <CardHeader className="pb-3 sm:pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <CardTitle className="text-base sm:text-lg">Table {order.table?.table_number || order.table?.tableNumber}</CardTitle>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {new Date(order.created_at || order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {getOrderStatusBadge(order.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-xs sm:text-sm">
                          <span>{item.item_name} × {item.quantity}</span>
                          <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t mt-3 sm:mt-4">
                      <span className="font-bold text-sm sm:text-base">Total: ₹{parseFloat(String(order.total_amount || order.totalAmount)).toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {showBill && billData && (
        <BillDisplay
          bill={billData}
          onClose={() => {
            setShowBill(false);
            setBillData(null);
            fetchTables();
            fetchOrders();
          }}
        />
      )}

      {showKOT && kotData && (
        <KOTReceipt
          table={kotData.table}
          items={kotData.items}
          kotNumber={kotData.kotNumber}
          onClose={() => {
            setShowKOT(false);
            setKotData(null);
          }}
        />
      )}
    </div>
  );
};

export default TableManagementEnhanced;
