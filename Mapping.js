export default function App() {
    const books=['book1','book2','book3'];

    const pair={
        adi : 1,
        abhi2 : 2,
        soz : 3,
    }
  return(
      <div>
          {books.map((book)=>(
              <div key={book}> {book}</div>
          
          ))}
         <div>
             { Object.entries(pair).map(([name,value])=>(
               <div key={name}>
                   
                   {name}:{value}
               
               </div>      
              )) }
         </div>
      </div>
      );
}
