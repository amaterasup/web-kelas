
async function txt_file(nama) {
    const response = await fetch(`${nama}.json`);
    const data = await response.json()
    return data;
    return response;
}
txt_file("DATA").then(result => {
    make_member(result);
});
txt_file("MATKUL").then(result => {
    make_matkul(result);
});

function make_member(DATA) {
    const member_grid = document.querySelectorAll(".member-grid")[0];
    DATA.forEach((data) => {
        const div = document.createElement('div');
        div.className = "member-card";
        div.innerHTML = `<div class="member-photo"><img class="photo-to-click" src="${data.IMAGE}" alt=${data.NAME}></div><h4>${data.NAME}</h4><div class="member-role">${data.ROLE}</div><div class="member-nim">NIM · ${data.NIM}</div>`;
        setTimeout(() => {
            member_grid.append(div);
        }, Math.random());
    })
    setTimeout(() => {
        image_open()
    }, 1000);
}
function make_matkul(DATA) {
    const matkul_grid = document.querySelectorAll(".list-card")[0];
    DATA.forEach((data) => {
        const div = document.createElement('div');
        div.className = "list-item";
        div.innerHTML = `<div class="icon-box">${data.LOGO}</div><div><h4>${data.NAME}</h4><p>${data.DESCRIPTION}</p></div><div class="sem">${data.SEMESTER}</div>`;
        matkul_grid.append(div);
    })
}

const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});


const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.getElementById("close");
function image_open(){
    const allImages = document.querySelectorAll(
        ".gallery-item img, .member-photo img, .dosen-photo img"
    );
    allImages.forEach(image => {
        image.addEventListener("click", () => {
            console.log(1)
            lightboxImage.src = image.src;
            lightbox.classList.add("active");
        });
    });
}
closeButton.addEventListener("click", () => {
    lightbox.classList.remove("active");
});
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }
});