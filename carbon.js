const express = require("express");
const router = express.Router();

// Static emission factors in kg CO₂e
const emissionFactors = {
laptop: 300,
smartphone: 70,
battery: 0.25,
tv: 300,
fridge: 400
};

router.get("/carbon-savings", (req, res) => {
const item = req.query.item?.toLowerCase();
const action = req.query.action?.toLowerCase();

if (!emissionFactors[item] || !["repair", "recycle"].includes(action)) {
return res.status(400).json({ error: "Invalid input" });
}

const base = emissionFactors[item];
const savings = action === "repair" ? base : (base * 0.5); // 50% recovery for recycle

res.json({ savings: savings.toFixed(2) });
});

module.exports = router;
