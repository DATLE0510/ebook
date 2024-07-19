function highlightText() {
    var inputText = document.getElementById('inputText');
    if (inputText) {
        var text = inputText.value;
        var highlightWord = 'highlight';
        var regex = new RegExp(highlightWord, 'gi');
        var highlightedText = text.replace(regex, '<span class="highlight">' + highlightWord + '</span>');
        inputText.innerHTML = highlightedText;
        saveHighlight(); // Lưu thông tin highlight sau khi đã highlight văn bản
    }
}

function saveHighlight() {
    var currentPage = getCurrentPage(); // Hàm này để lấy thông tin về trang/chương hiện tại
    var highlightedSpans = document.querySelectorAll('.highlight');
    var highlightIndexes = Array.from(highlightedSpans).map(function(span) {
        return {
            text: span.textContent,
            index: span.dataset.index,
            page: currentPage // Thêm trường để lưu trữ trang/chương
        };
    });
    localStorage.setItem('highlightedText', JSON.stringify(highlightIndexes));
}

function highlightSavedText() {
    var storedHighlights = JSON.parse(localStorage.getItem('highlightedText')) || [];
    var scrollContainer = document.getElementById('scroll-container');

    storedHighlights.forEach(function(item) {
        // Kiểm tra xem highlight này có thuộc trang hiện tại không
        if (item.page === getCurrentPage()) {
            var highlightWord = item.text;
            var regex = new RegExp(highlightWord, 'gi');
            var containerText = scrollContainer.innerHTML;
            scrollContainer.innerHTML = containerText.replace(regex, '<span class="highlight">' + highlightWord + '</span>');
        }
    });
}

function getCurrentPage() {
    // Hàm này để xác định trang/chương hiện tại
    // Bạn có thể sử dụng URL hoặc một phần tử HTML nào đó để xác định trang
    // Ví dụ: trả về URL hiện tại
    return window.location.href;
}

function toggleHighlight() {
    var selection = window.getSelection().toString().trim();
    if (selection !== '') {
        highlightSelection(selection);
        saveHighlight();
    } else {
        removeHighlight();
    }
}

function highlightSelection(selection) {
    var selectionObj = window.getSelection();
    for (var i = 0; i < selectionObj.rangeCount; i++) {
        var range = selectionObj.getRangeAt(i);
        var span = document.createElement('span');
        span.classList.add('highlight');
        span.dataset.index = Date.now();
        span.innerHTML = range.toString();
        range.deleteContents();
        range.insertNode(span);
    }
}

function removeHighlight() {
    var spans = document.querySelectorAll('.highlight');
    spans.forEach(function(span) {
        span.outerHTML = span.textContent;
    });
    localStorage.removeItem('highlightedText'); // Remove saved highlights
}

window.onload = function() {
    setTimeout(function() {
        highlightSavedText();
        highlightText();
    }, 0);
};

function addBookmark() {
    var bookTitle = document.title;
    var bookURL = window.location.href; 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    var existingBookmark = bookmarks.find(function(bookmark) {
        return bookmark.title === bookTitle && bookmark.url === bookURL;
    });

    if (!existingBookmark) {
        bookmarks.push({ title: bookTitle, url: bookURL });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert("Sách đã được thêm vào Bookmark!");
    } else {
        alert("Sách đã tồn tại trong Bookmark!");
    }
}

const container = document.getElementById('scroll-container');
if (container) {
    container.addEventListener('wheel', (event) => {
        container.scrollTop += event.deltaY;
    });
}

function applyCustomization() {
    var fontSelect = document.getElementById("fontSelect");
    var selectedFont = fontSelect.options[fontSelect.selectedIndex].value;

    var colorSelect = document.getElementById("colorSelect");
    var selectedColor = colorSelect.value;

    var fontSizeSelect = document.getElementById("fontSizeSelect");
    var selectedFontSize = fontSizeSelect.value + "px";

    var contentText = document.querySelector(".content-text");
    contentText.style.fontFamily = selectedFont;
    contentText.style.color = selectedColor;
    contentText.style.fontSize = selectedFontSize;

    $('#customizeModal').modal('hide');
}

function openBookmarks() {
    renderBookmarks();
    $('#bookmarkModal').modal('show');
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        highlightSavedText();
        renderBookmarks();
    }, 0);
});

function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

function renderBookmarks() {
    var bookmarks = getBookmarks();
    var bookmarkList = document.getElementById('bookmarkList');
    if (bookmarkList) {
        bookmarkList.innerHTML = '';

        bookmarks.forEach(function(bookmark, index) {
            var listItem = document.createElement('li');
            
            var link = document.createElement('a');
            link.textContent = bookmark.title;
            link.href = bookmark.url;
            link.target = '_blank';

            var deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() {
                bookmarks.splice(index, 1);
                localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
                renderBookmarks();
            };
            
            listItem.appendChild(link);
            listItem.appendChild(deleteButton);
            bookmarkList.appendChild(listItem);
        });
    }
}

// Hàm xử lý chuyển đổi chế độ toàn màn hình
function toggleFullScreen() {
    // Kiểm tra nếu trình duyệt đang ở chế độ toàn màn hình thì chuyển về chế độ bình thường, ngược lại chuyển sang chế độ toàn màn hình
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Thêm sự kiện để xử lý khi chế độ toàn màn hình thay đổi
document.addEventListener('fullscreenchange', function() {
    updateFullscreenButton();
});

// Hàm cập nhật trạng thái của button dựa trên trạng thái hiện tại của chế độ toàn màn hình
function updateFullscreenButton() {
    var fullscreenButton = document.getElementById('fullscreenButton');
    if (document.fullscreenElement) {
        // Nếu đang ở chế độ toàn màn hình, hiển thị icon thu nhỏ
        fullscreenButton.innerHTML = '<i class="fas text-light fa-compress"></i>';
    } else {
        // Ngược lại, hiển thị icon mở rộng
        fullscreenButton.innerHTML = '<i class="fas text-light fa-expand"></i>';
    }
}

// Cập nhật trạng thái ban đầu của button khi trang web được tải
updateFullscreenButton();


function scrollToTop() {
    var container = document.getElementById("scroll-container");
    container.scrollTop = 0;
}

function scrollToBottom() {
    var container = document.getElementById("scroll-container");
    container.scrollTop = container.scrollHeight;
}

document.getElementById("scrollToTopBtn").addEventListener("click", scrollToTop);
document.getElementById("scrollToBottomBtn").addEventListener("click", scrollToBottom);

