let url = window.location.toString();
let preloader = document.getElementById('preloader');
let newDate = new Date();

let getUsername = (url) => {
    let urlSplit = url.split('=');
    let userName = urlSplit[1];
    if (userName == undefined) {
      userName = 'AntonovaAL';
    }
    return userName;
}

let name = getUsername(url);

const getNewDate = new Promise((resolve, reject) => {
  setTimeout(() => newDate ? resolve(newDate) : reject('Информация о времени неизвестна'), 3000)
});


const getUserRequest = fetch('https://api.github.com/users/' + name);

Promise.all([getUserRequest, getNewDate])
  .then(([userInfoRequest, requestNewDate]) => {
    userRequest = userInfoRequest;
    requestDate = requestNewDate;
  })
  .then(res => userRequest.json())
  .then(json => {
    let avatar = json.avatar_url;
    let name = json.login;
    let bio = json.bio;
    let profile = json.html_url;
    if (name) {
      let createAvatar = () => {
      let addAvatar = document.createElement('img');
      addAvatar.src = avatar;
      document.body.appendChild(addAvatar);
      }

      let createBio = () => {
        let addBio = document.createElement('h3');
        addBio.innerHTML = bio;
        document.body.appendChild(addBio);
      }

      let createProfile = () => {
        let elementForLink = document.createElement('a');
        let elementForHeader = document.createElement('h2');
        elementForHeader.innerText = name;
        elementForLink.href = profile;
        document.body.appendChild(elementForLink);
        elementForLink.appendChild(elementForHeader);
      }

      let createNewDate = () => {
        let elementForNewDate = document.createElement('h3');
        elementForNewDate.innerHTML = requestDate;
        document.body.appendChild(elementForNewDate);
      }

      preloader.style.display = 'none';
      createAvatar();
      createProfile();
      createBio();
      createNewDate();

    } else {
      alert('Информация о пользователе не доступна');
    }
  })

  .catch(err => alert(err + ' Информация о пользователе не доступна'));