const Cart = require('../models/Cart');

const UserGradeSubjectList = require('../models/UserGradeSubjectList');

exports.gotoCart = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('tutor/cart', {
        pageTitle: 'Cart',
        cart: cart
    });
};

exports.removeCart = (req, res) => {
   let id = req.params.id;
   if(/^\d+$/.test(id) && Security.isValidNonce(req.params.nonce, req)) {
       Cart.removeFromCart(parseInt(id, 10), req.session.cart);
       res.redirect('tutor/cart');
   } else {
       res.redirect('/');
   }
};

exports.emptyCart = (req, res) => {
    if(Security.isValidNonce(req.params.nonce, req)) {
        Cart.emptyCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
};

exports.postCart = (req, res) => {
    let qty = parseInt(req.body.qty, 10);
    let TeacherId = req.body.TeacherId;
    let Subject = req.body.Subject;
    let GradeLevel = req.body.GradeLevel;
    let Rate = req.body.Rate;
    if(qty > 0) {
        // Products.findOne({product_id: product}).then(prod => {
        let cart = (req.session.cart) ? req.session.cart : null;
        Cart.addToCart(TeacherId, qty, Subject, GradeLevel, Rate);
        res.render('tutor/Cart');
        // }).catch(err => {
        //    res.redirect('/');
        // });
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
    res.render('checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
};

exports.postCheckout = (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    if(Security.isValidNonce(req.body.nonce, req)) {
        res.render('checkout', {
            pageTitle: 'Checkout',
            cart: cart,
            checkoutDone: true
        });
    } else {
        res.redirect('/');
    }
};
