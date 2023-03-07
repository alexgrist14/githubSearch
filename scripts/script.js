const form = document.forms.reps;
const searchInput = form.elements.search;
const repositories = document.querySelector('.repositories-container');

form.addEventListener("submit",appendRepositories);

function appendRepositories(){

    getRepositories(searchInput.value)
        .then(repos => {
            if(repos.length === 0 ){
                repositories.innerHTML = "Nothing found";
            }
            else {
                repositories.innerHTML = '';
                for (let item of repos) {
                    const repoContainer = document.createElement('div');
                    const linkToGithub = document.createElement('a');
                    const repoDescription = document.createElement('p');
                    const repoLanguage = document.createElement('span');

                    repoDescription.innerText = item.description;
                    repoLanguage.innerText = item.language;

                    repoContainer.classList.add('repository-content')
                    repoLanguage.classList.add('language');
                    linkToGithub.classList.add('link');
                    repoDescription.classList.add('description');

                    linkToGithub.innerText = item.name;
                    linkToGithub.href = item.clone_url;
                    linkToGithub.setAttribute("target", "_blank");

                    repoContainer.append(linkToGithub);
                    repoContainer.append(repoDescription);
                    repoContainer.append(repoLanguage);

                    repositories.append(repoContainer);
                }
            }
        })
        .catch(err => alert(err));
}

async function getRepositories(repoName) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}&per_page=10`);
    const data = await response.json();
    return data.items;
}
