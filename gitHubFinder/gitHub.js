class Github{
  constructor(){
    this.client_id = 'b0682b36c048e0e6c706';
    this.client_secret = '82ac1e99f279079208994d7b6a881631879b84d7'
    this.repos_count = 10;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profileData = await profileResponse.json();

    const repos = await repoResponse.json();

    return {
      profile:profileData,
      repos: repos
    }
  }

}