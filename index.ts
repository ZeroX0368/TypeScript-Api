
import * as http from "http";
import fetch from "node-fetch";
import axios from "axios";

const port = 3000;
const hostname = "0.0.0.0";

interface MemeResponse {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
}

interface AnimalApiResponse {
  message: string;
  status: string;
}

interface CatApiResponse {
  url: string;
}

interface FoxApiResponse {
  image: string;
  link: string;
}

interface RedPandaApiResponse {
  image: string;
  link: string;
}

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{ base_stat: number; stat: { name: string } }>;
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Random Meme API</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .meme { border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
            img { max-width: 100%; height: auto; }
            button { background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
            button:hover { background: #0056b3; }
            .api-link { 
              margin-left: 10px; 
              color: #28a745; 
              text-decoration: none; 
              font-size: 12px; 
              border: 1px solid #28a745; 
              padding: 2px 6px; 
              border-radius: 3px; 
            }
            .api-link:hover { background: #28a745; color: white; }
          </style>
        </head>
        <body>
          <h1>Multi-Purpose API</h1>
          <div style="margin-bottom: 20px;">
            <h3>Random Images</h3>
            <button onclick="getMeme()">Get Random Meme</button> 
            <a href="/meme" target="_blank" class="api-link">Try API</a><br>
            <button onclick="getDog()">Get Random Dog</button> 
            <a href="/dog" target="_blank" class="api-link">Try API</a><br>
            <button onclick="getCat()">Get Random Cat</button> 
            <a href="/cat" target="_blank" class="api-link">Try API</a><br>
            <button onclick="getFox()">Get Random Fox</button> 
            <a href="/fox" target="_blank" class="api-link">Try API</a><br>
            <button onclick="getRedPanda()">Get Random Red Panda</button> 
            <a href="/red_panda" target="_blank" class="api-link">Try API</a>
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Pokémon Info</h3>
            <input type="text" id="pokemonName" placeholder="Enter Pokémon name or ID" style="margin-right: 10px; padding: 8px;">
            <button onclick="getPokemon()">Get Pokémon Info</button>
            <a href="/api/pokemon?name=pikachu" target="_blank" class="api-link">Try API (example)</a>
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Generators</h3>
            <button onclick="getNitroCode()">Generate Fake Nitro Code</button> 
            <a href="/nitro" target="_blank" class="api-link">Try API</a><br>
            <button onclick="getFakeIP()">Generate Fake IP</button> 
            <a href="/fake-ip" target="_blank" class="api-link">Try API</a>
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Search & User Info</h3>
            <input type="text" id="giftQuery" placeholder="Search gifts..." style="margin-right: 10px; padding: 8px;">
            <button onclick="searchGifts()">Search GiftHub</button> 
            <a href="/gifts/search?q=coffee" target="_blank" class="api-link">Try API (example)</a><br><br>
            <input type="text" id="robloxUser" placeholder="Roblox username..." style="margin-right: 10px; padding: 8px;">
            <button onclick="getRobloxUser()">Get Roblox User Info</button> 
            <a href="/api/roblox?username=builderman" target="_blank" class="api-link">Try API (example)</a><br><br>
            <input type="text" id="githubUser" placeholder="GitHub username..." style="margin-right: 10px; padding: 8px;">
            <button onclick="getGitHubUser()">Get GitHub User Info</button> 
            <a href="/api/github?username=octocat" target="_blank" class="api-link">Try API (example)</a><br><br>
            <input type="text" id="discordServer" placeholder="Discord invite code/link..." style="margin-right: 10px; padding: 8px;">
            <button onclick="getDiscordServer()">Get Discord Server Info</button> 
            <a href="/api/discord?code=discord-developers" target="_blank" class="api-link">Try API (example)</a>
          </div>
          <div id="image-container"></div>
          
          <script>
            async function getMeme() {
              try {
                const response = await fetch('/meme');
                const meme = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>\${meme.title}</h3>
                    <img src="\${meme.url}" alt="\${meme.title}" />
                    <p><strong>Subreddit:</strong> r/\${meme.subreddit}</p>
                    <p><strong>Author:</strong> u/\${meme.author}</p>
                    <p><strong>Upvotes:</strong> \${meme.ups}</p>
                    <a href="\${meme.postLink}" target="_blank">View on Reddit</a>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading meme. Please try again.</p>';
              }
            }

            async function getDog() {
              try {
                const response = await fetch('/dog');
                const dog = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Random Dog</h3>
                    <img src="\${dog.url}" alt="Random Dog" />
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading dog image. Please try again.</p>';
              }
            }

            async function getCat() {
              try {
                const response = await fetch('/cat');
                const cat = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Random Cat</h3>
                    <img src="\${cat.url}" alt="Random Cat" />
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading cat image. Please try again.</p>';
              }
            }

            async function getFox() {
              try {
                const response = await fetch('/fox');
                const fox = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Random Fox</h3>
                    <img src="\${fox.url}" alt="Random Fox" />
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading fox image. Please try again.</p>';
              }
            }

            async function getRedPanda() {
              try {
                const response = await fetch('/red_panda');
                const redPanda = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Random Red Panda</h3>
                    <img src="\${redPanda.url}" alt="Random Red Panda" />
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading red panda image. Please try again.</p>';
              }
            }

            async function getPokemon() {
              const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
              if (!pokemonName) {
                document.getElementById('image-container').innerHTML = '<p>Please enter a Pokémon name or ID.</p>';
                return;
              }
              try {
                const response = await fetch(\`/api/pokemon?name=\${pokemonName}\`);
                const pokemon = await response.json();
                if (pokemon.error) {
                  document.getElementById('image-container').innerHTML = \`<p>\${pokemon.error}</p>\`;
                  return;
                }
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>\${pokemon.name} (#\${pokemon.id})</h3>
                    <img src="\${pokemon.image}" alt="\${pokemon.name}" style="max-width: 300px;" />
                    <p><strong>Height:</strong> \${pokemon.height / 10} m</p>
                    <p><strong>Weight:</strong> \${pokemon.weight / 10} kg</p>
                    <p><strong>Types:</strong> \${pokemon.types.join(', ')}</p>
                    <p><strong>Base Stats:</strong> HP: \${pokemon.stats.hp}, Attack: \${pokemon.stats.attack}, Defense: \${pokemon.stats.defense}</p>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading Pokémon info. Please try again.</p>';
              }
            }

            async function getNitroCode() {
              try {
                const response = await fetch('/nitro');
                const nitro = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Fake Discord Nitro Code</h3>
                    <p style="font-family: monospace; font-size: 18px; background: #f0f0f0; padding: 10px; border-radius: 5px;">\${nitro.code}</p>
                    <p style="color: red; font-weight: bold;">⚠️ This is a FAKE code for demonstration purposes only!</p>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error generating nitro code. Please try again.</p>';
              }
            }

            async function getFakeIP() {
              try {
                const response = await fetch('/fake-ip');
                const ip = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Fake IP Address</h3>
                    <p style="font-family: monospace; font-size: 18px; background: #f0f0f0; padding: 10px; border-radius: 5px;">\${ip.address}</p>
                    <p><strong>Location:</strong> \${ip.location}</p>
                    <p style="color: red; font-weight: bold;">⚠️ This is a FAKE IP for demonstration purposes only!</p>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error generating fake IP. Please try again.</p>';
              }
            }

            async function searchGifts() {
              const query = document.getElementById('giftQuery').value.trim();
              if (!query) {
                document.getElementById('image-container').innerHTML = '<p>Please enter a search term.</p>';
                return;
              }
              try {
                const response = await fetch(\`/gifts/search?q=\${encodeURIComponent(query)}\`);
                const gifts = await response.json();
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Gift Search Results for "\${query}"</h3>
                    <p>Found \${gifts.results.length} simulated results:</p>
                    \${gifts.results.map(gift => \`
                      <div style="border: 1px solid #eee; margin: 10px 0; padding: 10px; border-radius: 5px;">
                        <strong>\${gift.name}</strong><br>
                        Price: $\${gift.price}<br>
                        Category: \${gift.category}
                      </div>
                    \`).join('')}
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error searching gifts. Please try again.</p>';
              }
            }

            async function getRobloxUser() {
              const username = document.getElementById('robloxUser').value.trim();
              if (!username) {
                document.getElementById('image-container').innerHTML = '<p>Please enter a Roblox username.</p>';
                return;
              }
              try {
                const response = await fetch(\`/api/roblox?username=\${encodeURIComponent(username)}\`);
                const user = await response.json();
                if (user.error) {
                  document.getElementById('image-container').innerHTML = \`<p>\${user.error}</p>\`;
                  return;
                }
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Roblox User: \${user.username}</h3>
                    \${user.avatar.imageUrl ? \`<img src="\${user.avatar.imageUrl}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;" />\` : ''}
                    <p><strong>User ID:</strong> \${user.id}</p>
                    <p><strong>Display Name:</strong> \${user.displayName}</p>
                    <p><strong>Description:</strong> \${user.description}</p>
                    <p><strong>Account Created:</strong> \${new Date(user.created).toLocaleDateString()}</p>
                    <p><strong>Friends:</strong> \${user.friends}</p>
                    <p><strong>Verified Badge:</strong> \${user.hasVerifiedBadge ? 'Yes' : 'No'}</p>
                    <p><strong>Is Banned:</strong> \${user.isBanned ? 'Yes' : 'No'}</p>
                    <a href="\${user.profileUrl}" target="_blank">View Profile</a>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading Roblox user info. Please try again.</p>';
              }
            }

            async function getGitHubUser() {
              const username = document.getElementById('githubUser').value.trim();
              if (!username) {
                document.getElementById('image-container').innerHTML = '<p>Please enter a GitHub username.</p>';
                return;
              }
              try {
                const response = await fetch(\`/api/github?username=\${encodeURIComponent(username)}\`);
                const user = await response.json();
                if (user.error) {
                  document.getElementById('image-container').innerHTML = \`<p>\${user.error}</p>\`;
                  return;
                }
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>GitHub User: \${user.username}</h3>
                    \${user.avatar ? \`<img src="\${user.avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;" />\` : ''}
                    <p><strong>Name:</strong> \${user.name || 'Not provided'}</p>
                    <p><strong>Bio:</strong> \${user.bio || 'No bio available'}</p>
                    <p><strong>Location:</strong> \${user.location || 'Not provided'}</p>
                    <p><strong>Company:</strong> \${user.company || 'Not provided'}</p>
                    <p><strong>Blog:</strong> \${user.blog || 'None'}</p>
                    <p><strong>Followers:</strong> \${user.followers}</p>
                    <p><strong>Following:</strong> \${user.following}</p>
                    <p><strong>Public Repositories:</strong> \${user.publicRepos}</p>
                    <p><strong>Account Created:</strong> \${new Date(user.created).toLocaleDateString()}</p>
                    <p><strong>Total Stars:</strong> \${user.statistics.totalStars}</p>
                    <p><strong>Total Forks:</strong> \${user.statistics.totalForks}</p>
                    <p><strong>Top Languages:</strong> \${user.statistics.languages.join(', ')}</p>
                    <p><strong>Most Starred Repo:</strong> \${user.statistics.mostStarredRepo || 'None'}</p>
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading GitHub user info. Please try again.</p>';
              }
            }

            async function getDiscordServer() {
              const inviteCode = document.getElementById('discordServer').value.trim();
              if (!inviteCode) {
                document.getElementById('image-container').innerHTML = '<p>Please enter a Discord invite code or link.</p>';
                return;
              }
              try {
                const response = await fetch(\`/api/discord?code=\${encodeURIComponent(inviteCode)}\`);
                const server = await response.json();
                if (server.error) {
                  document.getElementById('image-container').innerHTML = \`<p>\${server.error}</p>\`;
                  return;
                }
                document.getElementById('image-container').innerHTML = \`
                  <div class="meme">
                    <h3>Discord Server: \${server.name}</h3>
                    \${server.icon ? \`<img src="\${server.icon}" alt="Server Icon" style="width: 64px; height: 64px; border-radius: 50%;" />\` : ''}
                    <p><strong>Server ID:</strong> \${server.id}</p>
                    <p><strong>Description:</strong> \${server.description}</p>
                    <p><strong>Members:</strong> \${server.member_count}</p>
                    <p><strong>Online:</strong> \${server.online_count}</p>
                    <p><strong>Boost Level:</strong> \${server.boost_level}</p>
                    <p><strong>Verification Level:</strong> \${server.verification_level}</p>
                    <p><strong>Created:</strong> \${new Date(server.created_at).toLocaleDateString()}</p>
                    \${server.invite_info.inviter ? \`<p><strong>Invited by:</strong> \${server.invite_info.inviter.username}</p>\` : ''}
                    \${server.invite_info.channel ? \`<p><strong>Channel:</strong> #\${server.invite_info.channel.name}</p>\` : ''}
                  </div>
                \`;
              } catch (error) {
                document.getElementById('image-container').innerHTML = '<p>Error loading Discord server info. Please try again.</p>';
              }
            }
          </script>
        </body>
      </html>
    `);
  } else if (req.url === "/meme") {
    try {
      const response = await fetch("https://meme-api.com/gimme");
      const memeData = await response.json() as MemeResponse;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        title: memeData.title,
        url: memeData.url,
        subreddit: memeData.subreddit,
        author: memeData.author,
        ups: memeData.ups,
        postLink: memeData.postLink,
        nsfw: memeData.nsfw
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch meme" }));
    }
  } else if (req.url === "/dog") {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const dogData = await response.json() as AnimalApiResponse;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        url: dogData.message,
        type: "dog"
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch dog image" }));
    }
  } else if (req.url === "/cat") {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      const catData = await response.json() as CatApiResponse[];
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        url: catData[0].url,
        type: "cat"
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch cat image" }));
    }
  } else if (req.url === "/fox") {
    try {
      const response = await fetch("https://randomfox.ca/floof/");
      const foxData = await response.json() as FoxApiResponse;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        url: foxData.image,
        type: "fox"
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch fox image" }));
    }
  } else if (req.url === "/red_panda") {
    try {
      const response = await fetch("https://some-random-api.ml/img/red_panda");
      const redPandaData = await response.json() as RedPandaApiResponse;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        url: redPandaData.link,
        type: "red_panda"
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch red panda image" }));
    }
  } else if (req.url?.startsWith("/api/pokemon")) {
    const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
    const pokemonName = urlParams.get('name');
    
    if (!pokemonName) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Pokemon name parameter is required" }));
      return;
    }
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Pokémon not found" }));
        return;
      }
      
      const pokemonData = await response.json() as PokemonApiResponse;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        id: pokemonData.id,
        name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types.map(t => t.type.name),
        image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
        stats: {
          hp: pokemonData.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
          attack: pokemonData.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
          defense: pokemonData.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
          speed: pokemonData.stats.find(s => s.stat.name === 'speed')?.base_stat || 0
        }
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch Pokémon data" }));
    }
  } else if (req.url === "/nitro") {
    // Generate fake Discord Nitro code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let fakeCode = '';
    for (let i = 0; i < 16; i++) {
      fakeCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      code: `https://discord.gift/${fakeCode}`,
      disclaimer: "This is a fake code for demonstration purposes only"
    }));
  } else if (req.url === "/fake-ip") {
    // Generate fake IP address
    const ip = `${Math.floor(Math.random() * 255) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const locations = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia', 'Berlin, Germany', 'Toronto, Canada'];
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      address: ip,
      location: locations[Math.floor(Math.random() * locations.length)],
      disclaimer: "This is a fake IP for demonstration purposes only"
    }));
  } else if (req.url?.startsWith("/gifts/search")) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const query = urlParams.get('q') || '';
    
    // Simulate gift search results
    const giftCategories = ['Electronics', 'Books', 'Clothing', 'Home & Garden', 'Toys', 'Sports'];
    const giftNames = [
      'Wireless Headphones', 'Coffee Mug', 'Notebook Set', 'Plant Pot', 'Board Game',
      'Phone Case', 'Candle Set', 'Cookbook', 'Fitness Tracker', 'Art Supplies'
    ];
    
    const results = [];
    for (let i = 0; i < Math.min(5, Math.floor(Math.random() * 8) + 1); i++) {
      results.push({
        name: `${query} ${giftNames[Math.floor(Math.random() * giftNames.length)]}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        category: giftCategories[Math.floor(Math.random() * giftCategories.length)]
      });
    }
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      query,
      results,
      disclaimer: "These are simulated results for demonstration purposes"
    }));
  } else if (req.url?.startsWith("/api/github")) {
    const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
    const username = urlParams.get('username');
    
    if (!username) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "GitHub username is required" }));
      return;
    }
    
    try {
      const [userResponse, reposResponse] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
      ]);
      
      const user = userResponse.data;
      const repos = reposResponse.data;
      
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);
      const languages = [...new Set(repos.map((repo: any) => repo.language).filter(Boolean))];
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        username: user.login,
        name: user.name,
        bio: user.bio,
        location: user.location,
        company: user.company,
        blog: user.blog,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        created: user.created_at,
        statistics: {
          totalStars,
          totalForks,
          languages: languages.slice(0, 10),
          mostStarredRepo: repos.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)[0]?.name
        }
      }));
    } catch (error: any) {
      if (error.response?.status === 404) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "GitHub user not found" }));
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Failed to fetch GitHub data" }));
      }
    }
  } else if (req.url?.startsWith("/api/roblox")) {
    const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
    const username = urlParams.get('username');
    
    if (!username) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Roblox username is required" }));
      return;
    }
    
    try {
      // First, get user ID from username
      const userSearchResponse = await axios.post('https://users.roblox.com/v1/usernames/users', {
        usernames: [username],
        excludeBannedUsers: false
      });
      
      if (!userSearchResponse.data.data || userSearchResponse.data.data.length === 0) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Roblox user not found" }));
        return;
      }
      
      const userId = userSearchResponse.data.data[0].id;
      
      // Get detailed user information
      const [userResponse, avatarResponse, friendsResponse] = await Promise.all([
        axios.get(`https://users.roblox.com/v1/users/${userId}`),
        axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=420x420&format=Png&isCircular=false`),
        axios.get(`https://friends.roblox.com/v1/users/${userId}/friends/count`).catch(() => ({ data: { count: 0 } }))
      ]);
      
      const user = userResponse.data;
      const avatar = avatarResponse.data.data[0];
      const friendsCount = friendsResponse.data.count;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        id: user.id,
        username: user.name,
        displayName: user.displayName,
        description: user.description || 'No description available',
        created: user.created,
        isBanned: user.isBanned,
        externalAppDisplayName: user.externalAppDisplayName,
        hasVerifiedBadge: user.hasVerifiedBadge,
        avatar: {
          imageUrl: avatar?.imageUrl || null,
          state: avatar?.state || 'Unavailable'
        },
        friends: friendsCount,
        profileUrl: `https://www.roblox.com/users/${userId}/profile`
      }));
    } catch (error: any) {
      if (error.response?.status === 404) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Roblox user not found" }));
      } else if (error.response?.status === 429) {
        res.statusCode = 429;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }));
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Failed to fetch Roblox user data" }));
      }
    }
  } else if (req.url?.startsWith("/api/discord")) {
    const urlParams = new URLSearchParams(req.url.split('?')[1] || '');
    const code = urlParams.get('code');
    
    if (!code) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Discord invite code or URL is required" }));
      return;
    }
    
    try {
      // Extract invite code from URL or use as-is
      let inviteCode = code;
      if (code.includes('discord.gg/')) {
        inviteCode = code.split('discord.gg/')[1];
      }
      
      // Get invite information
      const inviteResponse = await fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`);
      
      if (!inviteResponse.ok) {
        if (inviteResponse.status === 404) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Discord invite not found or has expired" }));
          return;
        } else if (inviteResponse.status === 429) {
          res.statusCode = 429;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }));
          return;
        } else {
          throw new Error(`HTTP ${inviteResponse.status}`);
        }
      }
      
      const inviteData = await inviteResponse.json();
      
      if (!inviteData.guild) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "No server information found for this invite" }));
        return;
      }
      
      const guild = inviteData.guild;
      
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        id: guild.id,
        name: guild.name,
        description: guild.description || 'No description available',
        icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : null,
        banner: guild.banner ? `https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png` : null,
        splash: guild.splash ? `https://cdn.discordapp.com/splashes/${guild.id}/${guild.splash}.png` : null,
        verification_level: guild.verification_level,
        member_count: inviteData.approximate_member_count || 0,
        online_count: inviteData.approximate_presence_count || 0,
        boost_level: guild.premium_subscription_count ? Math.floor(guild.premium_subscription_count / 2) : 0,
        features: guild.features || [],
        vanity_url_code: guild.vanity_url_code || null,
        invite_info: {
          code: inviteData.code,
          expires_at: inviteData.expires_at,
          uses: inviteData.uses || 0,
          max_uses: inviteData.max_uses || 0,
          inviter: inviteData.inviter ? {
            username: inviteData.inviter.username,
            discriminator: inviteData.inviter.discriminator,
            avatar: inviteData.inviter.avatar ? `https://cdn.discordapp.com/avatars/${inviteData.inviter.id}/${inviteData.inviter.avatar}.png` : null
          } : null,
          channel: inviteData.channel ? {
            name: inviteData.channel.name,
            type: inviteData.channel.type
          } : null
        },
        created_at: new Date(((parseInt(guild.id) / 4194304) + 1420070400000)).toISOString()
      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch Discord server data" }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Meme API available at http://${hostname}:${port}/meme`);
});
