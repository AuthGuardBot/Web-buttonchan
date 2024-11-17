document.addEventListener('DOMContentLoaded', () => {
    const serverData = [
        {
            name: 'Craft Community',
            description: 'Craft Communityへようこそ！フレンドリーなコミュニティと一緒に、クラフトの冒険に出かけましょう！',
            tags: ['公式', 'ゲーム', '日本語'],
            isOfficial: true,
            detailsPage: '#'
        },
        {
            name: 'Fortify',
            description: 'Discordの荒らし対策Bot Fortifyの公式Supportサーバーです。',
            tags: ['公式', '開発'],
            isOfficial: false,
            detailsPage: '#'
        }
    ];

    const allTags = ['ゲーム', '日本語', '音楽', 'コミュニティ', '技術', '開発', '公式', 'エンタメ', 'アート', '映画'];

    const serverListElement = document.getElementById('server-list');
    const tagSelectElement = document.getElementById('tags');
    const searchBar = document.getElementById('search-bar');

    allTags.forEach(tag => {
        const tagItem = document.createElement('span');
        tagItem.classList.add('tag-item');
        tagItem.textContent = tag;
        tagItem.onclick = () => filterServersByTag(tag);
        tagSelectElement.appendChild(tagItem);
    });

    function displayServers(servers) {
        serverListElement.innerHTML = '';

        servers.forEach(server => {
            const serverCard = document.createElement('div');
            serverCard.classList.add('server-card');

            const officialMark = server.isOfficial ? '<span class="official">公式</span>' : '';
            const tags = server.tags.map(tag => `<span class="tag-item ${tag === '公式' ? 'official' : ''}">${tag}</span>`).join('');
            
            serverCard.innerHTML = `
                <h3>${server.name} ${officialMark}</h3>
                <div class="tags">${tags}</div>
                <p class="description">${server.description}</p>
                <button class="join-btn">サーバーに参加</button>
                <a href="${server.detailsPage}" class="detail-link">詳細ページへ</a>
            `;

            serverListElement.appendChild(serverCard);
        });
    }

    displayServers(serverData);

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredServers = serverData.filter(server => {
            return server.name.toLowerCase().includes(query);
        });
        displayServers(filteredServers);
    });

    function filterServersByTag(tag) {
        const filteredServers = serverData.filter(server => server.tags.includes(tag));
        displayServers(filteredServers);
    }
});
