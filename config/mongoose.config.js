const mongoose = require( 'mongoose' );

mongoose.set('strictQuery', true)

//Nombre de la base de datos
mongoose.connect( 'mongodb://127.0.0.1:27017/criticas_cine_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )
    .then( () => {
        console.log( "Connected Database" );
    })
    .catch( err => {
        console.log( "There was an error connecting to the database", err );
    });

mongoose.connection.on( 'error', (err) => {
    console.log( 'Mongoose error: ' + err );
    process.exit( 0 );
});

mongoose.connection.on( 'disconnected', () => {
    console.log( "Database offline" ); 
});