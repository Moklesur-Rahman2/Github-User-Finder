// Steps 
    // Get user by call API
    // Genarate CLIENT_ID and CLIENT_SECRET
    // Get input box data

// client id
// 1527c8c769afe14728d7

// client secret 
// b63679c1678606e597ece72bbda7bfebe06cfcfa


const CLIENT_ID = '1527c8c769afe14728d7'
const CLIENT_SECRET = 'b63679c1678606e597ece72bbda7bfebe06cfcfa'

async function getUser(name){
    const res = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
    const profile = await res.json()

    return profile
}

document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault()

    const userName = document.querySelector('#findByUsername').value

    const profile = await getUser(userName)
    const repos = await getRepos(profile)

    showProfile(profile)
    showRepos(repos)
})

async function getRepos(profile){
    const res =  await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}$per_page=5`)
    const repo = await res.json()

    return repo
}

function showProfile(profile){
    document.querySelector('.profile').innerHTML = `
    <img
    src="${profile.avatar_url}"
    alt="${profile.name}"
  />
  <p class="name">${profile.name}</p>
  <p class="username login">${profile.login}</p>
  <p class="bio">
    ${profile.bio}
  </p>

  <div class="followers-stars">
    <p>
      <ion-icon name="people-outline"></ion-icon>
      <span class="followers"> 10 </span> followers
    </p>
    <span class="dot">·</span>
    <p><span class="following"> 20 </span> following</p>
  </div>

  <p class="company">
    <ion-icon name="business-outline"></ion-icon>
    Symfony/Blackfire
  </p>
  <p class="location">
    <ion-icon name="location-outline"></ion-icon>Lille, France
  </p>
    `
}

function showRepos(repos){
    let newHtml = ''
    for(let repo of repos){
        newHtml += `
        <div class="repo">
        <div class="repo_name">
          <a href="${repo.url}">${repo.name}</a>
        </div>
        <p>
          <span class="circle"></span> JavaScript
          <ion-icon name="star-outline"></ion-icon> 941
          <ion-icon name="git-branch-outline"></ion-icon> 687
        </p>
      </div>
        
        `
    }
    document.querySelector('.repos').innerHTML = newHtml
}