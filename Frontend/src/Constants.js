const prod = {
    url: {
        BASE_URL: 'https://takeoutproject.herokuapp.com/api'
    }
};
const dev = {
    url: {
        BASE_URL: 'http://localhost:3000'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : prod;