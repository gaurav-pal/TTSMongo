const Cart = require('../models/Cart');
const paypal = require('paypal-rest-sdk');
const UserList = require('../models/User');
const { json } = require('body-parser');
const { ConnectionPolicyContext } = require('twilio/lib/rest/voice/v1/connectionPolicy');
const { db } = require('../models/User');
const PaypalRes = require('../models/PaypalResponse');
const { result } = require('lodash');

paypal.configure({
    'mode': process.env.PAYPAL_MODE, 
    'client_id': process.env.PAYPAL_ID,
    'client_secret': process.env.PAYPAL_SECRET
  });

exports.gotoCart = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('tutor/Cart', {
        pageTitle: 'Cart',
        cart: cart
    });
};

exports.emptyCart = (req, res) => {
    Cart.emptyCart(req);
    res.redirect('/cart');
};

exports.postCart = (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let TeacherId = req.body.TeacherId;
    let Subject = req.body.Subject;
    let GradeLevel = req.body.GradeLevel;
    let Picture = req.body.Picture;
    let Rate = req.body.Rate;
    if(qty > 0) {
        let cart = (req.session.cart) ? req.session.cart : null;
        Cart.addToCart(TeacherId, qty, Subject, GradeLevel, Picture, Rate, cart);
        res.render('tutor/Cart', {
            pageTitle: 'Cart',
            cart: cart
        });
    } else {
        res.redirect('/');
    }
};

exports.updateCart = (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let TeacherId = req.body.TeacherId;
    let Subject = req.body.Subject;
    let GradeLevel = req.body.GradeLevel;
    let Picture = req.body.Picture;
    let Rate = req.body.Rate;
    let Action = req.body.submit;
    
    let cart = (req.session.cart) ? req.session.cart : null;
    if(qty > 0 && Action == "Update"){
        Cart.updateCart(TeacherId, Subject, GradeLevel, qty, cart);
    }
    else{
        Cart.removeFromCart(TeacherId, Subject, GradeLevel, cart);
    }
    res.render('tutor/Cart', {
        pageTitle: 'Cart',
        cart: cart
    });  
    
};

exports.getCheckout = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    if (!(req.user)) {
        const vErrors = [];
        vErrors.push({ msg: 'Please Login Or Create Account.' });
        req.flash('errors', vErrors);
        return res.redirect('/login');
    }

    res.render('tutor/Checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
        
    });
};

exports.postCheckout = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('tutor/Checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: true
    });
};

exports.PayPalPayment = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;

    let Items = [];    

    for (let i = 0; i < cart.items.length; i++) {
        //console.log(cart.items[i]);
        let item = new Object();        
        //item.sku = 
        item.name = cart.items[i].Subject + "|" + cart.items[i].GradeLevel; //127 characters
        item.description = cart.items[i].TeacherId;
        // cart.items[i].qty
        item.quantity = cart.items[i].qty; // max 10
        item.price = cart.items[i].Rate; // 10 characters
        item.currency  = "USD";
        //item.tax = "";
        //item.url  = "";       
        Items.push(item);              
    }

    if(cart && cart.items.length > 0){
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": process.env.PAYPAL_RETURN_URL,
                "cancel_url": process.env.PAYPAL_CANCEL_URL
            },
            "transactions": [{
                "item_list": {
                    "items": Items
                },
                "amount": {
                    "currency": "USD",
                    "total": cart.totals
                },
                "description": "User: " + req.user.email
            }]
        };
        
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
                    }
                }
            }
        }); 
    }    
};

exports.PayPalSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": cart.totals
            }
        }]
    };

    // Obtains the transaction details from paypal
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            //console.log(JSON.stringify(payment));
            var ppres = new PaypalRes({UserID: req.user.id,  PaypalResponse: JSON.stringify(payment)});
            ppres.save(function(err,ppresponse){
                if(!err) {
                    Cart.emptyCart(req);
                    res.render('tutor/PaypalSuccess', {
                        title: 'Paypal Payment Success'
                    });  
                }                
                else {
                    return console.error(err);
                }
            });
        }
    });
};

exports.PayPalCancel = (req, res) => {
    res.render('tutor/PaypalCancel', {
        title: 'Paypal Payment Cancel'
    });  
};