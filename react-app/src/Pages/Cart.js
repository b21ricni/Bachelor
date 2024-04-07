const Cart = () => {
  return (
    <>
      <div className="">
        {Array(5).fill().map(index => {
          return <div key={index}>
              <p>Hej testing {index}</p>
            </div>
        })}
      </div>
    </> 
  )
}

export default Cart;