from flask import Flask, render_template, request

app = Flask(__name__)

# Define a list of coffee products with their name, description, price, and image URL
products = [
    {"name": "Espresso", "description": "A strong and concentrated coffee.", "price": 2.99, "image": "espresso.jpg"},
    {"name": "Cappuccino", "description": "A classic Italian coffee with equal parts espresso, steamed milk, and frothed milk.", "price": 3.99, "image": "cappuccino.jpg"},
    {"name": "Latte", "description": "A smooth and creamy coffee made with espresso and steamed milk.", "price": 4.99, "image": "latte.jpg"},
    {"name": "Mocha", "description": "A sweet and indulgent coffee made with espresso, chocolate, and steamed milk.", "price": 5.99, "image": "mocha.jpg"}
]

# Define a list to store items in the shopping cart
cart = []

@app.route('/')
def index():
    # Render the index template with the list of coffee products
    return render_template('index.html', products=products)

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    # Get the name and price of the selected product from the request data
    name = request.form['name']
    price = float(request.form['price'])
    # Add the product to the shopping cart
    cart.append({"name": name, "price": price})
    # Redirect to the shopping cart page
    return redirect('/cart')

@app.route('/cart')
def cart():
    # Calculate the total price of the items in the shopping cart
    total_price = sum(item["price"] for item in cart)
    # Render the cart template with the items in the shopping cart and the total price
    return render_template('cart.html', cart=cart, total_price=total_price)

if __name__ == '__main__':
    app.run(debug=True)
