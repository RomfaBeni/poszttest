// Egyszerű admin login (frontend)
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

let editIndex = null; // Szerkesztett poszt indexe

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            document.getElementById('loginBox').style.display = 'none';
            document.getElementById('adminContent').style.display = 'block';
            renderAdminPosts();
        } else {
            document.getElementById('loginError').style.display = 'block';
        }
    });
}

// Csak az admin.html-hez kapcsolódó kód fusson ott
if (document.getElementById('postForm')) {
    function renderAdminPosts() {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const adminPosts = document.getElementById('adminPosts');
        if (posts.length === 0) {
            adminPosts.innerHTML = '<p>Nincs még poszt.</p>';
        } else {
            adminPosts.innerHTML = posts.map((post, i) => `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>${post.date}</small>
                    <button class="post-btn edit" onclick="editPost(${i})">Szerkesztés</button>
                    <button class="post-btn delete" onclick="deletePost(${i})">Törlés</button>
                </div>
            `).join('');
        }
    }

    window.deletePost = function(index) {
        let posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.splice(index, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderAdminPosts();
        resetForm();
    }

    window.editPost = function(index) {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const post = posts[index];
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;
        editIndex = index;
        document.getElementById('postFormBtn').textContent = "Mentés";
        document.getElementById('successMsg').style.display = 'none';
    }

    function resetForm() {
        document.getElementById('postForm').reset();
        editIndex = null;
        document.getElementById('postFormBtn').textContent = "Poszt létrehozása";
    }

    function getFormattedDate() {
        const d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0') + ' ' +
            String(d.getHours()).padStart(2, '0') + ':' +
            String(d.getMinutes()).padStart(2, '0');
    }

    document.getElementById('postForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        if (title && content) {
            let posts = JSON.parse(localStorage.getItem('posts') || '[]');
            if (editIndex !== null) {
                // Szerkesztés
                posts[editIndex].title = title;
                posts[editIndex].content = content;
                // Dátumot nem módosítunk, de ha akarod, frissítheted:
                // posts[editIndex].date = getFormattedDate();
                document.getElementById('successMsg').textContent = "Poszt módosítva!";
            } else {
                // Új poszt
                posts.push({ title, content, date: getFormattedDate() });
                document.getElementById('successMsg').textContent = "Poszt elmentve!";
            }
            localStorage.setItem('posts', JSON.stringify(posts));
            document.getElementById('successMsg').style.display = 'block';
            renderAdminPosts();
            resetForm();
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Ha már be van jelentkezve, jelenítse meg a posztokat
        if (document.getElementById('adminContent').style.display !== 'none') {
            renderAdminPosts();
        }
    });
}


    window.addEventListener('DOMContentLoaded', function() {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]').reverse();
        const container = document.getElementById('postsContainer');
        if (posts.length === 0) {
            container.innerHTML = '<p>Még nem tedtek közzé semmit.</p>';
        } else {
            container.innerHTML = posts.map(post => `
                <div class="posztoltt">
                    <h2 class="cimke">${post.title}</h2>
                    <p class="tema">${post.content}</p>
                    <small class="datum">Létrehozva: ${post.date.slice(0, 19)}</small>
                </div>
            `).join('');
        }
    });





// const MADMIN_USER = ["admin", "romfa", "zoja"];
// const MADMIN_PASS = ["1234", "kegyeleM", "123"];



// if (document.getElementById('MloginForm')) {
//     document.getElementById('MloginForm').addEventListener('submit', function(e) {
//         e.preventDefault();
//         const user = document.getElementById('username').value;
//         const pass = document.getElementById('password').value;
//         // if (user === MADMIN_USER && pass === MADMIN_PASS) {
//         if (MADMIN_USER.includes(user) && MADMIN_PASS.includes(pass)) {
//             window.location.href = "fooldal.html";

//         } else {
//             document.getElementById('loginError').style.display = 'block';
//         }
//     });
// }

const validUsers = {
      admin: "1234",
      asd: "asd",
      Zoja: "209064"
    };



if (document.getElementById('MloginForm')) {
    document.getElementById('MloginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        // if (user === MADMIN_USER && pass === MADMIN_PASS) {
        if (validUsers[user] && validUsers[user] === pass) {
            window.location.href = "fooldal.html";

        } else {
            document.getElementById('loginError').style.display = 'block';
        }
    });
}

