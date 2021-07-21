const orderBook = (existingBook, incomingOrder) => {
  // Check if exisitingBook has any values
  if (existingBook.length <= 0) return [incomingOrder]

  // Loop through exisiting book using a for..of loop. Also extracting iteration indexes
  for (const [index, currentOrder] of existingBook.entries()) {
    // Put special criteria into own variable, to clean up code
    // eslint-disable-next-line max-len
    const misMatchCriteria = ((incomingOrder.type === 'sell' && (incomingOrder.price <= currentOrder.price)) || (incomingOrder.type === 'buy' && incomingOrder.price >= currentOrder.price))
    const matchingPriceCriteria = currentOrder.price === incomingOrder.price

    if (currentOrder.type !== incomingOrder.type && misMatchCriteria) {
      if (currentOrder.quantity === incomingOrder.quantity) {
        existingBook.splice(index, 1)

        return existingBook
      } else if (currentOrder.quantity > incomingOrder.quantity && matchingPriceCriteria) {
        currentOrder.quantity -= incomingOrder.quantity
        existingBook.push(...existingBook.splice(index, 1))

        return existingBook
      } else if (incomingOrder.quantity > currentOrder.quantity && matchingPriceCriteria) {
        incomingOrder.quantity -= currentOrder.quantity
        existingBook.splice(index, 1)
        // If there still are existing objects that match incoming order, use recursion to call function again
        if (existingBook.some(order => order.type !== incomingOrder.type && order.price === incomingOrder.price)) {
          return orderBook(existingBook, incomingOrder)
        }

        return existingBook.concat(incomingOrder)
      }
    } else {
      return existingBook.concat(incomingOrder)
    }
  }

  return existingBook
}

module.exports = orderBook

