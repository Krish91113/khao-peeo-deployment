import { Table } from "../models/Table.model.js";
import { Order } from "../models/Order.model.js";
import { Bill } from "../models/Bill.model.js";

// @route   GET /api/tables/:id
// @desc    Get single table by id
// @access  Protected (owner/admin/waiter)
export const getTableById = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id).lean();
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const transformed = {
      _id: table._id,
      id: table._id,
      table_number: table.tableNumber.toString(),
      capacity: table.capacity,
      is_booked: table.isBooked,
      current_order_id: table.currentOrder ? table.currentOrder.toString() : null,
    };

    return res.json(transformed);
  } catch (error) {
    console.error("getTableById error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @route   GET /api/tables
// @desc    Get all tables
// @access  Protected (owner/admin)
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 }).lean();
    // Transform to match frontend expectations
    const transformed = tables.map(table => ({
      _id: table._id,
      id: table._id, // Also include id for compatibility
      table_number: table.tableNumber.toString(),
      capacity: table.capacity,
      is_booked: table.isBooked,
      current_order_id: table.currentOrder ? table.currentOrder.toString() : null,
    }));
    return res.json(transformed);
  } catch (error) {
    console.error("getTables error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @route   PUT /api/tables/:id/status
// @desc    Update table booking status (book/unbook) and optional currentOrder
// @access  Protected (owner/admin)
export const updateTableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBooked, currentOrderId } = req.body;

    const update = {
      isBooked: Boolean(isBooked),
      currentOrder: currentOrderId || null,
    };

    const table = await Table.findByIdAndUpdate(id, update, { new: true });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Transform to match frontend expectations
    const transformed = {
      _id: table._id,
      id: table._id,
      table_number: table.tableNumber.toString(),
      capacity: table.capacity,
      is_booked: table.isBooked,
      current_order_id: table.currentOrder ? table.currentOrder.toString() : null,
    };

    return res.json(transformed);
  } catch (error) {
    console.error("updateTableStatus error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @route   PUT /api/tables/:id/reset
// @desc    Reset table (mark as served, delete all orders and bills)
// @access  Protected (owner/admin)
export const resetTable = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Delete ALL orders associated with this table (not just current order)
    // This ensures a fresh start for the next customer
    const deleteOrdersResult = await Order.deleteMany({ table: table._id });
    console.log(`Deleted ${deleteOrdersResult.deletedCount} orders for table ${table.tableNumber}`);

    // Delete ALL bills associated with this table
    const deleteBillsResult = await Bill.deleteMany({ table: table._id });
    console.log(`Deleted ${deleteBillsResult.deletedCount} bills for table ${table.tableNumber}`);

    // Reset table status
    table.isBooked = false;
    table.currentOrder = null;
    await table.save();

    // Transform to match frontend expectations
    const transformed = {
      _id: table._id,
      id: table._id,
      table_number: table.tableNumber.toString(),
      capacity: table.capacity,
      is_booked: table.isBooked,
      current_order_id: null,
    };

    return res.json(transformed);
  } catch (error) {
    console.error("resetTable error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @route   POST /api/tables
// @desc    Create a table (one-time setup, owner only)
// @access  Protected (owner)
export const createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    const existing = await Table.findOne({ tableNumber });
    if (existing) {
      return res.status(400).json({ message: "Table number already exists" });
    }

    const table = await Table.create({
      tableNumber,
      capacity: capacity || 4,
    });

    // Transform to match frontend expectations
    const transformed = {
      _id: table._id,
      id: table._id,
      table_number: table.tableNumber.toString(),
      capacity: table.capacity,
      is_booked: table.isBooked,
      current_order_id: null,
    };

    return res.status(201).json(transformed);
  } catch (error) {
    console.error("createTable error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


