
//TOGGLE


  const toggle = document.getElementById("multiSelectToggle");
  const modeLabel = document.getElementById("modeLabel");
  let multiSelectEnabled = false;

  toggle.addEventListener("change", () => {
    multiSelectEnabled = toggle.checked;
    modeLabel.textContent = multiSelectEnabled ? "Select multiple graduate attributes" : "Select one graduate attribute at a time";
  });


/*
CATEGORY_DATA:
Mapping of category IDs to their learning and assessment items
- Example: category 1 highlights activity-1, activity-4, activity-7, and
  assessment-1, assessment-4, assessment-7.
*/
const CATEGORY_DATA = {
  1: {
    learning: [1, 4, 7],
    assessment: [1, 4, 7]
  },
  2: {
    learning: [10, 13, 16],
    assessment: [10, 13, 16]
  },
  
  3: {
    learning: [19, 22, 25],
    assessment: [19, 22, 25]
  },
  4: {
    learning: [2, 5, 8],
    assessment: [2, 5, 8]
  },
  5: {
    learning: [11, 14, 17],
    assessment: [11, 14, 17]
  },
  6: {
    learning: [20, 23, 26],
    assessment: [20, 23, 26]
  },
  
  7: {
    learning: [3, 6, 9],
    assessment: [3, 6, 9]
  },
  
  8: {
    learning: [12, 15, 18],
    assessment: [12, 15, 18]
  },
  
  9: {
    learning: [21, 24, 27],
    assessment: [21, 24, 27]
  },
  
  10: {
    learning: [28, 31, 34],
    assessment: [28, 31, 34]
  },
  
  11: {
    learning: [29, 32, 35],
    assessment: [29, 32, 35]
  },
  
  12: {
    learning: [30, 33, 36],
    assessment: [30, 33, 36]
  },
 
};


// Background color for learning rectangles (per category)
const RECTANGLE_COLORS = {
  1: "#B9D0F5", // Light blue
  2: "#B7E4F3", // Aqua
  3: "#C2EDD8",
  4: "#DDEBC2",
  5: "#F6F0B9",
  6: "#F8E6D4",
  7: "#F8D4C2",
  8: "#F6C3A9",
  9: "#E6D5F3",
  10: "#D1B1E9",
  11: "#F5CFE6",
  12: "#F1B9D9",
  
  // Add up to category 12
};

// Text color for assessment section (per category)
const TEXT_COLORS = {
  1: "#1D53AA", // Dark blue
  2: "#1C8CAB", // Teal
  3: "#2D835B", // Deep green
  4: "#8A9A2F", // Olive green
  5: "#AC9E23",
  6: "#D79859",
  7: "#DB7C4C",
  8: "#C37953",
  9: "#9A78B4",
  10: "#70379A",
  11: "#AE3C81",
  12: "#8F2C65",
  // Add up to category 12
};

// Track which categories are currently selected
const activeCategories = new Set();

function toggleCategory(categoryId) {
  const data = CATEGORY_DATA[categoryId];
  const bgColor = RECTANGLE_COLORS[categoryId];
  const textColor = TEXT_COLORS[categoryId];
  if (!data || !bgColor || !textColor) return;

  const isActive = activeCategories.has(categoryId);

  // Toggle experiential learning rectangles
  data.learning.forEach(id => {
    const activityEl = document.getElementById(`activity-${id}`);
    if (activityEl) {
      activityEl.style.display = isActive ? "none" : "block";
      activityEl.style.backgroundColor = isActive ? "#E9E9E9" : bgColor;
      activityEl.style.color = "black";
    }
  });

  // Toggle assessment rectangles
  data.assessment.forEach(id => {
    const assessmentEl = document.getElementById(`assessment-${id}`);
    if (assessmentEl) {
      assessmentEl.style.display = isActive ? "none" : "block";
      assessmentEl.style.color = isActive ? "black" : textColor;
      assessmentEl.style.fontWeight = isActive ? "normal" : "bold";
      assessmentEl.style.borderColor = isActive ? "white" : textColor;
    }
  });

  // Track active category
  if (isActive) {
    activeCategories.delete(categoryId);
  } else {
    activeCategories.add(categoryId);
  }
}









// Attach click handlers to category icons
document.querySelectorAll(".category-icon .main-icon").forEach(img => {
  const parentIcon = img.closest(".category-icon");
  const categoryId = parseInt(parentIcon.dataset.categoryId); // Get ID from HTML

  img.addEventListener("click", () => {
    const isSelected = parentIcon.classList.contains("selected");

    if (!multiSelectEnabled) {
      // SINGLE SELECT
      document.querySelectorAll(".category-icon").forEach(i => i.classList.remove("selected"));
      document.querySelectorAll('.rectangle.grey').forEach(rect => {
        rect.style.backgroundColor = "#E9E9E9";
        rect.style.color = "black";
        rect.style.display = "none";
      });

      document.querySelectorAll('.rectangle.white').forEach(rect => {
        rect.style.color = "black";
        rect.style.fontWeight = "normal";
        rect.style.borderColor = "white";
        rect.style.display = "none";
      });

      activeCategories.clear();

      if (!isSelected) {
        parentIcon.classList.add("selected");
        toggleCategory(categoryId);
      }

    } else {
      // MULTI SELECT
      parentIcon.classList.toggle("selected");
      toggleCategory(categoryId);
    }
  });
});



const canvas = document.getElementById('connectionCanvas');
      const ctx = canvas.getContext('2d');

      function resizeCanvas() {
        canvas.width = document.body.scrollWidth;
        canvas.height = document.body.scrollHeight;
      }

      window.addEventListener('resize', resizeCanvas);
      window.addEventListener('load', () => {
        resizeCanvas();

        
      });


//Linking activities


  document.querySelectorAll('.rectangle.grey').forEach(rect => {
    rect.addEventListener('click', () => {
      // Remove selection from all rectangles
      document.querySelectorAll('.rectangle.grey').forEach(el => el.classList.remove('selected'));

      // Add selection to the clicked one
      rect.classList.add('selected');

      // Log to confirm click
      console.log('Selected:', rect.id);
    });
  });


//Activities data
// Popup elements
const popup = document.getElementById('popup');
const popupActivity = document.getElementById('popup-activity');
const popupCaseStudy = document.getElementById('popup-case-study');
const popupDownloable = document.getElementById('popup-downloable');
const popupImage = document.getElementById('popup-image');
const closeBtn = document.getElementById('close');
const popupBanner = document.getElementById('popup-banner');


// If you want custom text per activity:
const ACTIVITY_INFO = {
  "activity-1": "Details for Activity 1: Hands-on lab experiments…",
  "activity-2": "Details for Activity 2: Capstone design projects…",
  // ...add more as needed
};

// NEW: MAP OF CASE STUDY IMAGES LINKS FOR EACH LEARNING ACTIVITY
const ACTIVITY_IMAGES = {
  //Graduate attribute 1: Knowledge base
  "activity-1": "Images/cs-1.png",
  "activity-7": "Images/CaseStudy-ReverseEngineering.png", 
  "activity-4": "Images/cs-1.3.png",
  //Graduate attribute 2: Problem analysis
  "activity-10": "Images/cs-2.png",
  "activity-13": "Images/cs-2.1.png",
  "activity-16": "Images/cs-2.3.png",
  //Graduate attribute 3: Investigation
  "activity-19": "Images/cs-3.1.png",
  "activity-22": "Images/cs-3.png",
  "activity-25": "Images/cs-3.3.png",
  //Graduate attribute 4: Design
  "activity-2": "Images/cs-4.1.png",
  "activity-5": "Images/cs-4.png",
  //Graduate attribute 7: Communication skills
  "activity-6": "Images/ga7-casestudy1.png",
  //Graduate attribute 9: Impact of engineering on society and environment
  "activity-21": "Images/ga9-casestudy1.png",
  //Graduate attribute 10: Ethis and equity
  "activity-31": "Images/ga10-casestudy1.png",

};

// NEW: MAP OF ACTIVITY IDS TO DOWNLOAD LINK AND LINK TEXT
const ACTIVITY_DOWNLOADS = {
  "activity-1": {
    url: "https://docs.google.com/document/d/1ySSiB2JSHtFZbWfc9uWaZagOa_OnEJtT0GXbC3wq5HU/edit?usp=sharing",
    text: "CAD Model Step by Step File"
  },
  "activity-5": {
    url: "https://docs.google.com/presentation/d/1ZksCumkfwFEpCZfoQI-uui-04R2pluKj/edit?usp=sharing&ouid=116558492720556286136&rtpof=true&sd=true",
    text: "Human-centered group workshop"
  },
  "activity-7": {
    url: "https://docs.google.com/document/d/1ySSiB2JSHtFZbWfc9uWaZagOa_OnEJtT0GXbC3wq5HU/edit?usp=sharing",
    text: "Reverse Engineering Worksheet"
  },
  // ADD MORE ACTIVITIES AS NEEDED
};

// GET LINK ELEMENT
const popupTemplateLink = document.getElementById('popup-template-link');

// NEW: MAP OF ACTIVITY IDS TO BANNER IMAGES
const ACTIVITY_BANNERS = {
  //Graduate attribute 1: Knowledge base
  "activity-1": "Images/ga1-banner.png",
  "activity-4": "Images/ga1-banner.png",
  "activity-7": "Images/ga1-banner.png",
  // Graduate attribute 2: Problem analysis
  "activity-10": "Images/ga2-banner.png",
  "activity-13": "Images/ga2-banner.png",
  "activity-16": "Images/ga2-banner.png",
  //Graduate attribute 3: Investigation
  "activity-19": "Images/ga3-banner.png",
  "activity-22": "Images/ga3-banner.png",
  "activity-25": "Images/ga3-banner.png",
  //Graduate attribute 4: Design 
  "activity-2": "Images/ga4-banner.png",
  "activity-5": "Images/ga4-banner.png",
  "activity-8": "Images/ga4-banner.png",
  //Graduate attribute 5: Use of engineering tools activities
  "activity-11": "Images/ga5-banner.png",
  "activity-14": "Images/ga5-banner.png",
  "activity-17": "Images/ga5-banner.png",
  //Graduate attribute 6: Individual and teamwork activities
  "activity-20": "Images/ga6-banner.png",
  "activity-23": "Images/ga6-banner.png",
  "activity-26": "Images/ga6-banner.png",
   //Graduate attribute 7: Communication skills activities
  "activity-3": "Images/ga7-banner.png",
  "activity-6": "Images/ga7-banner.png",
  "activity-9": "Images/ga7-banner.png",
  ///Graduate attribute 8: Professionalism
  "activity-12": "Images/ga8-banner.png",
  "activity-15": "Images/ga8-banner.png",
  "activity-18": "Images/ga8-banner.png",
  //Graduate attribute 9: Impact of engineering activities
  "activity-21": "Images/ga9-banner.png",
  "activity-24": "Images/ga9-banner.png",
  "activity-27": "Images/ga9-banner.png",
  //Graduate attribute 10: Ethics and quality
  "activity-28": "Images/ga10-banner.png",
  "activity-31": "Images/ga10-banner.png",
  "activity-34": "Images/ga10-banner.png",
  //Graduate attribute 11: Economics and project management 
  "activity-29": "Images/ga11-banner.png",
  "activity-32": "Images/ga11-banner.png",
  "activity-35": "Images/ga11-banner.png",
  //Graduate attribute 12: Lifelong learning activities
  "activity-30": "Images/ga12-banner.png",
  "activity-33": "Images/ga12-banner.png",
  "activity-36": "Images/ga12-banner.png",

};



// NEW: MAP OF ACTIVITY IDS TO TITLE COLORS
const ACTIVITY_COLORS = {
  // Knowledge base activities
  "activity-1": "#4F89E7", 
  "activity-4": "#4F89E7", 
  "activity-7": "#4F89E7", 
  // Problem analysis activities
  "activity-10": "#10A6D8",
  "activity-13": "#10A6D8",
  "activity-16": "#10A6D8",
  //Investigation activities
  "activity-19": "#35C27F",
  "activity-22": "#35C27F",
  "activity-25": "#35C27F",
  // Design activities
  "activity-2": "#90BC35",
  "activity-5": "#90BC35",
  "activity-8": "#90BC35",
  //Use of engineering tools activities
  "activity-11": "#CDBB15",
  "activity-14": "#CDBB15",
  "activity-17": "#CDBB15",
  //Individual and teamwork activities
  "activity-20": "#E9AB72",
  "activity-23": "#E9AB72",
  "activity-26": "#E9AB72",
  //Communication skills activities
  "activity-3": "#F09D74",
  "activity-6": "#F09D74",
  "activity-9": "#F09D74",
  //Professionalism activities
  "activity-12": "#F2AA84",
  "activity-15": "#F2AA84",
  "activity-18": "#F2AA84",
  //Impact of engineering activities
  "activity-21": "#B684DC",
  "activity-24": "#B684DC",
  "activity-27": "#B684DC",
  //Ethics and equity activities
  "activity-28": "#9D58D0",
  "activity-31": "#9D58D0",
  "activity-34": "#9D58D0",
  //Economics and project management activities
  "activity-29": "#E993C6",
  "activity-32": "#E993C6",
  "activity-35": "#E993C6",
  //Lifelong learning activities
  "activity-30": "#E472B3",
  "activity-33": "#E472B3",
  "activity-36": "#E472B3",



};

//LOGIC FOR THE POPUP
// Make grey rectangles clickable and show popup
document.querySelectorAll('.rectangle.grey').forEach(rect => {
  rect.addEventListener('click', () => {
    // visual selection (optional)
    document.querySelectorAll('.rectangle.grey').forEach(el => el.classList.remove('selected'));
    rect.classList.add('selected');

    // Show the rectangle’s own text at the very top
    popupActivity.textContent = rect.textContent.trim();

    // Banner color
    
    popupBanner.src = ACTIVITY_BANNERS[rect.id] || "";
    popupBanner.style.display = popupBanner.src ? "block" : "none";
    
    // Title color based on learning activity activity
    popupActivity.style.color = ACTIVITY_COLORS[rect.id] || "#000000"; // DEFAULT BLACK

    // Title case study color based on learning activity activity
    popupCaseStudy.style.color = ACTIVITY_COLORS[rect.id] || "#000000"; // DEFAULT BLACK

    // Title downloable color based on learning activity activity
    popupDownloable.style.color = ACTIVITY_COLORS[rect.id] || "#000000"; // DEFAULT BLACK

    // Popup Border color
    popup.style.border = ACTIVITY_COLORS[rect.id]

     // Case study image based on learning activity
    popupImage.src = ACTIVITY_IMAGES[rect.id] || ""; // EMPTY IF NO IMAGE
    popupImage.style.display = popupImage.src ? "block" : "none"; // HIDE IF NO IMAGE

    

    // UPDATE DOWNLOAD LINK AND TEXT
    if(ACTIVITY_DOWNLOADS[rect.id]) {
      popupTemplateLink.href = ACTIVITY_DOWNLOADS[rect.id].url;
      popupTemplateLink.textContent = ACTIVITY_DOWNLOADS[rect.id].text;
    } else {
      popupTemplateLink.href = "#"; 
      popupTemplateLink.textContent = "Download Template";
    }



    popup.style.display = 'block';
  });
});

// Close popup
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

// Close popup when clicking outside of it
window.addEventListener('click', function(event) {
  const isInsidePopup = popup.contains(event.target);
  const isActivityRect = event.target.closest('.rectangle.grey');

  if (popup.style.display === 'block' && !isInsidePopup && !isActivityRect) {
    popup.style.display = 'none';
  }
});

