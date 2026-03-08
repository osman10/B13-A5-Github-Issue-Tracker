const buttons = document.querySelectorAll(".catagoryBtn");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Remove 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked button
    event.currentTarget.classList.add("active");
  });
});

// fetch data from server
async function fetchData() {
  // show loading
  let loading = document.getElementById("loading");
  loading.style.display = "block"; // show loading

  try {
    const response = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const jsonData = await response.json();
    const data = jsonData.data;
    const cartContainer = document.getElementById("cartContainer");
    // function for lable

    data.forEach((item) => {
      const div = document.createElement("div");

      div.innerHTML = `
        <div class="border-t-3 ${item.priority === "low" ? "border-violet-500" : "border-green-500"} rounded-md shadow-sm bg-white">
          <div class="p-4 min-h-[230px] flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <img class="h-6 w-6" src="${item.priority === "low" ? "./assets/CloseStatus.png" : "./assets/OpenStatus.png"}"  alt="Status">
              <p class=" px-5 py-0.5 font-semibold rounded-full uppercase
                  ${
                    item.priority.toLowerCase() === "low"
                      ? "bg-gray-200 text-gray-400"
                      : item.priority.toLowerCase() === "medium"
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
          <div class="flex flex-col gap-4 mt-4 p-4 border-t-1 border-gray-200 text-gray-500">
            <p># ${item.author}</p>
            <p>${item.createdAt}</p>
          </div>
        </div>
      `;
      cartContainer.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
    // hide loading
  loading = document.getElementById("loading");
  loading.style.display = "none"; // show loading
}
fetchData();
