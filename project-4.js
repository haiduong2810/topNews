// Tạo hiệu ứng loading
for (var i = 1; i <= 10; i++) {
    var template = document.getElementById("template").content.cloneNode(true);
    document.getElementById("divContainer").appendChild(template);

}

// Hàm xử lý đường dẫn
function xuLy(url) {
    fetch(url)
        .then(function(response) {
            // Xử lý lỗi 
            if (!response.ok) {
                throw new Error(response.status + ":" + response.statusText);
            }
            document.getElementById("divContainer").innerHTML = "";
            return response.json();
        })
        .then(function(post) {
            // Tạo các đoạn tin tức 
            document.getElementById("formSearch").classList.remove("show");
            if (post.totalArticles == 0) {
                document.getElementById("note").style.display = "block";
            }

            post.articles.forEach(function(element) {

                var div = document.createElement("div");
                div.classList.add("row", "mx-auto", "m-2");

                var divChild1 = document.createElement("div");
                divChild1.classList.add("col-sm-3");

                var divChild2 = document.createElement("div");
                divChild2.classList.add("col-sm-9");

                var img = document.createElement("img");
                img.src = element.image;
                img.classList.add("img-fluid");
                img.alt = element.title;

                var a = document.createElement("a");
                a.href = element.url;
                a.classList.add("text-decoration-none")
                a.innerText = element.title;
                a.target = "_blank";

                var h2 = document.createElement("h2");

                var pTime = document.createElement("p");
                pTime.innerText = element.publishedAt;

                var pDescription = document.createElement("p");
                pDescription.innerText = element.description;


                h2.appendChild(a);
                divChild2.appendChild(h2);
                divChild2.appendChild(pTime);
                divChild2.appendChild(pDescription);
                divChild1.appendChild(img);
                div.appendChild(divChild1);
                div.appendChild(divChild2);

                document.getElementById("divContainer").appendChild(div);

            })

        })
        .catch(function(error) {
            alert(error);
        });
}

var url = "https://gnews.io/api/v4/top-headlines?token=9b05af2bce9fca575a31f0227a4f315c";
xuLy(url);

// Hàm xử lý thông tin tìm kiếm của người dùng
function seachInfo() {
    var input = encodeURIComponent(document.getElementById('info').value.trim());
    var urlSeach = "https://gnews.io/api/v4/search?q=" + input + "&token=9b05af2bce9fca575a31f0227a4f315c"
    xuLy(urlSeach);

}
var btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", seachInfo);


const form = document.querySelector('form')
form.addEventListener('submit', event => {
    // Ngăn chặn sự kiện mặc định của submit
    event.preventDefault()
})

// Hàm sử lý các lựa chọn của người dùng
document.querySelectorAll("#listChoice button").forEach(function(button) {
    button.addEventListener("click", function() {
        var url = "https://gnews.io/api/v4/top-headlines?topic=" + button.id + "&token=9b05af2bce9fca575a31f0227a4f315c";
        xuLy(url);
    })
})