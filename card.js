const buttons = document.querySelectorAll(".catagoryBtn");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    buttons.forEach((btn) => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
  });
});

async function fetchData() {
  let loading = document.getElementById("loading");
  loading.style.display = "block";

  try {
    const response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    
    const jsonData = await response.json();
    allIssues = jsonData.data;

    showJobCards("all"); // show all by default
  } catch (error) {
    console.error(error);
  }

  loading.style.display = "none";
}
fetchData();

function showJobCards(category) {
  const cardContainer = document.getElementById("cardContainer");
  const jobCount = document.getElementById("jobCount");

  cardContainer.innerHTML = "";

  let filteredData = [];
 
  if (category === "all") {
    filteredData = allIssues;
  } else if (category === "open") {
    filteredData = allIssues.filter((item) => item.status !== "closed");
  } else if (category === "close") {
    filteredData = allIssues.filter((item) => item.status === "closed");
  }

  jobCount.innerText = filteredData.length;

  filteredData.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <div onclick="showModal(${item.id})" class="border-t-3 ${
      item.status === "closed" ? "border-violet-500" : "border-green-500"
    } rounded-md shadow-sm bg-white">
      <div class="p-4 min-h-[230px] flex flex-col justify-between">

        <div class="flex items-center justify-between">
          <img class="h-6 w-6"
          src="${
            item.priority === "low"
              ? "./assets/CloseStatus.png"
              : "./assets/OpenStatus.png"
          }">

          <p class="px-5 py-0.5 font-semibold rounded-full uppercase
          ${
            item.priority === "low"
              ? "bg-gray-200 text-gray-400"
              : item.priority === "medium"
                ? "bg-yellow-200 text-yellow-400"
                : "bg-red-100 text-red-400"
          }">
          ${item.priority}
          </p>
        </div>

        <h2 class="mt-3 font-bold text-sm text-gray-800">
          ${item.title}
        </h2>

        <p class="text-[12px] text-[#64748B] mt-2 line-clamp-2">
          ${item.description}
        </p>
                  <div id="cardsLables" class="flex flex-wrap gap-1 mt-3">
                    ${item.labels
                      .map((label) => {
                        if (label === "bug") {
                          return `<button class="bg-red-200 text-red-500 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-bug"></i> bug</button>`;
                        }

                        if (label === "help wanted") {
                          return `<button class="bg-yellow-200 text-yellow-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-helicopter-symbol"></i> help wanted</button>`;
                        }

                        if (label === "enhancement") {
                          return `<button class="bg-green-200 text-green-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-clover"></i> enhancement</button>`;
                        }

                        if (label === "good first issue") {
                          return `<button class="bg-blue-200 text-blue-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-brands fa-gg"></i> good first issue</button>`;
                        }
                      })
                      .join("")}
            </div>

      </div>

      <div class="flex flex-col gap-4 mt-4 p-4 border-t border-gray-200 text-gray-500">
        <p># ${item.author}</p>
        <p>${item.createdAt}</p>
      </div>
    </div>
    `;

    cardContainer.appendChild(div);
  });
}


// add search function--------------------------------------------------------------------------------------------------------------------------------
document.getElementById("searchBtn").addEventListener("click", handleSearch);

function handleSearch() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const cardContainer = document.getElementById("cardContainer");
  const jobCount = document.getElementById("jobCount");

  cardContainer.innerHTML = "";

  const filtered = allIssues.filter((item) =>
    item.title.toLowerCase().includes(searchValue)
  );

  jobCount.innerText = filtered.length;

  filtered.forEach((item) => {
  const div = document.createElement("div");
  
   div.innerHTML = `
    <div onclick="showModal(${item.id})"  class="border-t-3 ${
      item.priority === "low" ? "border-violet-500" : "border-green-500"
    } rounded-md shadow-sm bg-white">
      <div class="p-4 min-h-[230px] flex flex-col justify-between">

        <div class="flex items-center justify-between">
          <img class="h-6 w-6"
          src="${
            item.priority === "low"
              ? "./assets/CloseStatus.png"
              : "./assets/OpenStatus.png"
          }">

          <p class="px-5 py-0.5 font-semibold rounded-full uppercase
          ${
            item.priority === "low"
              ? "bg-gray-200 text-gray-400"
              : item.priority === "medium"
                ? "bg-yellow-200 text-yellow-400"
                : "bg-red-100 text-red-400"
          }">
          ${item.priority}
          </p>
        </div>

        <h2 class="mt-3 font-bold text-sm text-gray-800">
          ${item.title}
        </h2>

        <p class="text-[12px] text-[#64748B] mt-2 line-clamp-2">
          ${item.description}
        </p>
                  <div id="cardsLables" class="flex flex-wrap gap-1 mt-3">
                    ${item.labels
                      .map((label) => {
                        if (label === "bug") {
                          return `<button class="bg-red-200 text-red-500 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-bug"></i> bug</button>`;
                        }

                        if (label === "help wanted") {
                          return `<button class="bg-yellow-200 text-yellow-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-helicopter-symbol"></i> help wanted</button>`;
                        }

                        if (label === "enhancement") {
                          return `<button class="bg-green-200 text-green-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-clover"></i> enhancement</button>`;
                        }

                        if (label === "good first issue") {
                          return `<button class="bg-blue-200 text-blue-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-brands fa-gg"></i> good first issue</button>`;
                        }
                      })
                      .join("")}
            </div>

      </div>

      <div class="flex flex-col gap-4 mt-4 p-4 border-t border-gray-200 text-gray-500">
        <p># ${item.author}</p>
        <p>${item.createdAt}</p>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
}

// if press enter key (optional)
    document.getElementById("searchInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });



// function for modal
async function showModal(id) {
  let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  let data = await res.json();
  let item = data.data;
  
  const modalContainer = document.getElementById("modalContainer");

  
let statusBadge =
  item.status?.toLowerCase().trim() === "open"
    ? `<p class="text-white bg-green-600 px-2 rounded-full font-semibold">Open</p>`
    : `<p class="text-white bg-red-600 px-2 rounded-full font-semibold">Closed</p>`;



  modalContainer.style.display = "flex";
  modalContainer.innerHTML = `
  <div class="modal-box max-w-[700px] p-8 bg-white rounded-2xl">
    <h1 class="text-2xl font-bold mb-3 ">${item.title}</h1>

    <div class="flex gap-2 text-gray-400 mb-6">
        ${statusBadge}
        <p><span class="text-[10px]"><i class="fa-solid fa-circle"></i></span>Opened by ${item.author}<span class="text-[10px]"><i class="fa-solid fa-circle"></i></span></p>
        <p>${item.createdAt}</p>
    </div>
    



  <div id="cardsLables" class="flex flex-wrap gap-1 mt-3">
                    ${item.labels
                      .map((label) => {
                        if (label === "bug") {
                          return `<button class="bg-red-200 text-red-500 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-bug"></i> bug</button>`;
                        }

                        if (label === "help wanted") {
                          return `<button class="bg-yellow-200 text-yellow-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-helicopter-symbol"></i> help wanted</button>`;
                        }

                        if (label === "enhancement") {
                          return `<button class="bg-green-200 text-green-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-solid fa-clover"></i> enhancement</button>`;
                        }

                        if (label === "good first issue") {
                          return `<button class="bg-blue-200 text-blue-600 px-1.5 py-1 rounded-full text-sm"><i class="fa-brands fa-gg"></i> good first issue</button>`;
                        }
                      })
                      .join("")}
            </div>

    <p class="text-gray-400 mt-4 mb-4">${item.description}</p>

    <div class="flex p-3 rounded-md bg-gray-100 mb-5">
      <div class="flex-1 gap-2">
        <p class="text-gray-400 mb-2">Assignee:</p>
        <p class="font-semibold">${item.assignee}</p>
      </div>
      <div class="flex-1 gap-2">
        <p class="text-gray-400 mb-2">Priority:</p>
          <span class="px-5 py-0.5 font-semibold rounded-full uppercase
          ${
            item.priority === "low"
              ? "bg-gray-600 text-white"
              : item.priority === "medium"
                ? "bg-yellow-600 text-white"
                : "bg-red-600 text-white"
          }">
          ${item.priority}
          </span>
      </div>
    </div>

  <div class="flex justify-end">
    <button onclick="closeModal()" class="px-4 py-2  right-0 text-white bg-violet-600 rounded-md">
      Close
    </button>
  </div>


  </div>
`;


    // close when clicking outside
  modalContainer.onclick = function(e) {
    if (e.target === modalContainer) {
      closeModal();
    }
  };
}

// close function
function closeModal(){
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.style.display = "none";
  modalContainer.innerHTML = "";
}


  