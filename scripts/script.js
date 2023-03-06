const token = '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';

const form = document.forms.reps;
const searchInput = form.elements.search;
const searchBtn = form.elements.button;
const repositories = document.querySelector('.repositories-container');


form.addEventListener("submit",appendRepositories);

function appendRepositories(){

    let repName = getRepositories(searchInput.value)
        .then(repos => {
            console.log(repos);
            for(let item of repos){
                const linkToGithub = document.createElement('a');
                linkToGithub.innerText = item.name;
                linkToGithub.href = item.clone_url;
                linkToGithub.setAttribute("target","_blank");
                repositories.append(linkToGithub);
            }
        })
        .catch(err => console.log(err));
    const repositoryName = document.createElement('div');

    // repositoryName.append(repName[0].name);
    // repositories.append(repositoryName);
}

async function getRepositories(repoName) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}&per_page=10`,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
    const data = await response.json();
    return data.items;
}
