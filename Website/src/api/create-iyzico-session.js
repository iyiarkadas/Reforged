// functions/index.js (or Express backend)
const functions = require("firebase-functions");
const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
  apiKey: "YOUR_IYZICO_API_KEY",
  secretKey: "YOUR_IYZICO_SECRET_KEY",
  // uri: "https://api.iyzipay.com" 
  uri: "https://sandbox-api.iyzipay.com"
});

exports.createIyzicoSession = functions.https.onRequest((req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).send("");
  }

  const { items, buyer, callbackUrl } = req.body;

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: `order_${Date.now()}`,
    price: totalPrice.toFixed(2),
    paidPrice: totalPrice.toFixed(2),
    currency: Iyzipay.CURRENCY.TRY,
    basketId: `B_${Date.now()}`,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: callbackUrl || "https://reforged.com.tr/payment-result",
    buyer: {
      id: buyer.id || `USR_${Date.now()}`,
      name: buyer.firstName,
      surname: buyer.lastName,
      gsmNumber: buyer.phone,
      email: buyer.email,
      identityNumber: buyer.identityNumber || "11111111111",
      registrationAddress: buyer.address,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1",
      city: buyer.city,
      country: "Turkey"
    },
    shippingAddress: {
      contactName: `${buyer.firstName} ${buyer.lastName}`,
      city: buyer.city,
      country: "Turkey",
      address: buyer.address
    },
    billingAddress: {
      contactName: `${buyer.firstName} ${buyer.lastName}`,
      city: buyer.city,
      country: "Turkey",
      address: buyer.address
    },
    basketItems: items.map((item, index) => ({
      id: `BI_${item.id}_${index}`,
      name: item.name,
      category1: "Giyim",
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: (item.price * item.quantity).toFixed(2)
    }))
  };

  iyzipay.checkoutFormInitialize.create(request, (err, result) => {
    if (err || result.status !== "success") {
      return res.status(400).json({ error: result?.errorMessage || err });
    }
    // Return the HTML script snippet to the frontend
    return res.status(200).json({
      checkoutFormContent: result.checkoutFormContent,
      token: result.token
    });
  });
});