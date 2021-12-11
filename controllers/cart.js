const Cart = require('../models/Cart');

const UserGradeSubjectList = require('../models/UserGradeSubjectList');

exports.gotoCart = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('tutor/Cart', {
        pageTitle: 'Cart',
        cart: cart
    });
};

exports.removeCart = (req, res) => {
   let id = req.params.id;
   if(/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
       Cart.removeFromCart(parseInt(id, 10), req.session.cart);
       res.redirect('tutor/Cart');
   } else {
       res.redirect('/');
   }
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
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    let cart = (req.session.cart) ? req.session.cart : null;
    let i = (!Array.isArray(ids)) ? [ids] : ids;
    let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
    Cart.updateCart(i, q, cart);
    res.redirect('/cart');
};

exports.getCheckout = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('tutor/Checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false
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
