const API = "https://api.github.com/users";

const controller = async (path, method = "GET") => {

    const URL = `${API}/${path}`;

    try {
        let request = await fetch(URL);

        if (request.ok) {
            let response = await request.json();
            return response;
        } else {
           await Promise.reject(request.status);
        }
    } catch (err) {
       renderErr(err); 
    }
}

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async e => {
    e.preventDefault();

    let userName = document.querySelector("#userName").value.replaceAll(' ', '');
    
    let user = await controller(userName);

    let userId = document.getElementById(`${user.id}`);

    if (userId) {
        userId.remove();
        renderUserCard(user);
    } else {
        renderUserCard(user);
    }
    
    searchForm.reset();
})

function renderUserCard(user) {

    let userInfo = document.getElementById("user-info__title");

    let userCard = `
        <div class="user-info__card" id="${user.id}">
            <img class="user-info__card-img" src="${user.avatar_url}" alt="${user.login}">
            <p class="user-info__card-text">
                <b class="user-info__card-text_bold">User name:</b> ${user.login};
            </p>
            <p class="user-info__card-text">
                <b class="user-info__card-text_bold">Number of repositories:</b> ${user.public_repos};
            </p>
            <p class="user-info__card-text">
                <b class="user-info__card-text_bold">Number of followers:</b> ${user.followers};
            </p>
            <p class="user-info__card-text">
                <b class="user-info__card-text_bold">Number of following:</b> ${user.following};
            </p>
        </div>
    `

    userInfo.insertAdjacentHTML("afterend", userCard);
}

function renderErr() {
    const error = document.getElementById("error");
    const hideError = document.getElementById("hide");
    
    error.classList.add("show-error");

    hideError.addEventListener("click", () => {
        error.classList.remove("show-error");
        searchForm.reset();
    })  
}