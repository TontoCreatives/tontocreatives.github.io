// ===================================================
//                 PORTFOLIO DATA ARRAY
// ===================================================
const portfolioData = [
    {
        id: "beyond_ruins",
        title: "Beyond the Ruins — Bible Study",
        category: "Church / Event Media • Affinity",
        image: "images/portfolio/beyond.jpg",
        description: "Promotional event poster featuring high-impact condensed typography, atmospheric backlighting composition, and a disciplined dark-mode contrast hierarchy to evoke depth and thematic resonance."
    },
    {
        id: "summit",
        title: "Leadership & Strategy Summit",
        category: "Brand & Event Design • Photoshop",
        image: "images/portfolio/summit.jpg",
        description: "Promotional poster designed in Photoshop for Kayole Archdeaconry. Features dynamic typography hierarchy, custom subtle texture overlays, and a balanced split-color palette to convey authority and executive engagement."
    },
    {
        id: "hotseat",
        title: "Hot Seat Poster",
        category: "Church / Event Media",
        image: "images/portfolio/hotseat.jpg",
        description: "Created in Photoshop using custom depth layering to isolate subjects from background atmospheric effects and text."
    },
    {
        id: "training_flyer",
        title: "ICT Training Workshop",
        category: "Education / Training",
        image: "images/portfolio/training_flyer.jpg",
        description: "High-contrast promotional material designed for instructional clarity and visual hierarchy."
    },
    {
        id: "graphic_design",
        title: "Graphic Design Mastery",
        category: "Course Promo",
        image: "images/portfolio/graphic_design.jpg",
        description: "Modern visual identity design emphasizing core design principles and visual balance."
    },
    {
        id: "education",
        title: "Leading With Love Seminar",
        category: "Leadership",
        image: "images/portfolio/education.jpg",
        description: "Clean typographic structure paired with warm, engaging event aesthetics."
    },
    {
        id: "symposium",
        title: "Reimagining Education",
        category: "Conference",
        image: "images/portfolio/symposium.jpg",
        description: "Professional layout tailored for academic and professional event branding."
    },
    {
        id: "jersey",
        title: "Jersey Sunday Poster",
        category: "Event Media",
        image: "images/portfolio/jersey.jpg",
        description: "Vibrant sports-themed branding with dark-mode aesthetic and dynamic lighting."
    },
    {
        id: "sea_of_faces",
        title: "Sea of Faces",
        category: "Creative Media",
        image: "images/portfolio/sea_of_faces.jpg",
        description: "Atmospheric visual composition utilizing depth, mood, and dramatic contrast."
    },
    {
        id: "june_sunday",
        title: "One Family Worship Service",
        category: "Church / Community",
        image: "images/portfolio/28th_june_sunday_2026.jpg",
        description: "Balanced event publicity focusing on focal points and clean information hierarchy."
    },
    {
        id: "youth_sunday",
        title: "Youth Sunday — St. Luke's",
        category: "Youth Event",
        image: "images/portfolio/youth_sunday_st._lukes.jpg",
        description: "Bold typography combined with energetic visual elements for modern youth outreach."
    }
];

// ===================================================
//         DYNAMIC RENDER & LIGHTBOX MODAL LOGIC
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("portfolio-grid");
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".modal-close");
    const likeBtn = document.getElementById("like-btn");
    const likeCountText = document.getElementById("like-count");

    // Local Storage for Likes tracking
    let likesData = JSON.parse(localStorage.getItem("portfolio_likes")) || {};
    let currentActiveId = null;

    // 1. Render Portfolio Cards dynamically
    if (gridContainer) {
        gridContainer.innerHTML = portfolioData.map(item => `
            <article class="portfolio-card" data-id="${item.id}" data-src="${item.image}">
                <div class="card-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-info">
                    <span class="category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </article>
        `).join('');
    }

    // 2. Attach Click Event to each Card to Open Modal
    const cards = document.querySelectorAll(".portfolio-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const imageSrc = card.getAttribute("data-src");
            const posterId = card.getAttribute("data-id");

            currentActiveId = posterId;
            modalImg.src = imageSrc;
            modal.style.display = "flex";

            // Update Likes Display for selected poster
            updateLikeButtonState(posterId);
        });
    });

    // 3. Close Modal handlers
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 4. Like Button Click Handler
    if (likeBtn) {
        likeBtn.addEventListener("click", () => {
            if (!currentActiveId) return;

            if (!likesData[currentActiveId]) {
                likesData[currentActiveId] = { count: 1, liked: true };
            } else {
                if (likesData[currentActiveId].liked) {
                    likesData[currentActiveId].count--;
                    likesData[currentActiveId].liked = false;
                } else {
                    likesData[currentActiveId].count++;
                    likesData[currentActiveId].liked = true;
                }
            }

            // Save to browser memory
            localStorage.setItem("portfolio_likes", JSON.stringify(likesData));
            updateLikeButtonState(currentActiveId);
        });
    }

    // Helper: Update Like UI
    function updateLikeButtonState(id) {
        const itemLikes = likesData[id] || { count: 0, liked: false };
        const count = itemLikes.count;
        const isLiked = itemLikes.liked;

        if (isLiked) {
            likeBtn.classList.add("liked");
            likeCountText.textContent = `Liked (${count})`;
        } else {
            likeBtn.classList.remove("liked");
            likeCountText.textContent = count > 0 ? `Like (${count})` : "Like";
        }
    }
});