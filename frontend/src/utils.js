export const getError = (error) => {
    return error.response && error.response.data.message ? 
            error.response.data.message : 
            error.message;
};

export const clearLocalStorage = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('__paypal_storage__');
}