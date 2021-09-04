
# FlipTest

## Objective
This app contains Transactions screen and Transaction Details screen 

## Steps to Build Project 

1. Clone the project repository main branch.
2. Go to root directory -```$cd FlipTest```
3. Install dependencies - ```$yarn``` 
4. To build on iOS
    1. Go to iOS directory ```$cd iOS/```
    2. Install Pods - ```$pod install``` 
    3. Open ```FlipTest.xcworkspace``` in Xcode
    4. Build and Run project 
5. To build on Android 
    1. Go to root directory ```cd FlipTest/```
    2. ```$react-native run-android```


## Features Implemented 
*1. Transactions screen*
 - It has list of transactions
 - It can be searched or filtered by 
   - Beneficiary name
   - Sender bank
   - Beneficiary bank
   - Transaction's amount
 - It can be sorted by
   - Name A-Z
   - Name Z-A
   - Date newest
   - Date oldest

*2. Detail Page*
On press of transaction on Transactions screen app is navigated to details screen
- It has all information about the selected transaction
- It has a back button

## Custom Components 
- Search Box - contains a search with the ability to select the sort type
- Modal - To open the sort type modal 
- RadioButtons - Contains custom implementation for radio buttons

## Pending Items:
- Update hardcoded strings to constants
- Update the styling to make theme compatible

Transactions data is fetched from from API URL - https://nextar.flip.id/frontend-test


