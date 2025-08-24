
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
const closeBtn = document.getElementById('close');

// If you want custom text per activity, add it here (optional):
const ACTIVITY_INFO = {
  "activity-1": "Details for Activity 1: Hands-on lab experiments…",
  "activity-2": "Details for Activity 2: Capstone design projects…",
  // ...add more as needed
};

// Make grey rectangles clickable and show popup
document.querySelectorAll('.rectangle.grey').forEach(rect => {
  rect.addEventListener('click', () => {
    // visual selection (optional)
    document.querySelectorAll('.rectangle.grey').forEach(el => el.classList.remove('selected'));
    rect.classList.add('selected');

    // Show the rectangle’s own text at the very top
    popupActivity.textContent = rect.textContent.trim();

    

    popup.style.display = 'block';
  });
});

// Close popup
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}
