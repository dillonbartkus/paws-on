export default function setUserData(data) {
    localStorage.setItem('pawsId', data.id)
    localStorage.setItem('pawsUser', data.name)
    localStorage.setItem('pawsEmail', data.email)
    localStorage.setItem('pawsAvatar', data.avatar)
    localStorage.setItem('pawsZip', data.zip)
  }