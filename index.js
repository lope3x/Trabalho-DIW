const host = "https://api.github.com/"
const user = "lope3x"
const repositoriesSort = "updated"
const perPage = 3
var repositoriesPage = 0
var followersPage = 0

const handleOnLoad = () => {
    loadMoreRepositories()
    loadMoreFollowers()
    loadProfile()
}

const loadProfile = async () => {
    const responseProfile = await fetch(host+`users/${user}`)
    const profileData = await responseProfile.json()
    updateProfileWith(profileData)
}

const loadMoreFollowers = async () => {
    followersPage+=1
    const responseFollowers = await fetch(host+`users/${user}/followers?page=${followersPage}&per_page=${6}`)
    const followersData = await responseFollowers.json()
    if(followersData.length){
        updateFollowersWith(followersData)
    } else {
        alert("No more Followers")
    }
}

const updateFollowersWith = (followersDate) => {
    const followersContainer = document.getElementsByClassName("followers-container")[0]

    const mappedFollowers = followersDate.map(follower => createFollowerItem(follower))

    mappedFollowers.forEach(element => followersContainer.appendChild(element))
}

const createFollowerItem = (followerResponse) => {
    console.log(followerResponse)
    const container = document.createElement("div")
    container.className = "follower-item"
    const imgLink = document.createElement("a")
    imgLink.href = followerResponse.html_url
    imgLink.target = "_blank"
    const img = document.createElement("img")
    img.src = followerResponse.avatar_url
    img.alt = "github"
    imgLink.appendChild(img)
    container.appendChild(imgLink)

    const description = createFollowerDescription(
            followerResponse.login, 
            followerResponse.html_url
         )
    container.appendChild(description)
    return container
}

const createFollowerDescription = (title) => {
    const containerDescription = document.createElement("div")
    containerDescription.className = "follower-data"
    const descriptionTitle = document.createElement("h4")
    descriptionTitle.innerText = title
    containerDescription.appendChild(descriptionTitle)

    return containerDescription
}

const loadMoreRepositories = async () => {
    repositoriesPage+=1
    const responseRepositories = await fetch(host+`users/${user}/repos?sort=${repositoriesSort}&page=${repositoriesPage}&per_page=${perPage}`)
    const repositoriesData = await responseRepositories.json()
    if(repositoriesData.length){
        updateRepositoriesWith(repositoriesData)
    } else {
        alert("No more repositories")
    }
}

const updateProfileWith = (data) => {
    const profileElement = document.getElementById("profileImg")
    const githubElement  = document.getElementById("githubImg")
    const profileDescriptionElement = document.getElementsByClassName("profile-desc")[0]
    profileElement.src = data.avatar_url
    githubElement.href = data.html_url
    profileDescriptionElement.innerText = data.bio
}

const updateRepositoriesWith = (repositories) => {
    const repositoryContainer = document.getElementsByClassName("repository-container")[0]

    const mappedRepositories = repositories.map(repository => createRepositoryItem(repository))

    mappedRepositories.forEach(element => repositoryContainer.appendChild(element))
}

const createRepositoryItem = (repositoryResponse) => {
    const container = document.createElement("div")
    container.className = "repository-item"
    const imgLink = document.createElement("a")
    imgLink.href = repositoryResponse.html_url
    imgLink.target = "_blank"
    const img = document.createElement("img")
    img.src = "images/github.png" 
    img.alt = "github"
    imgLink.appendChild(img)
    container.appendChild(imgLink)

    const date = new Date(repositoryResponse.updated_at)
    const dateString = date.toLocaleDateString('pt-BR')
    const description = createRepositoryDescription(
            repositoryResponse.name,
            repositoryResponse.description ?? "No description",
            dateString
         )
    container.appendChild(description)
    return container
}


const createRepositoryDescription = (title, description, date) => {
    const containerDescription = document.createElement("div")
    containerDescription.className = "repository-data"
    const descriptionTitle = document.createElement("h4")
    const descriptionDescription = document.createElement("p")
    const descriptionDate = document.createElement("strong")
    descriptionTitle.innerText = title
    descriptionDescription.innerText = description
    descriptionDate.innerText = date
    containerDescription.appendChild(descriptionTitle)
    containerDescription.appendChild(descriptionDescription)
    containerDescription.appendChild(descriptionDate)

    return containerDescription
}
