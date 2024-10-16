. emit()  // send syntax --> .emit('n',"message")
. on ()  // receive  syntax --> .on('n' , (a) => {})      
. to () // specific to syntax socket.to().emit() to trigger event for particular room
. join()       // syntax --> socket.join(room_name) // join room_name
. broadcast() // uske chudke other ko syntax --> socket.broadcast.emit()
// broadcast ek circuit me socket par use karte hai
// every socket is already in room