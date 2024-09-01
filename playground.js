let cart = [];
const trakingActionHistory = [];
const actionTraker = function (
  actionType,
  nameOfProduct,
  quantityOfProduct,
  price
) {
  // console.log("is it called for the action of", actionType)

  let action = {
    actionType,
    nameOfProduct,
    quantityOfProduct,
    price,
  };
  // console.log('loging the last action from action traker funtion', action)
  trakingActionHistory.push(action);
};

const maintainCart = () => {
  let couponCode = `Bangladesh 2.0`;

  // add item into cart
  function addItem(name = "product Name", quantity, price) {
    if (quantity < 1) {
      return "quantity cant be nagitive number or zero";
    }
    if (!price) {
      return "price cant be a falsy value";
    }
    let createProductForCart = {
      name,
      quantity,
      price,
    };

    actionTraker("add", name, quantity, price);

    cart.push(createProductForCart);
    return cart;
  }

  // removing items by name

  function removingItems(productName) {
    let productToRemoved = productName.toLowerCase();
    let length = cart.length;
    let isDeleted = true;

    if (cart.length < 1) {
      return "your cart is empty";
    }

    for (let i = 0; i < length; i++) {
      if (cart[i].name.toLowerCase() === productToRemoved.toLowerCase()) {
        //pushing in action tracking array
        actionTraker("remove", cart[i].name, cart[i].quantity, cart[i].price);
        let deletedProduct = cart.splice(i, 1);

        return {
          deletedProduct,
          cart,
          message: `the product named ${productName} is removed from the cart`,
        };
      } else {
        isDeleted = false;
      }
    }
    if (!isDeleted) {
      return {
        cart,
        message: `${productToRemoved} is not in the cart, please make sure you have enter a valid product name`,
      };
    }
  }

  // calculate total price

  function calculateTotalPriceOfCart() {
    let totalPrice = 0;
    if (cart.length) {
      for (let i = 0; i < cart.length; i++) {
        let totalPriceOfSingleProduct = cart[i].price * cart[i].quantity;

        totalPrice = totalPrice + totalPriceOfSingleProduct;
      }
    }
    return totalPrice;
  }

  // update product information

  function updateProductInformation(name, { price, quantity }) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name.toLowerCase() === name.toLowerCase()) {
        cart[i] = {
          name,
          price,
          quantity,
        };
      }
    }
    return {
      cart,
      message: `${name} is updated`,
    };
  }

  // Item Quantity Management:

  function manageQuantity(productName, incriment, decriment, quantities) {
    if (incriment === true && decriment === true) {
      return "you can not do increment and decriment at the same time";
    }
    if (incriment === false && decriment === false) {
      return "you can not do increment and decriment at the same time";
    }
    if (incriment && !Number.isFinite(incriment)) {
      return `increment should be in Number Format`;
    }
    if (decriment && !Number.isFinite(decriment)) {
      return `dicrement should be in Number Format`;
    }

    let productToBeManaged;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name.toLowerCase() === productName.toLowerCase) {
        productToBeManaged = cart[i];
      }
    }

    if (incriment) {
      productToBeManaged.quantity += quantities;
      return `successfully increase the quantity of of${productToBeManaged.name} `;
    }

    if (decriment) {
      if (decriment > productToBeManaged.quantity) {
        return "you cant not removd more item than what you have in your stock";
      } else {
        productToBeManaged.quantity -= quantities;
      }
    }
    return {
      cart,
      message: `quantity of ${productToBeManaged.name} has been successfully ${
        incriment ? "increased" : "discread"
      }`,
    };
  }

  // Discounts and Coupons:

  const handelDiscountAndCuupons = function (
    givenCouponCode,
    discountPercentage
  ) {
    if (givenCouponCode === couponCode) {
      let totalAmountIncart = calculateTotalPriceOfCart();
      let discount = totalAmountIncart * (discountPercentage / 100);
      let priceAfterDiscout = Math.floor(totalAmountIncart - discount);

      return {
        totalAmmountOfCartBeforeDiscount: totalAmountIncart,
        totalAmmountOfCartAfterDiscount: priceAfterDiscout,
      };
    } else {
      return "cupons code dose not match any available coupons right now";
    }
  };

  // Tax Calculation:

  const taxCalculation = function (percentageOfTax) {
    const totalPriceInCart = calculateTotalPriceOfCart();
    const calculedTax = (totalPriceInCart * percentageOfTax) / 100;
    const amountToBePaidWithTaxt = totalPriceInCart + calculedTax;
    return amountToBePaidWithTaxt;
  };
  // multi ccurrency

  const multiCurrencyHandel = function (tergatedCurrency = "BDT") {
    // an fixid currency rate from usd to other currency

    const currencyValues = [
      (toBDT = {
        crCode: "BDT",
        type: "multiply",
        by: 100,
      }),
      (toINR = {
        crCode: "INR",
        type: "multiply",
        by: 100,
      }),

      (toPkr = {
        crCode: "PKR",
        type: "multiply",
        by: 150,
      }),
      (toQuetyDinner = {
        crCode: "QDR",
        type: "division",
        by: 2,
      }),
    ];
    for (let i = 0; i < currencyValues.length; i++) {
      if (tergatedCurrency === currencyValues[i].crCode) {
        let priceInCart = calculateTotalPriceOfCart();
        let convertedPrice;
        // console.log(currencyValues[i])
        if (currencyValues[i].type === "multiply") {
          // console.log('is it working?')
          convertedPrice = priceInCart * currencyValues[i].by;
          return {
            priceInBaseCurrency: priceInCart,
            priceAfterConversion: convertedPrice,
            message: `your base is in USD and you converted your price in ${tergatedCurrency}`,
          };
        }
        if (currencyValues[i].type === "division") {
          convertedPrice = priceInCart / currencyValues[i].by;
          return {
            priceInBaseCurrency: priceInCart,
            priceAfterConversion: convertedPrice,
            message: `your base is in USD and you converted your price in ${tergatedCurrency}`,
          };
        }
      } else {
        return "Sorry, right now we dont support the currency you are willing for!";
      }
    }
    return {
      message: "something went Wrong",
    };
  };

  return {
    cart,
    addItem,
    removingItems,
    calculateTotalPriceOfCart,
    updateProductInformation,
    manageQuantity,
    handelDiscountAndCuupons,
    taxCalculation,
    multiCurrencyHandel,
  };
};

const undoLastAction = function () {
  if (cart) {
    const lastAction = trakingActionHistory.pop();
    if (lastAction.actionType === "add") {
      cart.pop();
    }
    if (lastAction.actionType === "remove") {
      cart.push({
        name: lastAction.nameOfProduct,
        quantity: lastAction.quantityOfProduct,
        price: lastAction.price,
      });
    }
  }
};

const productCart = maintainCart();

productCart.addItem("keyboard", 6, 12);
productCart.addItem("mouse", 20, 7);
productCart.addItem("Monitor", 4, 200);
productCart.addItem("PC", 5, 999);
productCart.removingItems("Pc");
console.log(cart, " before undo last Action");
undoLastAction();
