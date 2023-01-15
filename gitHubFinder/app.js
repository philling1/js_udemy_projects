//inst ths github class
const github = new Github;

//inst the ui class
const ui =  new UI;

// Search input variable
const searchUser = document.getElementById('searchUser');

//Event listener on Search input
searchUser.addEventListener('keyup', (e) => {
  //Get input text
  const userText = e.target.value;

  if(userText !== ''){
    //Make Http Call
    github.getUser(userText)
    .then(data => {
      if(data.profile.message === 'Not Found'){
        //show alert
        ui.showAlert('User not Found', 'alert alert-danger')

      }else {
        //show profile
         ui.showProfile(data.profile);
         ui.showRepos(data.repos);
      }
    })
  }else {
    //clear profile
    ui.clearProfile();
  }
});