import mongoose from "mongoose";
import { Sku } from "../../models/sku.model.js";
import { PackingScanLog } from "../../models/packingScanLog.model.js";

export async function handlePackingAction(req, res) {
  // Assume auth middleware already attached user to req.user
  const user = req.user;

  // 🔐 ROLE CHECK
  if (!["admin", "logistics", "packing"].includes(user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // 🔐 SHOP CHECK
  if (!user.shop_domain) {
    return res.status(400).json({ error: "User is not linked to any shop" });
  }

  const body = req.body;
  const { order_barcode, sku, tracking_number } = body;

  const db = mongoose.connection.db;
  const orders = db.collection("orders");
  const admins = db.collection("admins");

  const adminDetails = await admins.findOne({
    admin_id: user.admin_id,
    shop_domain: user.shop_domain,
  });

  if (!adminDetails) {
    return res.status(404).json({ error: "Admin details not found" });
  }

  const agentName = adminDetails.name || user.name || "Unknown Agent";

  // --------------------------------------------------------------
  // Helper functions (identical to original logic)
  // --------------------------------------------------------------
  async function getSkuInfo(shopDomain) {
    const allSkus = await Sku.find({
      shop_domain: shopDomain,
      is_active: true,
    }).lean();

    const skuMap = new Map();
    const bundleMap = new Map();

    allSkus.forEach((sku) => {
      skuMap.set(sku.sku, sku);
      if (sku.sku_type === "bundle") {
        bundleMap.set(sku.sku, sku);
      }
    });

    return { skuMap, bundleMap };
  }

  async function checkAllItemsScanned(order, shopDomain) {
    const { bundleMap } = await getSkuInfo(shopDomain);

    for (const item of order.line_items) {
      const bundleDoc = bundleMap.get(item.sku);

      if (bundleDoc && bundleDoc.bundle_items) {
        for (const bundleItem of bundleDoc.bundle_items) {
          const componentScans = item.component_scans?.[bundleItem.sku] || 0;
          const requiredFromBundle = bundleItem.quantity * (item.quantity || 1);

          if (componentScans < requiredFromBundle) {
            return false;
          }
        }
      } else {
        if ((item.scan?.scanned_qty || 0) < (item.quantity || 1)) {
          return false;
        }
      }
    }
    return true;
  }

  async function expandLineItems(lineItems, shopDomain) {
    const { skuMap, bundleMap } = await getSkuInfo(shopDomain);
    const expandedItems = [];

    for (const item of lineItems) {
      const skuDoc = skuMap.get(item.sku);
      if (skuDoc?.sku_type === "bundle" && bundleMap.has(item.sku)) {
        continue;
      } else {
        const scannedQty = item.scan?.scanned_qty || 0;
        expandedItems.push({
          sku: item.sku,
          ordered_qty: item.quantity || 1,
          scanned_qty: scannedQty,
          pending_qty: Math.max(0, (item.quantity || 1) - scannedQty),
          fully_scanned: scannedQty >= (item.quantity || 1),
          product_name: skuDoc?.product_name || item.title || "Unknown Product",
          image_url: skuDoc?.image_url || null,
          is_bundle_component: false,
          source_info: {
            type: "regular",
            quantity: item.quantity || 1,
            line_item_id: item._id?.toString() || null,
            is_separate_order: true,
          },
        });
      }
    }

    for (const item of lineItems) {
      const skuDoc = skuMap.get(item.sku);
      if (skuDoc?.sku_type === "bundle" && bundleMap.has(item.sku)) {
        const bundleDoc = bundleMap.get(item.sku);
        const componentStatuses = [];
        let allComponentsFullyScanned = true;
        let totalComponentScannedCount = 0;
        let totalComponentRequiredCount = 0;

        for (const bundleItem of bundleDoc.bundle_items) {
          const componentScans = item.component_scans?.[bundleItem.sku] || 0;
          const requiredFromBundle = bundleItem.quantity * (item.quantity || 1);

          const componentFullyScanned = componentScans >= requiredFromBundle;
          if (!componentFullyScanned) allComponentsFullyScanned = false;

          totalComponentScannedCount += componentScans;
          totalComponentRequiredCount += requiredFromBundle;

          componentStatuses.push({
            sku: bundleItem.sku,
            scanned: componentFullyScanned,
            scanned_qty: componentScans,
            required_qty: requiredFromBundle,
          });
        }

        const bundleScannedQty = allComponentsFullyScanned
          ? item.quantity || 1
          : 0;
        const bundlePendingQty = allComponentsFullyScanned
          ? 0
          : item.quantity || 1;

        expandedItems.push({
          sku: item.sku,
          ordered_qty: item.quantity || 1,
          scanned_qty: bundleScannedQty,
          pending_qty: bundlePendingQty,
          fully_scanned: allComponentsFullyScanned,
          product_name: skuDoc?.product_name || `Bundle ${item.sku}`,
          image_url: skuDoc?.image_url || null,
          is_bundle: true,
          is_bundle_component: false,
          bundle_components: componentStatuses,
          source_info: {
            type: "bundle_main",
            quantity: item.quantity || 1,
            line_item_id: item._id?.toString() || null,
          },
        });

        for (const bundleItem of bundleDoc.bundle_items) {
          const componentSku = bundleItem.sku;
          const componentDoc = skuMap.get(componentSku);
          const totalNeededFromBundle =
            bundleItem.quantity * (item.quantity || 1);
          const scannedFromThisBundle =
            item.component_scans?.[componentSku] || 0;

          expandedItems.push({
            sku: componentSku,
            ordered_qty: totalNeededFromBundle,
            scanned_qty: scannedFromThisBundle,
            pending_qty: Math.max(
              0,
              totalNeededFromBundle - scannedFromThisBundle,
            ),
            fully_scanned: scannedFromThisBundle >= totalNeededFromBundle,
            product_name:
              componentDoc?.product_name || `Component of ${item.sku}`,
            image_url: componentDoc?.image_url || null,
            is_bundle_component: true,
            source_info: {
              type: "bundle_component",
              bundle_sku: item.sku,
              bundle_name: skuDoc.product_name,
              bundle_quantity: item.quantity,
              component_quantity: bundleItem.quantity,
              parent_line_item_id: item._id?.toString() || null,
              from_bundle_only: true,
            },
          });
        }
      }
    }
    return expandedItems;
  }

  async function calculateSkuQuantities(order, targetSku, shopDomain) {
    let required = 0;
    let scanned = 0;
    const sourceBreakdown = [];

    const allSkus = await Sku.find({
      shop_domain: shopDomain,
      is_active: true,
    }).lean();

    const bundleMap = new Map();
    allSkus.forEach((s) => {
      if (s.sku_type === "bundle") {
        bundleMap.set(s.sku, s);
      }
    });

    for (const item of order.line_items) {
      if (item.sku === targetSku) {
        const itemRequired = item.quantity || 1;
        const itemScanned = item.scan?.scanned_qty || 0;
        required += itemRequired;
        scanned += itemScanned;

        sourceBreakdown.push({
          type: "regular",
          line_item_id: item._id?.toString(),
          quantity: itemRequired,
          scanned: itemScanned,
          pending: itemRequired - itemScanned,
          is_separate_order: true,
        });
      }
    }

    for (const item of order.line_items) {
      const bundleDoc = bundleMap.get(item.sku);
      if (bundleDoc && bundleDoc.bundle_items) {
        const bundleComponent = bundleDoc.bundle_items.find(
          (bi) => bi.sku === targetSku,
        );
        if (bundleComponent) {
          const quantityFromThisBundle =
            bundleComponent.quantity * (item.quantity || 1);
          required += quantityFromThisBundle;

          const scansFromThisBundle = item.component_scans?.[targetSku] || 0;
          scanned += scansFromThisBundle;

          sourceBreakdown.push({
            type: "bundle_component",
            bundle_sku: item.sku,
            bundle_name: bundleDoc.product_name,
            line_item_id: item._id?.toString(),
            quantity: quantityFromThisBundle,
            scanned: scansFromThisBundle,
            pending: quantityFromThisBundle - scansFromThisBundle,
            component_quantity_per_bundle: bundleComponent.quantity,
            from_bundle_only: true,
          });
        }
      }
    }

    return {
      required,
      scanned,
      sourceBreakdown,
      fully_scanned: scanned >= required,
    };
  }

  async function canScanComponent(order, componentSku, shopDomain) {
    for (const item of order.line_items) {
      if (item.sku === componentSku) {
        const currentScans = item.scan?.scanned_qty || 0;
        if (currentScans < (item.quantity || 1)) {
          return { canScan: true, type: "regular", item };
        }
      }
    }

    const allBundles = await Sku.find({
      shop_domain: shopDomain,
      sku_type: "bundle",
      is_active: true,
    }).lean();

    for (const bundle of allBundles) {
      const bundleComponent = bundle.bundle_items?.find(
        (bi) => bi.sku === componentSku,
      );
      if (!bundleComponent) continue;

      const bundleItem = order.line_items.find(
        (item) => item.sku === bundle.sku,
      );
      if (!bundleItem) continue;

      bundleItem.component_scans = bundleItem.component_scans || {};
      const currentComponentScans =
        bundleItem.component_scans[componentSku] || 0;
      const maxForThisBundle =
        bundleComponent.quantity * (bundleItem.quantity || 1);

      if (currentComponentScans < maxForThisBundle) {
        return {
          canScan: true,
          type: "bundle_component",
          item: bundleItem,
          bundleSku: bundle.sku,
          componentSku,
        };
      }
    }

    return { canScan: false };
  }

  // --------------------------------------------------------------
  // 1️⃣ ORDER BARCODE SCAN
  // --------------------------------------------------------------
  if (order_barcode && !sku && !tracking_number) {
    const normalizedOrder = order_barcode.startsWith("#")
      ? order_barcode
      : `${order_barcode}`;

    const order = await orders.findOne({
      order_name: normalizedOrder,
      shop_domain: user.shop_domain,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await admins.updateOne(
      {
        admin_id: user.admin_id,
        shop_domain: user.shop_domain,
      },
      {
        $set: {
          active_order: normalizedOrder,
          active_order_status: "order_loaded",
        },
      },
    );

    const expandedItems = await expandLineItems(
      order.line_items,
      user.shop_domain,
    );
    const allItemsScanned = await checkAllItemsScanned(order, user.shop_domain);
    const trackingScanned = order.tracking?.scan_status === "scanned";

    const { bundleMap } = await getSkuInfo(user.shop_domain);
    let totalItemsCount = 0;
    let scannedItemsCount = 0;

    for (const item of order.line_items) {
      const bundleDoc = bundleMap.get(item.sku);
      if (bundleDoc && bundleDoc.bundle_items) {
        totalItemsCount += bundleDoc.bundle_items.length;
        for (const bundleItem of bundleDoc.bundle_items) {
          const componentScans = item.component_scans?.[bundleItem.sku] || 0;
          const requiredFromBundle = bundleItem.quantity * (item.quantity || 1);
          if (componentScans >= requiredFromBundle) scannedItemsCount++;
        }
      } else {
        totalItemsCount++;
        if ((item.scan?.scanned_qty || 0) >= (item.quantity || 1))
          scannedItemsCount++;
      }
    }

    let statusMessage = "Items scanning in progress";
    if (allItemsScanned && !trackingScanned)
      statusMessage = "All items scanned. Tracking label pending.";
    else if (allItemsScanned && trackingScanned)
      statusMessage = "Order complete";

    return res.json({
      success: true,
      mode: "order_loaded",
      order: {
        order_name: order.order_name,
        order_scan_status: order.scan_status,
        tracking_scan_status: order.tracking?.scan_status || "pending",
        tracking_number: order.tracking?.number,
        carrier: order.tracking?.company,
        items: expandedItems,
        progress: {
          items_scanned: allItemsScanned,
          tracking_scanned: trackingScanned,
          order_complete: allItemsScanned && trackingScanned,
          total_items: totalItemsCount,
          scanned_items: scannedItemsCount,
        },
        status_message: statusMessage,
      },
      agent: {
        id: user.admin_id,
        name: agentName,
        role: user.role,
        shop_domain: user.shop_domain,
      },
    });
  }

  // --------------------------------------------------------------
  // 2️⃣ PRODUCT SKU SCAN
  // --------------------------------------------------------------
  if (sku && !tracking_number) {
    const agent = await admins.findOne({
      admin_id: user.admin_id,
      shop_domain: user.shop_domain,
    });

    if (!agent?.active_order) {
      return res
        .status(400)
        .json({ error: "No active order. Scan order barcode first." });
    }

    const order = await orders.findOne({
      order_name: agent.active_order,
      shop_domain: user.shop_domain,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const skuDoc = await Sku.findOne({
      shop_domain: user.shop_domain,
      sku: sku.trim().toUpperCase(),
      is_active: true,
    }).lean();

    if (!skuDoc) {
      return res.status(400).json({ error: "Invalid or inactive SKU" });
    }

    const quantities = await calculateSkuQuantities(
      order,
      skuDoc.sku,
      user.shop_domain,
    );
    const totalRequiredQuantity = quantities.required;
    const totalScannedQuantity = quantities.scanned;

    if (totalScannedQuantity >= totalRequiredQuantity) {
      return res.status(409).json({
        error: `SKU ${skuDoc.sku} is fully scanned (${totalScannedQuantity}/${totalRequiredQuantity})`,
        details: {
          required: totalRequiredQuantity,
          scanned: totalScannedQuantity,
          source_breakdown: quantities.sourceBreakdown,
        },
      });
    }

    if (skuDoc.sku_type === "bundle") {
      const bundleItem = order.line_items.find(
        (item) => item.sku === skuDoc.sku,
      );
      if (!bundleItem) {
        return res
          .status(400)
          .json({ error: `Bundle ${skuDoc.sku} not found in order` });
      }

      const checkComponentsAvailability = async () => {
        for (const bi of skuDoc.bundle_items) {
          const componentQuantities = await calculateSkuQuantities(
            order,
            bi.sku,
            user.shop_domain,
          );
          if (
            componentQuantities.scanned + bi.quantity >
            componentQuantities.required
          ) {
            return false;
          }
        }
        return true;
      };

      const allComponentsAvailable = await checkComponentsAvailability();
      if (!allComponentsAvailable) {
        return res.status(409).json({
          error:
            "Cannot scan bundle - components would exceed required quantity",
        });
      }

      for (const bi of skuDoc.bundle_items) {
        bundleItem.component_scans = bundleItem.component_scans || {};
        const currentScans = bundleItem.component_scans[bi.sku] || 0;
        bundleItem.component_scans[bi.sku] = currentScans + bi.quantity;
      }
    } else {
      const scanAvailability = await canScanComponent(
        order,
        skuDoc.sku,
        user.shop_domain,
      );
      if (!scanAvailability.canScan) {
        return res
          .status(400)
          .json({ error: "Could not find where to apply this scan" });
      }

      if (scanAvailability.type === "regular") {
        const item = scanAvailability.item;
        const currentScans = item.scan?.scanned_qty || 0;
        item.scan = item.scan || { scanned_qty: 0 };
        item.scan.scanned_qty = currentScans + 1;
        item.scan.last_scanned_at = new Date();
        item.scan.scanned_by = {
          admin_id: user.admin_id,
          name: agentName,
          role: user.role,
        };
      } else {
        const bundleItem = scanAvailability.item;
        const componentSku = scanAvailability.componentSku;
        bundleItem.component_scans = bundleItem.component_scans || {};
        const currentComponentScans =
          bundleItem.component_scans[componentSku] || 0;
        bundleItem.component_scans[componentSku] = currentComponentScans + 1;
      }
    }

    await PackingScanLog.create({
      order_id: order._id,
      order_name: order.order_name,
      shop_domain: user.shop_domain,
      sku: skuDoc.sku,
      scan_type: "sku",
      title: skuDoc.product_name || "",
      scanned_by: {
        admin_id: user.admin_id,
        name: agentName,
        role: user.role,
      },
      scanned_at: new Date(),
      action: "scan",
      metadata: {
        total_required: totalRequiredQuantity,
        total_scanned: totalScannedQuantity + 1,
        source_breakdown: quantities.sourceBreakdown,
      },
    });

    await orders.updateOne(
      { _id: order._id },
      {
        $set: {
          line_items: order.line_items,
          updatedAt: new Date(),
        },
        $push: {
          scan_logs: {
            agent_id: user.admin_id,
            agent_name: agentName,
            role: user.role,
            sku: skuDoc.sku,
            scanned_at: new Date(),
          },
        },
      },
    );

    const allItemsScanned = await checkAllItemsScanned(order, user.shop_domain);
    const trackingScanned = order.tracking?.scan_status === "scanned";

    let newScanStatus = order.scan_status;
    if (allItemsScanned && trackingScanned) {
      newScanStatus = "scanned";
    } else if (allItemsScanned) {
      newScanStatus = "tracking_label_pending";
    } else {
      newScanStatus = "items_scanned";
    }

    if (newScanStatus !== order.scan_status) {
      await orders.updateOne(
        { _id: order._id },
        {
          $set: {
            scan_status: newScanStatus,
            ...(newScanStatus === "scanned"
              ? {
                  scanned_at: new Date(),
                  scanned_by: {
                    agent_id: user.admin_id,
                    name: agentName,
                    role: user.role,
                  },
                }
              : {}),
          },
        },
      );
    }

    await admins.updateOne(
      {
        admin_id: user.admin_id,
        shop_domain: user.shop_domain,
      },
      {
        $set: {
          active_order_status: allItemsScanned
            ? "items_completed"
            : "items_in_progress",
        },
      },
    );

    const expandedItems = await expandLineItems(
      order.line_items,
      user.shop_domain,
    );
    const newTotalScanned = totalScannedQuantity + 1;

    let nextAction = "scan_next_sku";
    let statusMessage = `${skuDoc.product_name || skuDoc.sku} scanned (${newTotalScanned}/${totalRequiredQuantity})`;

    if (allItemsScanned && !trackingScanned) {
      nextAction = "scan_tracking";
      statusMessage = `✅ All items scanned! ${skuDoc.product_name || skuDoc.sku} scanned (${newTotalScanned}/${totalRequiredQuantity}). Now scan tracking label.`;
    } else if (allItemsScanned && trackingScanned) {
      nextAction = "complete";
      statusMessage = `✅ Order complete! ${skuDoc.product_name || skuDoc.sku} scanned (${newTotalScanned}/${totalRequiredQuantity})`;
    }

    return res.json({
      success: true,
      mode: "item_scanned",
      order_name: order.order_name,
      sku: skuDoc.sku,
      sku_type: skuDoc.sku_type,
      message: statusMessage,
      order_status: newScanStatus,
      next_action: nextAction,
      progress: {
        scanned: newTotalScanned,
        required: totalRequiredQuantity,
        percentage: Math.round((newTotalScanned / totalRequiredQuantity) * 100),
        source_breakdown: quantities.sourceBreakdown,
      },
      agent: {
        id: user.admin_id,
        name: agentName,
        role: user.role,
      },
      items: expandedItems,
    });
  }

  // --------------------------------------------------------------
  // 3️⃣ TRACKING NUMBER SCAN
  // --------------------------------------------------------------
  if (tracking_number) {
    const agent = await admins.findOne({
      admin_id: user.admin_id,
      shop_domain: user.shop_domain,
    });

    if (!agent?.active_order) {
      return res
        .status(400)
        .json({ error: "No active order. Scan order barcode first." });
    }

    const order = await orders.findOne({
      order_name: agent.active_order,
      shop_domain: user.shop_domain,
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.tracking?.number !== tracking_number) {
      return res
        .status(400)
        .json({ error: "Tracking number doesn't match this order" });
    }

    if (order.tracking?.scan_status === "scanned") {
      return res.status(409).json({ error: "Tracking already scanned" });
    }

    const allItemsScanned = await checkAllItemsScanned(order, user.shop_domain);
    if (!allItemsScanned) {
      const expandedItems = await expandLineItems(
        order.line_items,
        user.shop_domain,
      );
      const pendingItems = expandedItems.filter((item) => item.pending_qty > 0);
      return res.status(400).json({
        error: "Scan all items before tracking",
        details: {
          pending_items: pendingItems.map((item) => ({
            sku: item.sku,
            name: item.product_name,
            pending: item.pending_qty,
            total: item.ordered_qty,
          })),
        },
      });
    }

    await orders.updateOne(
      { _id: order._id },
      {
        $set: {
          "tracking.scan_status": "scanned",
          "tracking.scanned_at": new Date(),
          "tracking.scanned_by": {
            agent_id: user.admin_id,
            name: agentName,
            role: user.role,
          },
          scan_status: "scanned",
          scanned_at: new Date(),
          scanned_by: {
            agent_id: user.admin_id,
            name: agentName,
            role: user.role,
          },
        },
        $push: {
          scan_logs: {
            agent_id: user.admin_id,
            agent_name: agentName,
            role: user.role,
            tracking_number,
            scan_type: "tracking",
            scanned_at: new Date(),
          },
        },
      },
    );

    await PackingScanLog.create({
      order_id: order._id,
      order_name: order.order_name,
      shop_domain: user.shop_domain,
      tracking_number,
      scan_type: "tracking",
      scanned_by: {
        admin_id: user.admin_id,
        name: agentName,
        role: user.role,
      },
      scanned_at: new Date(),
      action: "scan",
    });

    await admins.updateOne(
      {
        admin_id: user.admin_id,
        shop_domain: user.shop_domain,
      },
      { $set: { active_order: null, active_order_status: null } },
    );

    return res.json({
      success: true,
      mode: "tracking_scanned",
      order_name: order.order_name,
      message: "✅ Order scanning completed successfully",
      agent: {
        id: user.admin_id,
        name: agentName,
        role: user.role,
      },
    });
  }

  return res.status(400).json({ error: "Invalid request" });
}
