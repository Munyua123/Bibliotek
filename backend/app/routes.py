from flask import render_template, Blueprint, jsonify, make_response,request
from models import Book, Customer, Order
from flask_restful import Resource
from . import db, api, app
from datetime import datetime, timedelta

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

# This endpoint is for all customer information
class CustomerData(Resource):
    def get(self,id):
        customer = Customer.query.filter_by(id=id).first()
        
        if not customer:
            return {"message": "Customer not found"}, 404
        
        response_dict = customer.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    
    def put(self, id):
        customer = Customer.query.filter_by(id=id).first()
        
        if not customer:
            return {"message": "Customer not found"}, 404
        
        data = request.json
        customer.customer_name = data.get('customer_name', customer.customer_name)
        customer.phone_number = data.get('phone_number', customer.phone_number)
        
        db.session.commit()
        
        response_dict = customer.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    
    def delete(self, id):
        customer = Customer.query.filter_by(id=id).first()
        
        if not customer:
            return {"message": "Customer not found"}, 404
        
        db.session.delete(customer)
        db.session.commit()
        
        response = make_response(jsonify({"message": "Customer deleted successfully"}), 200)
        return response
    
api.add_resource(CustomerData, '/customer/<int:id>')
    
# This endpoint is for customer registration and has the get to display all the customers
class CustomerRegistration(Resource):
    def get(self):
        customers = []
        
        for customer in Customer.query.all():
            customer_dict = {
                "id": customer.id,
                "customer_name": customer.customer_name,
                "phone_number": customer.phone_number,
            }
            customers.append(customer_dict)
            
        return make_response(jsonify({
            "Customer": customers,
            "total_customers": len(customers)
            }), 200)
        
    def post(self):
        data = request.json
        
        customer_name = data.get('customer_name')
        phone_number = data.get('phone_number')
        
        customer = Customer.query.filter_by(customer_name=customer_name).first()
        if customer is not None:
            response = make_response(jsonify({"message": "Customer already exists"}), 400)
            
            return response
        
        new_customer = Customer(
            customer_name=customer_name,
            phone_number=phone_number
        )
        db.session.add(new_customer)
        db.session.commit()
        response = make_response(jsonify({"message": "Customer created successfully"}), 201)
        response.headers['Content-Type'] = 'application/json'
        return response

api.add_resource(CustomerRegistration, '/customer')

class BookRegistration(Resource):
    def get(self):
        books = []
        
        for book in Book.query.all():
            book_dict = {
                "id": book.id,
                "book_name": book.book_name,
                "book_price": book.book_price,
                "book_author": book.book_author,
                "book_genre": book.book_genre,
                "book_stock": book.book_stock
            }
            books.append(book_dict)
            
        return make_response(jsonify({
            "books": books,
            "total_books": len(books)
            }), 200)
        
    def post(self):
        data = request.json
        
        book_name = data.get('book_name')
        book_price = data.get('book_price')
        book_author = data.get('book_author')
        book_genre = data.get('book_genre')
        book_stock = data.get('book_stock')
        
        new_book = Book(
            book_name=book_name,
            book_price=book_price,
            book_author=book_author,
            book_genre=book_genre,
            book_stock=book_stock
        )
        db.session.add(new_book)
        db.session.commit()
        
        response = make_response(jsonify({"message": "Book created successfully"}), 201)
        return response
    
api.add_resource(BookRegistration, '/book')

class BookData(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        
        if not book:
            return {"message": "Book not found"}, 404
        
        response_dict = book.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    def put(self, id):
        book = Book.query.filter_by(id=id).first()
        
        if not book:
            return {"message": "Book not found"}, 404
        
        data = request.json
        book.book_name = data.get('book_name', book.book_name)
        book.book_price = data.get('book_price', book.book_price)
        book.book_author = data.get('book_author', book.book_author)
        book.book_genre = data.get('book_genre', book.book_genre)
        book.book_stock = data.get('book_stock', book.book_stock)
        
        db.session.commit()
        
        response_dict = book.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        
        if not book:
            return {"message": "Book not found"}, 404
        
        db.session.delete(book)
        db.session.commit()
        
        response = make_response(jsonify({"message": "Book deleted successfully"}), 200)
        return response
    
api.add_resource(BookData, '/book/<int:id>')


class OrderRegistration(Resource):
    def get(self):
        orders = []
        
        for order in Order.query.all():
            order_dict = {
                "id": order.id,
                "customer_id": order.customer_id,
                "book_id": order.book_id,
                "return_date": order.return_date,
                "date_issued": order.date_issued,
                "order_number": order.order_number,
                "rent_fee": order.rent_fee,
                "returned": order.returned
            }
            orders.append(order_dict)
            
        return make_response(jsonify({
            "orders":orders,
            "total_orders": len(orders),
            "total_rent_fee": sum(order["rent_fee"] or 0  for order in orders)
            }), 200)
        
    def post(self):
        data = request.json
        
        customer_id = data.get('customer_id')
        book_id = data.get('book_id')
        return_date_str = data.get('return_date')
        
        try:
             return_date = datetime.fromisoformat(return_date_str)
        except ValueError:
            return {"message": "Invalid return date format"}, 400
        
        book = Book.query.filter_by(id=book_id).first()
        if not book:
            return {"message": "Book not found"}, 404
        
        date_issued = datetime.now()
        num_weeks = (return_date - date_issued).days // 7
        
        if num_weeks < 1:
            return {"message": "Return date must be at least 1 week from today"},
        
        rent_fee = book.book_price * num_weeks
        
        last_order = Order.query.order_by(Order.order_number.desc()).first()
        next_order_number = (last_order.order_number + 1) if last_order and last_order.order_number else 1
        
        new_order = Order(
            customer_id=customer_id,
            book_id=book_id,
            order_number=next_order_number,
            return_date=return_date,
            rent_fee=rent_fee
        )
        db.session.add(new_order)
        db.session.commit()
        
        response = make_response(jsonify({"message": "Order created successfully"}), 201)
        return response
api.add_resource(OrderRegistration, '/order')

class OrderData(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first()
        
        if not order:
            return {"message": "Order not found"}, 404
        
        response_dict = order.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    
    def put(self, id):
        order = Order.query.filter_by(id=id).first()
        
        if not order:
            return {"message": "Order not found"}, 404
        
        data = request.json
        order.returned = data.get('returned', order.returned)
        
        db.session.commit()
        
        response_dict = order.to_dict()
        
        response = make_response(jsonify(response_dict), 200)
        return response
    
    def delete(self, id):
        order = Order.query.filter_by(id=id).first()
        
        if not order:
            return {"message": "Order not found"}, 404
        
        db.session.delete(order)
        db.session.commit()
        
        response = make_response(jsonify({"message": "Order deleted successfully"}), 200)
        return response
api.add_resource(OrderData, '/order/<int:id>')
