from . import db
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.schema import CheckConstraint

class Book(db.Model,SerializerMixin):
    __tablename__ = 'books'
    
    serialize_rules = ('-orders.book',)
    
    id = db.Column(db.Integer, primary_key=True)
    book_name = db.Column(db.String(255), nullable=False)
    book_price = db.Column(db.Integer, nullable=False)
    book_author = db.Column(db.String(255), nullable=False)
    book_genre = db.Column(db.String(255), nullable=False)
    book_stock = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now()) 
    
    orders = db.relationship('Orders', back_populates='book')
    
    __table_args__=(
        CheckConstraint(
            'book_stock >= 0',
            name= 'stock_check'
        ),
        CheckConstraint(
            'book_price >= 0',
            name= 'price_check'
        ),
    )
    
    def __repr__(self):
        return f"<Book {self.book_name} {self.book_author} {self.book_genre} {self.book_price} {self.book_stock}>"  
    
    
class Customer(db.Model,SerializerMixin):
    __tablename__ = 'customers'
    
    serialize_rules = ('-orders.customer',)
    
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    orders = db.relationship('Orders', back_populates='customer')
    
    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if len(str(phone_number)) != 10:
            raise ValueError("Phone number must be 10 digits")
        return phone_number 
    
    def __repr__(self):
        return f"<Customer {self.customer_name} {self.phone_number}>"
    
class Order(db.Model,SerializerMixin):
    __tablename__ = 'orders'
    
    serialize_rules = ('-customer.orders', '-book.orders')
    
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.Integer, unique=True, nullable=False)
    date_issued = db.Column(db.DateTime, server_default=db.func.now())
    return_date = db.Column(db.DateTime)
    rent_fee = db.Column(db.Float)
    returned = db.Column(db.Boolean, default=False)
    
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    
    customer = db.relationship('Customer', back_populates='orders')
    book = db.relationship('Book', back_populates='orders')
    
    __table_args__=(
        CheckConstraint(
            'rent_fee >= 0',
            name= 'rent_fee_check'
        ),
        CheckConstraint(
            'return_date >= date_issued',
            name= 'return_date_check'
        )
    )
    
    def __repr__(self):
        return f"<Order {self.order_number} {self.date_issued} {self.return_date} {self.rent_fee} {self.returned}>"
    