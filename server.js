/**
 * Created by user on 22.06.2016.
 */
"use strict";

let app = require('./app');


app.listen(process.env.PORT || 3000, process.env.IP || 'localhost',function(){
    console.log('Server started');
});