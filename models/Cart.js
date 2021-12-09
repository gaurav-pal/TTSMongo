
class Cart {
    static addToCart(TeacherId, qty = 1, Subject, GradeLevel, Rate, cart) {
        if(!this.inCart(TeacherId, Subject, GradeLevel, Rate, cart)) {
            let format = new Intl.NumberFormat(process.env.LANG, {style: 'currency', currency: process.env.CURRENCY });
            let prod = {
              TeacherId: TeacherId,
              Subject: Subject,
              Rate: Rate,
              qty: qty,
              GradeLevel: GradeLevel,
              formattedPrice: format.format(Rate)
            };
            cart.items.push(prod);
            this.calculateTotals(cart);
        }
    }

    static removeFromCart(id = 0, cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.id === id) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }

    }

    static updateCart(ids = [], qtys = [], cart) {
        let map = [];
        let updated = false;

        ids.forEach(id => {
           qtys.forEach(qty => {
              map.push({
                  id: parseInt(id, 10),
                  qty: parseInt(qty, 10)
              });
           });
        });
        map.forEach(obj => {
            cart.items.forEach(item => {
               if(item.id === obj.id) {
                   if(obj.qty > 0 && obj.qty !== item.qty) {
                       item.qty = obj.qty;
                       updated = true;
                   }
               }
            });
        });
        if(updated) {
            this.calculateTotals(cart);
        }
    }

    static inCart(TeacherId = "", Subject="", GradeLevel="", cart) {
        let found = false;
        cart.items.forEach(item => {
           if(item.TeacherId === TeacherId && item.GradeLevel == GradeLevel && item.Subject == Subject) {
               found = true;
           }
        });
        return found;
    }

    static calculateTotals(cart) {
        cart.totals = 0.00;
        cart.items.forEach(item => {
            let price = item.Rate;
            let qty = item.qty;
            let amount = price * qty;

            cart.totals += amount;
        });
        this.setFormattedTotals(cart);
    }

   static emptyCart(request) {
        
        if(request.session) {
            request.session.cart.items = [];
            request.session.cart.totals = 0.00;
            request.session.cart.formattedTotals = '';
        }


    }

    static setFormattedTotals(cart) {
        let format = new Intl.NumberFormat(process.env.LANG, {style: 'currency', currency: process.env.CURRENCY });
        let totals = cart.totals;
        cart.formattedTotals = format.format(totals);
    }

}

module.exports = Cart;
