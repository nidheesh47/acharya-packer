import { Order } from "../../models/order.model.js";

/**
 * POST /api/orders/manual
 * Controller for manually adding orders via Express
 */
export async function manualAddOrder(req, res) {
  try {
    const user = req.user; // Assumes auth middleware has populated req.user

    // 1. 🔐 Shop Safety & Auth Check
    if (!user || !user.shop_domain) {
      return res.status(400).json({
        error: "User is not linked to any shop or is unauthorized",
      });
    }

    // 2. ✅ Extract fields from JSON body
    const {
      order_name,
      email,
      phone,
      tracking_company,
      tracking_number,
      tracking_url,
      line_items, // Expecting: [{ sku: string, quantity: number }]
    } = req.body;

    // 3. 🔴 Validation
    if (!order_name) {
      return res
        .status(400)
        .json({ error: "Order number (order_name) is required" });
    }

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one line item is required" });
    }

    // Deep validation of line items
    for (const item of line_items) {
      if (
        !item?.sku ||
        item?.quantity === undefined ||
        Number(item.quantity) <= 0
      ) {
        return res.status(400).json({
          error:
            "Each line item must have a valid SKU and a quantity greater than 0",
        });
      }
    }

    // 4. ❌ Prevent duplicate order number (SHOP-SCOPED)
    const exists = await Order.findOne({
      order_name,
      shop_domain: user.shop_domain,
    });

    if (exists) {
      return res.status(409).json({
        error: "Order number already exists for this shop",
      });
    }

    const now = Date.now();

    // 5. ✅ Create Order Object
    const orderData = {
      shop_domain: user.shop_domain, // 🔐 Critical for multi-tenant safety

      shopify_id: `manual_${now}`,
      orderId: `manual_${now}`,
      order_name,

      email,
      fulfillment_status: "manual",

      customer: {
        phone: phone || "",
        email: email || "",
      },

      line_items: line_items.map((li) => ({
        sku: li.sku,
        quantity: Number(li.quantity),
      })),

      tracking: {
        company: tracking_company || null,
        number: tracking_number || null,
        url: tracking_url || null,
        scan_status: "pending",
        scanned_at: null,
        scanned_by: null,
      },

      scan_status: "pending",
      scanned_by: null,
      scanned_at: null,
      scan_logs: [],

      raw_payload: {
        source: "manual",
        created_by: {
          admin_id: user.admin_id || user.id, // Handle different ID naming conventions
          role: user.role,
        },
      },
    };

    const order = await Order.create(orderData);

    // 6. 🎉 Success Response
    return res.status(201).json({
      success: true,
      message: "Manual order added successfully",
      order_id: order._id,
    });
  } catch (error) {
    console.error("Error in manualAddOrder:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
