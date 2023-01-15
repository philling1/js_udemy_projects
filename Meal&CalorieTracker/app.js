//Storage Controller
const StorageCtrl = (function(){
  //Public methods
  return {
    storeItems: function(item){
      let items;
      //Checking if any items in LS
      if(localStorage.getItem('items') === null){
        items = [];
        //Push the new items on the local storage array
        items.push(item);
        //Setting the LS
        localStorage.setItem('items', JSON.stringify(items));
      }else {
        //Getting what is already in LS
        items = JSON.parse(localStorage.getItem('items'));

        //Push the new item
        items.push(item);

        //THen resetting the local storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFromLS: function() {
      let items;
      if(localStorage.getItem('items') === null){
        items = [];
     
      }else {
      items = JSON.parse(localStorage.getItem('items'))
      }

      return items;
    },

    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      })
      //reseting the LS 
      localStorage.setItem('items', JSON.stringify(items));
    },

    deleteItemFromLS: function(id){
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index){
        if(id === item.id) {
          items.splice(index, 1);
        }
      })
      //reseting the LS 
      localStorage.setItem('items', JSON.stringify(items));
    },

    clearAllItemsFromLS: function() {
      localStorage.removeItem('items');
    }
  }
})();

//Item Controller
const ItemCtrl = (function() {
  //Item Contructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure / State
  const data = {
    // items: [
    //   // {id: 0, name: 'Steak Dinner', calories: 1200},
    //   // {id: 1, name: 'Cookie', calories: 400},
    //   // {id: 2, name: 'Eggs', calories: 300}
    // ],
    items: StorageCtrl.getItemsFromLS(),
    currentItem: null,
    totalCalories: 0
  }

  //Public Method
  return {
    getItems: function() {
      return data.items;
    },

    addItem: function(name, calories) {
       let ID; 
       //create ID
       if(data.items.length > 0){
         ID = data.items[data.items.length - 1].id + 1;
       }else {
         ID = 0;
       }

       //Calorie to number
       calories = parseInt(calories);

       //creating new item
       newItem = new Item(ID, name, calories);

      //Addor push to the item arrays
       data.items.push(newItem);

       return newItem;
    },

    getItemById: function(id) {
      let found = null;
      //loop through the items
      data.items.forEach(function(item){
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },

    updateItem: function(name, calories){
      //calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(function(item){
        if(item.id === data.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
          
        }
      })

      return found;
    },

    deleteItem: function(id) {
      //Get the ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // Get index 
      const index = ids.indexOf(id);

      //Remove or splice out of the array
      data.items.splice(index, 1);
    },

    clearAllItems: function() {
      data.items = [];
    },

    //Setting the current item
    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    //Getting the current item
    getCurrentItem: function() {
      return data.currentItem;
    },

    //loop through items and add cals
    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(function(item){
        total += item.calories;
      });
      
      //Set total cal in data structure
      data.totalCalories = total;

      //return total calories
      return data.totalCalories;
    },

    logData: function(){
      return data;
    }
  }
})();



//UI controller
const UICtrl = (function() {
  const UISelector = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  //Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item){
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>
        `;
      });

      //Insert List items
      document.querySelector(UISelector.itemList).innerHTML = html;
    },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelector.itemNameInput).value,
        calories: document.querySelector(UISelector.itemCaloriesInput).value
      }
    },

    addListItem: function(item) {
      //show the list
      document.querySelector(UISelector.itemList).style.display = 'block';
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Add ID
      li.id = `item-${item.id}`;
      //Add html
      li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
      //Insert list Item
      document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);
    },

    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelector.listItems);

      //Converting the listItems that are nodes into array
      listItems = Array.from(listItems);

      //looping the listItems
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      })
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInputs: function() {
      document.querySelector(UISelector.itemNameInput).value = '';
      document.querySelector(UISelector.itemCaloriesInput).value = '';
    },

    addItemTOForm: function() {
      document.querySelector(UISelector.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelector.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeAllItems: function() {
      let allListItems = document.querySelectorAll(UISelector.listItems);

      //Turn NODE LIST into arrays
      allListItems = Array.from(allListItems);

      allListItems.forEach(function(item){
        item.remove();
      })
    },

    hideList: function() {
      document.querySelector(UISelector.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelector.totalCalories).textContent = totalCalories;
    },

    clearEditState: function() {
      UICtrl.clearInputs();
      document.querySelector(UISelector.updateBtn).style.display = 'none';
      document.querySelector(UISelector.deleteBtn).style.display = 'none';
      document.querySelector(UISelector.backBtn).style.display = 'none';
      document.querySelector(UISelector.addBtn).style.display = 'inline';
    },

    showEditState: function() {
      document.querySelector(UISelector.updateBtn).style.display = 'inline';
      document.querySelector(UISelector.deleteBtn).style.display = 'inline';
      document.querySelector(UISelector.backBtn).style.display = 'inline';
      document.querySelector(UISelector.addBtn).style.display = 'none';
    },

    getSelectors: function() {
      return UISelector;
    }
  }
})();



//APP Controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
  //Load event Listeners
  const loadEventListeners = function() {
    //Get UI Seectors
    const UISelector = UICtrl.getSelectors();

    //Add item event 
    document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit);

    //Disable submit on enter
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13){

        e.preventDefault();
        return false;
      }
    })

    //Edit icon click event
    document.querySelector(UISelector.itemList).addEventListener('click', itemEditClick);

    //Update item event
    document.querySelector(UISelector.updateBtn).addEventListener('click', itemUpdateSubmit);

    //Delete item event
    document.querySelector(UISelector.deleteBtn).addEventListener('click', itemDeleteSubmit);

    //Back item event
    document.querySelector(UISelector.backBtn).addEventListener('click', function(e){
      UICtrl.clearEditState();

      e.preventDefault();
    });

    //Clear all item event
    document.querySelector(UISelector.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  //Add item submit function
  const itemAddSubmit = function(e){
    //Get form input from UI Controller
    const input = UICtrl.getItemInput();

    //check for name and calorie input
    if(input.name !== '' && input.calories !== ''){
    //   //Add item
       const newItem = ItemCtrl.addItem(input.name, input.calories);
    //   //Add item to UI list
      UICtrl.addListItem(newItem);

      //Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to the UI 
      UICtrl.showTotalCalories(totalCalories);

      //Storage in LocalStorege
      StorageCtrl.storeItems(newItem);

      //clear input fields
      UICtrl.clearInputs();
     }

    e.preventDefault();
  }

  //Click edit item
  const itemEditClick = function (e) {
    //Targeting the edit button using event delegation
    if(e.target.classList.contains('edit-item')) {
      //Get list item id
      const listId = e.target.parentNode.parentNode.id;

      //Break into an array
      const listIdArr = listId.split('-');

      //Getting the actual id
      const id = parseInt(listIdArr[1]);

      //Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      //Set the current item
      ItemCtrl.setCurrentItem(itemToEdit);

      //Add Current item to form
      UICtrl.addItemTOForm();
    }

    e.preventDefault();
  }

  //Update item submit
  const itemUpdateSubmit = function(e) {
    //Get item input
    const input = UICtrl.getItemInput();

    //Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update UI with the updated item
    UICtrl.updateListItem(updatedItem);

    //Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    //Update local Storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault()
  }

  //Delete button event
  const itemDeleteSubmit = function(e) {
    //Get ID that we are to delete from the currntItem
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    //Delete item also from the UI
    UICtrl.deleteListItem(currentItem.id);

    
    //Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    //Delete from LS
    StorageCtrl.deleteItemFromLS(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();
  }

  //Clear all item event
  const clearAllItemsClick = function(e) {
    //Delete all items from data structures
    ItemCtrl.clearAllItems();

    //Get the total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    //Add total calories to the UI 
    UICtrl.showTotalCalories(totalCalories);

    //Remove all items from the UI
    UICtrl.removeAllItems();

    //Clear from local storage
    StorageCtrl.clearAllItemsFromLS();

    //Hide the ul
    UICtrl.hideList();

    e.preventDefault();
  }


  //Public methods
  return {
    init: function() {
      //Clear edit state /set initial state
      UICtrl.clearEditState();

      //Fetch items from data structures
      const items = ItemCtrl.getItems();

      //Check if any items 
      if(items.length === 0) {
        UICtrl.hideList();
      }else {
        //Populate list with items
      UICtrl.populateItemList(items);
      }

      //Get the total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      //Add total calories to the UI 
      UICtrl.showTotalCalories(totalCalories);
  
      //Load event listeners
      loadEventListeners();
      

    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

//Initializing AppCtrl
AppCtrl.init();