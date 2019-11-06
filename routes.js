const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.post('/login', controller.login)

router.post('/users/:email', controller.getUser)

router.post('/register', controller.createUser)

// COP Routes

router.post('/feed', controller.getFeed)

router.post('/post/:id', controller.getPostInfo)

router.post('/getuserbookmarks/:id', controller.getUserBookmarks)

router.post('/createcustomerorder', controller.createCustomerOrder)

router.post('/additemstoorder', controller.addCartItemsToOrder)

router.post('/getcustomerorder/:id', controller.getCustomerOrder)

router.post('/getallcustomerorders/:id', controller.getAllCustomerOrders)

router.put('/addinstructions/:id', controller.addInstructions)

router.put('/confirmcustomermorder/:id', controller.confirmCustomerOrder)

router.put('/changequantity/:id', controller.changeQuantity)

router.delete('/deletecartitem/:id', controller.deleteCartItem)

router.delete('/emptycart/:id', controller.emptyCart)

// WMS Routes

router.post('/getinv/:id', controller.getInventory)

router.post('/getwarehouseorders/:id', controller.getWarehouseOrders)

router.post('/getorderbyid/:id', controller.getOrderById)

router.post('/getorderinv/:id', controller.getOrderInv)

router.post('/getemployees/:id', controller.getEmployees)

router.delete('/product/:id', controller.deleteProduct)

router.put('/assignemployee/:id', controller.assignEmployee)

router.put('/updateproductquantity/:id', controller.updateProductQuantity)

router.put('/replenishproduct/:id', controller.replenishProduct)

router.put('/updateorderstatus/:id', controller.updateOrderStatus)

router.put('/orderitemiscompleted', controller.orderItemIsCompleted)

router.put('/updatetransportinfo/:id', controller.updateTransportInfo)

router.put('/updatecountrate/:id', controller.updateCountRate)

// RECEIVING Routes

router.post('/getemployeeorders/:id', controller.getWarehouseEmployeeOrders)

module.exports = router