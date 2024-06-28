## Unit Assignment: Student Store

Submitted by: **Kailey Chavez**
Hours spent: **12**

### Application Features

#### CORE FEATURES

- [x] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [x] Use the provided schema to create tables for `products`, `orders`, and `order_items`.
- [x] **Products Model**: Develop a model to represent individual items available in the store. 
  - [x] This model should include attributes such as `id`, `name`, `description`, `price`, `image_url`, and `category`.
  - [x] Implement methods for CRUD operations on products.
  - [x] Ensure transaction handling for the deletion of products to also delete related `order_items`
- [x]**Orders Model**: Develop a model to manage orders. 
  - [x] This model should include attributes such as `order_id`, `customer_id`, `total_price`, `status`, and `created_at`.
  - [x] Implement methods for creating, fetching, updating, and deleting orders.
  - [x] Ensure transaction handling for the deletion of orders to also delete related `order_items`
- [x] **Order Items Model**: Develop a model to represent the items within an order. 
  - [x] This model should include attributes such as `order_item_id`, `order_id`, `product_id`, `quantity`, and `price`.
  - [x] Implement methods for fetching and creating order items.
- [x] **API Endpoints**
  - [x] **Product Endpoints**:
    - [x] `GET /products`: Fetch a list of all products.
    - [x] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [x] `POST /products`: Add a new product to the database.
    - [x] `PUT /products/:id`: Update the details of an existing product.
    - [x] `DELETE /products/:id`: Remove a product from the database.
  - [x] **Order Endpoints**:
    - [x] `GET /orders`: Fetch a list of all orders.
    - [x] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [x] `POST /orders`: Create a new order with order items.
    - [x] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [x] `DELETE /orders/:order_id`: Remove an order from the database.
- [x] **Frontend Integration**
  - [x] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.


#### STRETCH FEATURES

- [x] **Added Endpoints**
  - [x] Create an endpoint for fetching all orders in the database.
  - [x] Create an endpoint for serving an individual order based on its ID.
- [ ] **Filter Orders**
  - [ ] Allow users to use an input to filter orders by the email of the person who placed the order.
- [ ] **Implement Your Own Frontend**
  - [ ] Build your own user interface for browsing products, managing the shopping cart, and placing orders. This will involve integrating the frontend you create with the backend API you developed during the project.
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders. The user should be able to click on any individual order to take them to a more detailed page of the transaction.


### Walkthrough Video

<div>
    <a href="https://www.loom.com/share/78902c0b74274018814f33f3027787cb">
      <p>Kailey Chavez - Student Store - Pt. 1 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/78902c0b74274018814f33f3027787cb">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/78902c0b74274018814f33f3027787cb-with-play.gif">
    </a>
  </div>


<div>
    <a href="https://www.loom.com/share/511d8ea2d5634a0abc5d6c1df9eb82b0">
      <p>Kailey Chavez - Student Store - Pt. 2 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/511d8ea2d5634a0abc5d6c1df9eb82b0">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/511d8ea2d5634a0abc5d6c1df9eb82b0-with-play.gif">
    </a>
  </div>


<div>
    <a href="https://www.loom.com/share/eb0c46ee92224d55b952e0721c55c731">
      <p>Kailey Chavez - Student Store - Pt. 3 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/eb0c46ee92224d55b952e0721c55c731">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/eb0c46ee92224d55b952e0721c55c731-1719547328250-with-play.gif">
    </a>
</div>

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I would say that I did feel prepared to complete the assignment with  one-on-one support from the CodePath instructors and the code-along examples from our lessons. I did feel a bit unprepared to complete milestone 6.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would have definitely liked to have worked more on stretch features. In terms of changing the way my project responded to a certain event, I would have liked for it to have been able to sort the products by certain filters.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

My project demo went great! I received positive feedback on my project, which made me happy because I was proud of it. I was also able to share some tips on how to address a particular problem in the project.

### Open-source libraries used

- No open-source libraries were used, but StackOverflow, YouTube, MDN Web Docs, and Prisma documentation were used.

### Shout out

Shout out to Devarsh, Keith, Alex, Mabel, Chris, and Nathan for their guidance and support throughout this entire project!