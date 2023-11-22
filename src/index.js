const app = require("./app");
const {PORT} = process.env;

const startApp = () => {
    app.listen(PORT,() => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};
    
startApp();
