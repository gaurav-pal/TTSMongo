const Cart = require('../models/Cart');

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
