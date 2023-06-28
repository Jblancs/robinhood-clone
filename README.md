# Robingood (Robinhood-Clone)

Hi Welcome to Robingood, my clone of Robinhood by [Jordan Blancaflor](https://www.linkedin.com/in/jordan-blancaflor-a4577584/)

## Wiki
- [Redux Store](https://github.com/Jblancs/robinhood-clone/wiki/Redux-Store)
- [Features List](https://github.com/Jblancs/robinhood-clone/wiki/Features-List)
- [User Stories](https://github.com/Jblancs/robinhood-clone/wiki/User-Stories)
- [Schema](https://github.com/Jblancs/robinhood-clone/wiki/Schema)

## Overview & Functionality:
**Note: You can log in using the Demo User to experience all of the sites features.**

### Account Signup and login:
**Note: You can log in using the Demo User to experience all of the sites features.
- Users can create a new account or sign in with an existing account.

### Browsing the website:
**Note: Must be logged in to view any pages of the website other than [signup](https://aa-capstone-robingood.onrender.com/signup) and [login](https://aa-capstone-robingood.onrender.com/login). You can log in using the Demo User to experience all of the sites features.
- Portfolio and Account info
  - Your portfolio graph is shown on home page
  - You can also see the latest news articles on the current stock market
  - You can view your current investments and watchlists on the side bar
  - Users are able to search stocks using the search bar in order to be directed to the [single stock page](https://aa-capstone-robingood.onrender.com/stocks/:ticker)

### Watchlist functionality:
**Note: You can log in using the Demo User to experience all of the sites features.
- A user can see their watchlists on the [home page](https://aa-capstone-robingood.onrender.com/) or clicking the logo icon or Investing in the navbar.
- From the list sidebar, you can click the "+" to create a new watch list.
- Users can click on a list to display stocks stored in that list.
- Users can click the "..." to edit and delete a watchlist

### Buy/Sell Stocks functionality:
- From the [single stock page](https://aa-capstone-robingood.onrender.com/stocks/:ticker) view live data on a specific stock
- Users also have the option to purchase a stock.
- If the user owns the stocks they are able to view market value and average cost of their investment.
- Owning a stock also allows you to sell shares and view any transactions made on the current stock.
- Users can also add and remove the specific to from their watchlists
  
### Transfers Money functionality:
- From the [home page](https://aa-capstone-robingood.onrender.com/) view total buying available
- Users can click on the buying power section to deposit funds
- You can also visit the [transfers page](https://aa-capstone-robingood.onrender.com/account/transfers) by clicking on transfers in the profile drop down.
- On the transfers page you can add and delete a bank account and see transfer details

### Recurring Investment functionality:
- From the [recurring investments page](https://aa-capstone-robingood.onrender.com/account/recurring), you can set up a recurring investment
- Users can click on recurring in the profile drop down or in the account nav bar
- Users can choose to create a recurring investment for a specific stock
- You can also delete, pause or resume an investment as well.

## Technologies & Libraries Used:

- React
- Redux
- AWS
- Javascript
- Python
- SQLAlchemy
- WTForms
- Font Awesome

## Future Implementations (Future features to add that were cut from V1 scope)
- Allow users to enter in payment information for depositing and withdrawing funds
   - Will also be able to view transfer history
- Allow user to set up a recurring investment
